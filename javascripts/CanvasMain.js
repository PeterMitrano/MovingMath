"use strict";

var TERM_ID = 0;
var leftSide;
var rightSide;

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


	leftSide = document.createElement("div");
	leftSide.id = "left_side";
	leftSide.style.top=(canvas.height/2-barH/2-150)+"px";
	leftSide.ondragover = function(event) {
	    event.preventDefault();
	};
	leftSide.ondrop = function(event) {
	    if ( event.target.id == "left_side"  && leftSide.children.length < 5) {
	        var data = event.dataTransfer.getData("event_target_id");
	        event.target.appendChild(document.getElementById(data));
	    }
	};
	document.getElementById("canvas_container").appendChild(leftSide);


	rightSide = document.createElement("div");
	rightSide.id = "right_side";
	rightSide.style.top=(canvas.height/2-barH/2-150)+"px";
	rightSide.ondragover = function(event) {
	    event.preventDefault();
	};
	rightSide.ondrop=function(event){
		if ( event.target.id == "right_side" && rightSide.children.length < 5) {
	        var data = event.dataTransfer.getData("event_target_id");
	        event.target.appendChild(document.getElementById(data));
	    }
	};
	document.getElementById("canvas_container").appendChild(rightSide);

}

function newX(me){
	//create div
	var newXTermDiv = document.createElement("div");
	newXTermDiv.id = "term_"+TERM_ID++;
	newXTermDiv.className = "x_term";
	newXTermDiv.draggable = true;
	newXTermDiv.ondragstart = function(event) {
	    event.dataTransfer.setData("event_target_id", event.target.id);
	};
	//create input field
	var newXInput = document.createElement("input");
	newXInput.className = "coefficient";
	newXInput.value = 1;
	newXInput.maxLength = 3;
	//create span
	var newXSpan = document.createElement("span");
	newXSpan.innerHTML = "X";
	//add span and input filed to div
	newXTermDiv.appendChild(newXInput);
	newXTermDiv.appendChild(newXSpan);
	//add div to XTerm
	document.getElementById("canvas_container").appendChild(newXTermDiv);
}

function newC(me){
	//create div
	var newCTermDiv = document.createElement("div");
	newCTermDiv.id = "term_"+TERM_ID++;
	newCTermDiv.className = "c_term";
	newCTermDiv.draggable = true;
	newCTermDiv.ondragstart = function(event) {
	    event.dataTransfer.setData("event_target_id", event.target.id);
	};
	//create input field
	var newCTermInput = document.createElement("input");
	newCTermInput.className = "coefficient";
	newCTermInput.value = 1;
	newCTermInput.maxLength = 3;
	//add input to div
	newCTermDiv.appendChild(newCTermInput);
	//add div to CTerm
	document.getElementById("canvas_container").appendChild(newCTermDiv);
}

function update(me){

}

function solve(me){

}