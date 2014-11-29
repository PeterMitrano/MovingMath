"use strict";

var canvas;
var context;
var centerX;
var centerY;
var angle = 0;
var TERM_ID = 0;
var A = 0,B = 0,C = 0,D = 0;
var xVal;
var termRack;
var sides;
var leftSide;
var rightSide;
var leftWeight;
var rightWeight;
var trash;

function init(){
	canvas = document.getElementById("my_canvas");
	centerX = canvas.width/2;
	centerY = canvas.height/2;

	context = canvas.getContext("2d");

	var leftSideHeight = 50;
	termRack = document.getElementById("new_term_rack");
	var termRackHeight = termRack.clientHeight;
	termRack.ondragover = function(event) {
		console.log("ondragover");
	    event.preventDefault();
	};
	termRack.ondrop = function(event) {
		console.log("ondrop");
	    if (event.target.id == "new_term_rack") {
	        var data = event.dataTransfer.getData("text/html");
	        var dropped = document.getElementById(data);
	        event.target.appendChild(dropped);
	    }
	    update();
	};

	//offset sides
	sides = document.getElementById("sides");
	sides.style.top=(canvas.height/2-20-sides.style.borderBottomWidth-termRackHeight)+"px";

	leftSide = document.createElement("div");
	leftSide.id = "left_side";
	leftSide.className = "side left";
	leftSide.ondragover = function(event) {
	    event.preventDefault();
	};
	leftSide.ondrop = function(event) {
	    if ( event.target.id == "left_side"  && leftSide.children.length < 5) {
	        var data = event.dataTransfer.getData("text/html");
	        var dropped = document.getElementById(data);
	        event.target.appendChild(dropped);
	    }
	    update();
	};
	document.getElementById("sides").appendChild(leftSide);


	rightSide = document.createElement("div");
	rightSide.id = "right_side";
	rightSide.className = "side right";
	rightSide.ondragover = function(event) {
	    event.preventDefault();
	};
	rightSide.ondrop=function(event){
		if ( event.target.id == "right_side" && rightSide.children.length < 5) {
	        var data = event.dataTransfer.getData("text/html");
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
			var data = event.dataTransfer.getData("text/html");
			event.target.appendChild(document.getElementById(data));
		}
		update();
	}

	xVal = document.getElementById("x_val");
	xVal.oninput = function(){
		update();
	}

	draw();

	newC();
	newC();
	newC();
}


function draw(){

	console.log(angle);

	if (angle == -25){
		sides.className = "sides-rotated-ccw";
	} else if (angle == 25){
		sides.className = "sides-rotated-cw";
	} else {
		sides.className = "sides-flat";
	}

}

function newX(me){
	if (termRack.children.length<10){
		//create div
		var newXTermDiv = document.createElement("div");
		newXTermDiv.id = "term_"+TERM_ID++;
		newXTermDiv.className = "term x";
		newXTermDiv.draggable = true;
		newXTermDiv.ondragstart = function(event) {
		    event.dataTransfer.setData("text/html", event.target.id);
		};
		//create input field
		var newXTermInput = document.createElement("input");
		newXTermInput.className = "coefficient";
		newXTermInput.value = 1;
		newXTermInput.maxLength = 3;
		newXTermInput.oninput = function(){
			if (this.value < 0){
				newXTermDiv.style.backgroundColor = "Red";
			}
			else {
				newXTermDiv.style.backgroundColor = "Blue";
			}
			update();
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

	if (termRack.children.length<10){
		//create div
		var newCTermDiv = document.createElement("div");
		newCTermDiv.id = "term_"+TERM_ID++;
		newCTermDiv.className = "term c";
		newCTermDiv.draggable = true;
		newCTermDiv.ondragstart = function(event) {
		    event.dataTransfer.setData("text/html", event.target.id);
		};
		//create input field
		var newCTermInput = document.createElement("input");
		newCTermInput.className = "coefficient";
		newCTermInput.value = 1;
		newCTermInput.maxLength = 3;
		newCTermInput.oninput = function(){
			if (this.value < 0){
				newCTermDiv.style.backgroundColor = "Red";
			}
			else {
				newCTermDiv.style.backgroundColor = "Blue";
			}
			update();
		}
		//add input to div
		newCTermDiv.appendChild(newCTermInput);
		//add div to CTerm
		document.getElementById("new_term_rack").appendChild(newCTermDiv);
	}
}

function update(me){
	calculateWeights();
	
	if (leftWeight < rightWeight){
		angle = -25;

	}
	else if (leftWeight > rightWeight){
		angle = 25;
	}
	else{
		angle = 0;
	}

	draw();
}

function solve(){
	var coefficients = calculateWeights();
	var newXValue = (coefficients[3] - coefficients[2]) / (coefficients[0] - coefficients[1]);
	console.log("x="+newXValue);
	xVal.value = newXValue;	
	update();
}

function calculateWeights(){
	leftWeight = 0;
	rightWeight = 0;
	var A=0,B=0,C=0,D=0;

	for (var i = 0,l = leftSide.children.length;i<l;i++){
		var child = leftSide.children[i];
		var coefficient = child.children[0];
		if (child.className == "term x"){
			var w = parseInt(coefficient.value * document.getElementById("x_val").value);
			A += parseInt(coefficient.value);
			leftWeight += w;
		}
		else if (child.className == "term c"){
			var w =parseInt(coefficient.value);
			C += w;
			leftWeight += w;
		}
	}
	
	for (var i = 0,l = rightSide.children.length;i<l;i++){
		var child = rightSide.children[i];
		var coefficient = child.children[0];
		if (child.className == "term x"){
			var w = parseInt(coefficient.value * document.getElementById("x_val").value);
			C += parseInt(coefficient.value);
			rightWeight += w;
		}
		else if (child.className == "term c"){
			var w = parseInt(coefficient.value);
			D += w;
			rightWeight += w;
		}
	}
	return [A,B,C,D];
}