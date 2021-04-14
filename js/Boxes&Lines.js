		var playArea = $(".playarea");
		var layoutHolder = $(".layoutholder");
		
		/** BOX **/
		var Box = function(){
			this.id;
			this.x;
			this.y;
			this.top;
			this.right;
			this.bottom;
			this.left;
			this.isTopSet = false;
			this.isRightSet = false;
			this.isBottomSet = false;
			this.isLeftSet = false;		
			this.status = false;
			this.state = 0;		
		};
		Box.prototype.draw = function(i,j){
			var currentrow = $("#boxrow"+j);
			var bx = document.createElement("div");
			bx.setAttribute("class","box");
			bx.setAttribute("id","box-"+i+"-"+j);
			bx.setAttribute("data-x",i);
			bx.setAttribute("data-y",j);
			bx.setAttribute("data-index",this.id);
			
			var pDiff = document.createElement("div");
			pDiff.setAttribute("class","diff");
			
			$(bx).append(pDiff);
			
			this.x = i;
			this.y = j;
			currentrow.append(bx);
		};
		Box.prototype.light = function(name,id){
			var currentBox = $("#box-"+this.x+"-"+this.y);
			currentBox.append("<span>"+name.substring(0, 1)+"</span>").addClass("light");
			currentBox.find(".diff").html((id+1));
			this.status = true;
		};
		
		
		/** VERTICAL LINES **/
		var VLine = function(){
			this.id;
			this.x;
			this.y;
			this.status = false;
		};
		VLine.prototype.draw = function(i,j){
			var currentrow = $("#boxrow"+j);
			var vl = document.createElement("div");
			vl.setAttribute("class","vline");
			vl.setAttribute("id","vline-"+i+"-"+j);
			vl.setAttribute("data-x",i);
			vl.setAttribute("data-y",j);
			vl.setAttribute("data-line",'true');
			vl.setAttribute("data-align",'v');
			vl.setAttribute("data-index",this.id);
			
			this.x = i;
			this.y = j;
			
			currentrow.append(vl);
		};
		VLine.prototype.light = function(){
			$("#vline-"+this.x+"-"+this.y).addClass("light");
			
			this.status = true;
		};
		
		
		/** HORIZONTAL LINES **/
		var HLine = function(){
			this.id;
			this.x;
			this.y;
			this.status = false;
			this.emptyDOM = "<div class='emptybox'></div>";
		}
		HLine.prototype.draw = function(i,j){
			var currentrow = $("#linerow"+j);
			var hl = document.createElement("div");
			hl.setAttribute("class","hline");
			hl.setAttribute("id","hline-"+i+"-"+j);
			hl.setAttribute("data-x",i);
			hl.setAttribute("data-y",j);
			hl.setAttribute("data-line",'true');
			hl.setAttribute("data-align",'h');
			hl.setAttribute("data-index",this.id);
			
			this.x = i;
			this.y = j;
			
			currentrow.append(hl);
		};
		HLine.prototype.drawEmpty = function(j){
			$("#linerow"+j).append(this.emptyDOM);
		}
		HLine.prototype.light = function(){
			$("#hline-"+this.x+"-"+this.y).addClass("light");
			this.status = true;
		};