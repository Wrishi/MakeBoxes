		/** LAYOUT **/
		var Layout = function(){
			this.cellX = 3;
			this.cellY = 3;
			this.layoutHolder;
			this.boxIndex = 0;
			this.boxes = {};
			this.vLineIndex = 0;
			this.vLines = {};
			this.hLineIndex = 0;
			this.hLines = {};
		};
		Layout.prototype.draw = function(){
			for(var j = 0; j < this.cellY; j++){
				//Adding horizontal lines
				this.addlinerow(j);
				for(var i = 0; i < this.cellX; i++){
					var hline = new HLine();
					hline.id = this.hLineIndex;
					this.hLines[hline.id] = hline;
					this.hLineIndex++;
					
					hline.drawEmpty(j);
					hline.draw(i,j);
				}
				hline.drawEmpty(j);

				//Adding Boxes	
				this.addboxrow(j);
				for(var i = 0; i < this.cellX; i++){					
					var vline = new VLine();
					vline.id = this.vLineIndex;
					this.vLines[vline.id] = vline;
					this.vLineIndex++;

					vline.draw(i,j);
					
					var box = new Box();
					box.id = this.boxIndex;
					this.boxes[box.id] = box;
					this.boxIndex++;
					
					box.draw(i,j);
				}
				//Last Verticals
				var vline = new VLine();
				vline.id = this.vLineIndex;
				this.vLines[vline.id] = vline;
				this.vLineIndex++;
				
				vline.draw(this.cellX,j);
			}
			
			//Last Horizontals
			this.addlinerow(j);
			for(var i = 0; i < this.cellX; i++){
				var hline = new HLine();
				hline.id = this.hLineIndex;
				this.hLines[hline.id] = hline;
				this.hLineIndex++;
				
				hline.drawEmpty(j);
				hline.draw(i,j);				
			}
			hline.drawEmpty(j);
			
			//console.log(this.cellX +" * 40 + " + (this.cellX + 1) + " * 18 = " + ((this.cellX * 40) + (this.cellX + 1) * 18));
			var x = parseInt(this.cellX);
			var w = (x * 40) + (x + 1) * 18 + 60;
			$(".playarea").width(w).css("margin-left", $(window).width() - w < 0? 0 : ($(window).width() - w)/2 );
		};
		Layout.prototype.addlinerow = function(j){
			layoutHolder.append("<div class='linerow' id='linerow"+j+"'></div>");
		};
		Layout.prototype.addboxrow = function(j){
			layoutHolder.append("<div class='boxrow' id='boxrow"+j+"'></div>");
		};
		Layout.prototype.associate = function(){
			for(boxIndex in this.boxes){
				//Associating verticals
				for(i in this.vLines){
					if(this.vLines[i].y == this.boxes[boxIndex].y){
						if(this.vLines[i].x == this.boxes[boxIndex].x){
							this.boxes[boxIndex].left = this.vLines[i];
						}
						if(this.vLines[i].x == this.boxes[boxIndex].x + 1){
							this.boxes[boxIndex].right = this.vLines[i];
						}
					}
				}
				
				//Associated horizontals
				for(i in this.hLines){
					if(this.hLines[i].x == this.boxes[boxIndex].x){
						if(this.hLines[i].y == this.boxes[boxIndex].y){
							this.boxes[boxIndex].top = this.hLines[i]; 
						}
						if(this.hLines[i].y == this.boxes[boxIndex].y + 1){
							this.boxes[boxIndex].bottom = this.hLines[i];
						}
					}
				}
			}
		};