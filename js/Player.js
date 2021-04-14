		var Player = function(){
			this.id;
			this.username = 'A';
			this.points = 0;
			this.turn = false;
		};
		Player.prototype.createPanel = function(){
			var addto = $(".playset");
			
			var panel = document.createElement("div");
			panel.setAttribute("class", "panel");
			panel.setAttribute("id", "panel-"+this.id);
			
			var name = document.createElement("div");
			name.setAttribute("class","name");
			name.innerHTML = this.username;
			
			var timer = document.createElement("div");
			timer.setAttribute("class","timer");
			
			var point = document.createElement("div");
			point.setAttribute("class","points");
			point.innerHTML = this.points;
			
			$(panel).append(name);
			$(panel).append(point);
			$(panel).append(timer);
			addto.append(panel);
			addto.addClass("active");
		};
		Player.prototype.updatePoints = function(points){
			var currentplayerpanel = $("#panel-"+this.id)
		
			this.points = this.points + points;
			currentplayerpanel.find(".points").html(this.points);
		};
		Player.prototype.panelActivate = function(){
			var currentPanel = $("#panel-"+this.id);
			var allPanels = $(".playset .panel");
			
			allPanels.each(function(){
				if($(this).hasClass("active")){
					$(this).removeClass("active");
				}
			});
			currentPanel.addClass("active");
		};