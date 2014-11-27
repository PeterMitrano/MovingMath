"use strict";

var leftTerms = [];
var rightTerms = [];

function paint(){

	var canvas = document.getElementById("myCanvas");
	var centerX = canvas.width/2;
	var centerY = canvas.height/2;

	var context = canvas.getContext("2d");
	context.fillStyle = "#000000";
	var barW=600;
	var barH=20;
	context.fillRect(centerX-barW/2,centerY-barH/2,barW,barH);

}

function newX(me){
	var newXTermDiv = document.createElement("div");
	newXTermDiv.className = "x_term";

	var newXInput = document.createElement("input");
	newXInput.className = "coefficient";
	newXInput.value=1;
	newXInput.maxLength=3;

	var newXSpan = document.createElement("span");
	newXSpan.innerHTML="X";

	newXTermDiv.appendChild(newXInput);
	newXTermDiv.appendChild(newXSpan);

	document.getElementById("program").appendChild(newXTermDiv);
}

function newC(me){
	var newCTermDiv = document.createElement("div");
	newCTermDiv.className="c_term";

	var newCTermInput = document.createElement("input");
	newCTermInput.className="coefficient";
	newCTermInput.value=1;
	newCTermInput.maxLength=3;
	
	newCTermDiv.appendChild(newCTermInput);

	document.getElementById("program").appendChild(newCTermDiv);
}

function update(me){

}

function solve(me){

}