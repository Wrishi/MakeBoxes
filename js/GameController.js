	var GameController = function(){
		this.playerNum = 2;
		this.turnplayer;
		this.time;
		this.timer;
		this.timeOut = 10;
		this.layout = new Layout();
		this.playerId = 0;
		this.players = {};
		this.boxCount = 0;
		this.lineSound = new Audio('sounds/266947__ulfhubert__tiny-ping.wav');
		this.boxSound = new Audio('sounds/179198__snapper4298__micro-bell.wav');
		this.winSound = new Audio('sounds/68997__lex0myko1__large-cym.wav');
	};
	GameController.prototype.createLayout = function(){
		var gridDim = $("#gridDim").val();
		this.layout.cellX = gridDim;
		this.layout.cellY = gridDim;
		this.layout.draw();
		this.layout.associate();
	};
	GameController.prototype.createPlayerPanels = function(){
		for(var i = 0; i < this.playerNum; i++){
			var player = new Player();
			
			player.username = $("#Player-"+(i+1)).val();
			player.id = this.playerId;
			this.players[player.id] = player;
			this.playerId++;
			
			player.createPanel();
		}
		
		this.players[0].turn = true;
		this.turnplayer = this.players[0];
		this.turnplayer.panelActivate();
		
		$(".playset").css("margin-left",($(window).width() - $(".playset").width())/2);
	};
	GameController.prototype.start = function(){
		this.createLayout();
		this.createPlayerPanels();
		this.timerReset();
		this.timerCountDown();
		
		this.boxSound.play();
	};
	GameController.prototype.playcontroller = function(posX,posY,alignment,i){
		var x = posX;
		var y = posY;
		var align = alignment;
		var index = parseInt(i);

  		if((align == 'v' && !this.layout.vLines[index ].status) || (align == 'h' && !this.layout.hLines[index ].status)){
  			var isbox = false;
			for(var i in this.layout.boxes){
				if(align == 'h' && this.layout.boxes[i].top.x == x && this.layout.boxes[i].top.y == y && !this.layout.boxes[i].isTopSet){
					this.layout.boxes[i].top.light();
					this.layout.boxes[i].state = this.layout.boxes[i].state + 1;
					this.layout.boxes[i].isTopSet = true;
					//this.turnplayer.updatePoints(5);
				}
				if(align == 'v' && this.layout.boxes[i].right.x == x && this.layout.boxes[i].right.y == y && !this.layout.boxes[i].isRightSet){
					this.layout.boxes[i].right.light();
					this.layout.boxes[i].state = this.layout.boxes[i].state + 1;
					this.layout.boxes[i].isRightSet = true;
					//this.turnplayer.updatePoints(5);
				}
				if(align == 'h' && this.layout.boxes[i].bottom.x == x && this.layout.boxes[i].bottom.y == y && !this.layout.boxes[i].isBottomSet){
					this.layout.boxes[i].bottom.light();
					this.layout.boxes[i].state = this.layout.boxes[i].state + 1;
					this.layout.boxes[i].isBottomSet = true;
					//this.turnplayer.updatePoints(5);
				}
				if(align == 'v' && this.layout.boxes[i].left.x == x && this.layout.boxes[i].left.y == y && !this.layout.boxes[i].isLeftSet){
					this.layout.boxes[i].left.light();
					this.layout.boxes[i].state = this.layout.boxes[i].state + 1;
					this.layout.boxes[i].isLeftSet = true;
					//this.turnplayer.updatePoints(5);
				}
				if(this.layout.boxes[i].state == 4 && !this.layout.boxes[i].status){
					this.layout.boxes[i].light(this.turnplayer.username, this.turnplayer.id);
					//this.turnplayer.updatePoints(50);
					this.turnplayer.updatePoints(1);
					isbox = true;
					this.turnplayer.turn = true;
					this.boxCount++;
				}
			}

				
			if(!isbox){
				this.changeTurn();
				this.lineSound.play();
			}else{
				this.timerReset();
				this.timerCountDown();
				
				this.boxSound.play();
			}
		}
			
		if(this.isGameOver() == true){
			this.gameOver();
		}
	};
	GameController.prototype.changeTurn = function(){
		var id = this.turnplayer.id;
		
		if(id == Object.keys(this.players).length-1 ){
			this.turnplayer = this.players[0];
		}else{
			this.turnplayer = this.players[(id+1)];
		}
		this.turnplayer.panelActivate();
		
		this.timerReset();
		this.timerCountDown();
	};
	GameController.prototype.timerCountDown = function(){
		$("#panel-"+this.turnplayer.id+" .timer").html(this.time);
		
	    if (this.time === 0) {
	    	this.turnplayer.updatePoints(this.turnplayer.points > 0 ? -2 : 0);
	        this.changeTurn();
	    } else {
	        this.time--;
	        var that = this;
	        this.timer = setTimeout(function(){
	        	that.timerCountDown();
	        }, 1000);
	    }
	};
	GameController.prototype.timerPause = function(){
		clearTimeout(this.timer);
	};
	GameController.prototype.timerReset = function(){
		this.timerPause();
		this.time = this.timeOut;
	};
	
	GameController.prototype.isGameOver = function(){
		if(this.layout.cellX * this.layout.cellX == this.boxCount){
			return true;
		}
	};
	GameController.prototype.gameOver = function(){
		var points = 0;
		var winner;
		for(var i in this.players){
			if(this.players[i].points > points){
				points = this.players[i].points;
				winner = this.players[i];
			}
		}
		$(".winnername").html(winner.username)
		$(".gameoverlay").show();
		$("#ctrl-pausebutton").attr("disabled",true);
		this.timerReset();
		
		this.winSound.play();
	};
	GameController.prototype.setStart = function(){
		var startoverlay = $(".startoverlay");
		
		for(var i = this.playerNum; i > 0; i--){
			var inputWrap = document.createElement("div");
			var input = document.createElement("input");
			input.setAttribute("type","text");
			input.setAttribute("value","P"+i);
			input.setAttribute("id","Player-"+i);
			
			$(inputWrap).append(input);
			startoverlay.prepend(inputWrap);
		}
	};
	
	window.onload = function(){
		var gc = new GameController();
		gc.setStart();
		
		$(".startoverlay input").keydown(function(e){
			if($(this).val().length > 2){
				e.preventDefault();
			}
		});
		
		$("#startbutton").on("tap",function(){
			var s= setInterval(function(){
				var clear = 0;
				$(".startoverlay input").each(function(){
					if($(this).val() == null || $(this).val() == undefined || $(this).val() == ""){
						clear++;
					}
				});
				
				if(clear == 0){
					$(".startoverlay").hide();
					gc.start();
					lineLight(gc);
				}
				clearInterval(s);
			},500);
		});
		
		$("#ctrl-rematchbutton,#rematchbutton").on("tap",function(){
			var s = setInterval(function(){
				$(".gameoverlay").hide();
				$(".playset .panel").remove();
				$(".layoutholder").empty();
				$("#ctrl-pausebutton").removeAttr("disabled");
				gc.timerReset();
				gc = new GameController();
				gc.layout.boxIndex = 0;
				gc.layout.vLineIndex = 0;
				gc.layout.hLineIndex = 0;
				gc.playerId = 0;
				
				gc.start();
				lineLight(gc);
				
				clearInterval(s);
			},500);
		});
		
		$("#ctrl-pausebutton").on("tap",function(){
			var attr = $(this).attr('disabled');
			
			if(typeof attr == typeof undefined || attr == false){
				if(!$(this).hasClass("play")){
					gc.timerPause();
					$(".pauseoverlay").show();
					$(this).addClass("play");
				}else{
					gc.timerCountDown();
					$(".pauseoverlay").hide();
					$(this).removeClass("play");
				}
			}
		});
		
		$("#ctrl-newbutton,#newbutton").on("tap",function(){
			window.location.reload();
		});
	}
	
	function lineLight (gc){
		$("div[data-line='true']").on("tap",function(){	
		
			var x = parseInt($(this).data('x'));
			var y = parseInt($(this).data('y'));
			var align = $(this).data('align');
			var index = $(this).data('index');
			
			gc.playcontroller(x,y,align,index);
		});
	}