"use strict";

var TERM_ID = 0;
var xVal;
var leftSide;
var rightSide;
var leftWeight;
var rightWeight;
var trash

function paint(){

	var canvas = document.getElementById("my_canvas");
	var centerX = canvas.width/2;
	var centerY = canvas.height/2;

	var context = canvas.getContext("2d");
	context.fillStyle = "#000000";
	var barW = 600;
	var barH = 20;
	context.fillRect(centerX-barW/2,centerY-barH/2,barW,barH);

	var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 5;
	context.beginPath();
	context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'white';
	context.fill();

	var leftSideHeight = 50;
	var termRackHeight = document.getElementById("new_term_rack").clientHeight;

	leftSide = document.createElement("div");
	leftSide.id = "left_side";
	leftSide.className = "side left";
	leftSide.style.top=(canvas.height/2-barH/2-leftSideHeight-termRackHeight)+"px";
	leftSide.ondragover = function(event) {
	    event.preventDefault();
	};
	leftSide.ondrop = function(event) {
	    if ( event.target.id == "left_side"  && leftSide.children.length < 5) {
	        var data = event.dataTransfer.getData("event_target_id");
	        var dropped = document.getElementById(data);
	        event.target.appendChild(dropped);
	    }
	    update();
	};
	document.getElementById("sides").appendChild(leftSide);


	rightSide = document.createElement("div");
	rightSide.id = "right_side";
	rightSide.className = "side right";
	rightSide.style.top=(canvas.height/2-barH/2-leftSideHeight-termRackHeight)+"px";
	rightSide.ondragover = function(event) {
	    event.preventDefault();
	};
	rightSide.ondrop=function(event){
		if ( event.target.id == "right_side" && rightSide.children.length < 5) {
	        var data = event.dataTransfer.getData("event_target_id");
	        var dropped = document.getElementById(data);
	        event.target.appendChild(dropped);
	    }
	    update();
	};
	document.getElementById("sides").appendChild(rightSide);



	trash = document.getElementById("trash");
	trash.ondragover = function(event){
		event.preventDefault();
	}
	trash.ondrop = function(event){
		if (event.target.id == "trash"){
			var data = event.dataTransfer.getData("event_target_id");
			event.target.appendChild(document.getElementById(data));
		}
	}

	xVal = document.getElementById("x_val");
	xVal.onchange = function(){
		alert(this.value);
		update();
	}

	newC();
	newC();
	newC();
	newX();
	newX();
	newX();
}


function newX(me){
	if (document.getElementById("new_term_rack").children.length<10){
		//create div
		var newXTermDiv = document.createElement("div");
		newXTermDiv.id = "term_"+TERM_ID++;
		newXTermDiv.className = "term x";
		newXTermDiv.draggable = true;
		newXTermDiv.ondragstart = function(event) {
		    event.dataTransfer.setData("event_target_id", event.target.id);
		};
		//create input field
		var newXTermInput = document.createElement("input");
		newXTermInput.className = "coefficient";
		newXTermInput.value = 1;
		newXTermInput.maxLength = 3;
		newXTermInput.onchange = function(){
			if (this.value > 0){
				newXTermDiv.style.backgroundColor("#f00")
			}
			else {
				newXTermDiv.style.backgroundColor("#00f")
			}
		}
		//create span
		var newXSpan = document.createElement("span");
		newXSpan.className = "xterm_x_label"
		newXSpan.innerHTML = "X";
		//add span and input filed to div
		newXTermDiv.appendChild(newXTermInput);
		newXTermDiv.appendChild(newXSpan);
		//add div to XTerm
		document.getElementById("new_term_rack").appendChild(newXTermDiv);
	}
}

function newC(me){

	if (document.getElementById("new_term_rack").children.length<10){
		//create div
		var newCTermDiv = document.createElement("div");
		newCTermDiv.id = "term_"+TERM_ID++;
		newCTermDiv.className = "term c";
		newCTermDiv.draggable = true;
		newCTermDiv.ondragstart = function(event) {
		    event.dataTransfer.setData("event_target_id", event.target.id);
		};
		//create input field
		var newCTermInput = document.createElement("input");
		newCTermInput.className = "coefficient";
		newCTermInput.value = 1;
		newCTermInput.maxLength = 3;
		newCTermInput.onchange = function(){
			if (this.value > 0){
				newXTermDiv.style.backgroundColor("#f00")
			}
			else {
				newXTermDiv.style.backgroundColor("#00f")
			}
		}
		//add input to div
		newCTermDiv.appendChild(newCTermInput);
		//add div to CTerm
		document.getElementById("new_term_rack").appendChild(newCTermDiv);
	}
}

function update(me){
	for (var i=0,l=leftSide.children.length;i<l;i++){
		var child = leftSide.children[i];
		var coefficient = child.children[0];
		var weight;
		if (child.className == "term x"){
			weight = coefficient.value * document.getElementById("x_val").value;
		}
		else if (child.className == "term c"){
			weight = coefficient.value;
		}
		console.log("term weight="+weight);
	}
}

function solve(me){

}