"use strict";

var context;
var centerX = 400;
var centerY = 300;
var angle = 0;
var TERM_ID = 0;
var A = 0, B = 0, C = 0, D = 0;
var _xVal;
var _termRack;
var _sides;
var _leftSide;
var _trash;
var _rightSide;
var leftWeight;
var rightWeight;



function init() {

	_termRack = $("#new_term_rack");
	_termRack.droppable({
		drop: handleRackDrop,
		over: highlightSide,
		out: highlightSide
	});
	
	//offset sides
	_sides = $("#sides");
	_sides.css("top",centerY - 20 - _sides.css("bottom-border-width") - _termRack.clientHeight);


	_leftSide = $('<div>');
	_leftSide.attr('id','left_side');
	_leftSide.addClass('side left');
	_leftSide.droppable({
		drop: handleTermDrop,
		over: highlightSide,
		out: highlightSide
	});
	_sides.append(_leftSide);



	_rightSide = $('<div>');
	_rightSide.attr('id','right_side');
	_rightSide.addClass('side right');
	_rightSide.droppable({
		drop: handleTermDrop,
		over: highlightSide,
		out: highlightSide
	});
	_sides.append(_rightSide);

	_trash = $("#trash");
	_trash.droppable({
		drop: handleTrashDrop
	});

	_xVal = $("#x_val");
	_xVal[0].oninput = function(){
		update();
	}

	rotate();

	newC();
	newC();
	newX();
}

function highlightSide(event,ui){
	$(this).toggleClass("highlighted");
}

function handleTermDrop(event,ui) {
	var draggable = $(ui.draggable);
	var droppable = $(this);
	if (droppable.children().length < 5){
		droppable.toggleClass("highlighted");
		droppable.append(draggable);
		//set offsets to 0
		draggable.left = 0;
		draggable.top = 0;
	}
	// if (dropped.style.backgroundColor == "red"){
	// 	dropped.style.backgroundColor = "blue";
	// 	coefficient.value = Math.abs(parseInt(coefficient.value));
	// } else {
	// 	dropped.style.backgroundColor = "red";
	// 	coefficient.value = -parseInt(coefficient.value);
	// }
	update();
}

function handleRackDrop(event,ui){
	var draggable = $(ui.draggable);
	var droppable = $(this);
	if (droppable.children().length < 5){
		droppable.toggleClass("highlighted");
		droppable.append(draggable);
	}
}

function handleTrashDrop(event,ui) {
	var draggable = $(ui.draggable);
	draggable.remove();
}

function newX(me) {
	console.log("new x");
	if (_termRack.children().length<10){
			
		var wrapper = $("<div>");
		wrapper.addClass("wrapper");
		wrapper.draggable({
			containment:'#canvas_container',
			cursor: 'move',
			snap: true,
			opacity: 0.7,
			zIndex: 1,
			tolerance: 'touch',
			revert: true
		});

		var newXTermDiv = $("<div>");
		newXTermDiv.addClass('term x');
		
		//create input field
		var newXTermInput = $("<input>");
		newXTermInput.addClass("coefficient");
		newXTermInput.attr('value',1);
		newXTermInput.attr('maxLength',3);
		newXTermInput.css('line-height',2);
		newXTermInput[0].oninput = function(){
			if (this.value < 0){
				newXTermDiv.css("backgroundColor","red");
			}
			else {
				newXTermDiv.css("backgroundColor","blue");
			}
			update();
		}
		//create span
		var newXSpan = $("<span>X</span>");
		newXSpan.addClass("xterm_x_label");

		//add span and input filed to div
		newXTermDiv.append(newXTermInput);
		newXTermDiv.append(newXSpan);
		
		wrapper.append(newXTermDiv);

		_termRack.append(wrapper);
	}
}

function newC(me) {
	if (_termRack.children().length<10){

		var wrapper = $("<div>");
		wrapper.addClass("wrapper");
		wrapper.draggable({
			containment:'#canvas_container',
			cursor: 'move',
			snap: true,
			opacity: 0.7,
			zIndex: 1,
			tolerance: 'touch',
			revert: true
		});


		var newCTermDiv = $("<div>");
		newCTermDiv.addClass("term c");
		
		var newCTermInput = $("<input>");
		newCTermInput.addClass("coefficient");
		newCTermInput.attr('value',1);
		newCTermInput.attr('maxLength',3);
		newCTermInput.css('line-height',2);
		newCTermInput[0].oninput = function(){
			if (this.value < 0){
				newCTermDiv.css("backgroundColor","red");
			}
			else {
				newCTermDiv.css("backgroundColor","blue");
			}
			update();
		}
		
		newCTermDiv.append(newCTermInput);

		wrapper.append(newCTermDiv);
		
		_termRack.append(wrapper);
	}
}

function update(me) {
	calculateWeights();
	
	if (leftWeight < rightWeight) {
		angle = -25;

	}
	else if (leftWeight > rightWeight) {
		angle = 25;
	}
	else if (leftWeight == rightWeight) {
		angle = 0;
	}

	rotate();
}

function solve(){
	var coefficients = calculateWeights();
	var newXValue = (coefficients[3] - coefficients[2]) / (coefficients[0] - coefficients[1]);
	xVal.value = newXValue;	
	update();
}

function calculateWeights(){
	leftWeight = 0;
	rightWeight = 0;
	var A=0,B=0,C=0,D=0;
	var x = parseInt(_xVal.attr('value'));

	for (var i = 0,l = _leftSide.children().length;i<l;i++){
	
		var wrapper = $(_leftSide.children()[i]);
		var term = $(wrapper.children()[0]);
		var coefficient = $(term.children()[0]);
	
		if (term.hasClass("x")) {
			var w = parseInt(coefficient.attr('value') * x);
			A += parseInt(coefficient.attr('value'));
			leftWeight += w;
		}
		else if (term.hasClass("c")) {
			var w =parseInt(coefficient.attr('value'));
			C += w;
			leftWeight += w;
		}
	}
	
	for (var i = 0,l = _rightSide.children().length;i<l;i++){
	
		var wrapper = $(_rightSide.children()[i]);
		var term = $(wrapper.children()[0]);
		var coefficient = $(term.children()[0]);
	
		if (term.hasClass("x")) {
			var w = parseInt(coefficient.attr('value') * x);
			B += parseInt(coefficient.attr('value'));
			rightWeight += w;
		}
		else if (term.hasClass("c")) {
			var w = parseInt(coefficient.attr('value'));
			D += w;
			rightWeight += w;
		}
	}

	console.log(leftWeight+" "+rightWeight);
	return [A,B,C,D];
}

function rotate() {

	if (angle == -25){
		_sides.addClass("sides-rotated-ccw");
		_sides.removeClass("sides-rotated-cw");
		_sides.removeClass("sides-flat");
	} else if (angle == 25){
		_sides.removeClass("sides-rotated-ccw");
		_sides.addClass("sides-rotated-cw");
		_sides.removeClass("sides-flat");
	} else if (angle == 0){
		_sides.removeClass("sides-rotated-ccw");
		_sides.removeClass("sides-rotated-cw");
		_sides.addClass("sides-flat");
	}

}