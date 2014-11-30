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
	var draggedFrom = $(draggable.parent());
	if (droppable.children().length < 3){
		droppable.toggleClass("highlighted");
		draggable.position(0,0);
		droppable.append(draggable);
		if (draggedFrom.hasClass("side")){
			var red = "rgb(255, 0, 0)";
			var blue = "rgb(0, 0, 255)";
			var term = $(draggable.children()[0]);
			var coefficient = $(term.children()[0]);
			if (term.css('backgroundColor') == red){
				term.css('backgroundColor', blue);
				coefficient.attr('value',Math.abs(parseInt(coefficient.attr('value'))));
			} else if (term.css('backgroundColor') == blue){
				term.css('backgroundColor', red);
				coefficient.attr('value',-Math.abs(parseInt(coefficient.attr('value'))));
			} else {
				console.log(term.css('backgroundColor'));
			}
		}
	}
	update();
}

function handleRackDrop(event,ui){
	var draggable = $(ui.draggable);
	var droppable = $(this);
	if (droppable.children().length < 3){
		droppable.toggleClass("highlighted");
		droppable.append(draggable);
		draggable.position(0,0);
	}
	update();
}

function handleTrashDrop(event,ui) {
	var draggable = $(ui.draggable);
	draggable.remove();
	update();
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
			revert: true,
			revertDuration: 0
		});

		var newXTermDiv = $("<div>");
		newXTermDiv.attr('id','term_'+(TERM_ID++));
		newXTermDiv.addClass('term x');
		
		//create input field
		var newXTermInput = $("<input>");
		newXTermInput.addClass("coefficient");
		newXTermInput.attr('value',1);
		newXTermInput.attr('maxLength',3);
		newXTermInput.css('line-height',2);
		newXTermInput.css('margin-left','-15px');
		newXTermInput[0].oninput = function(){
			if (this.value < 0){
				newXTermDiv.css("backgroundColor","red");
			}
			else {
				newXTermDiv.css("backgroundColor","blue");
			}
			update();
		}
		newXTermDiv.each(function() {
			$(this).click(function() {
				newXTermInput.focus();
			});
		});

		//create span
		var newXSpan = $("<span>X</span>");
		newXSpan.addClass("xterm_x_label");

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
			revert: true,
			revertDuration: 0
		});


		var newCTermDiv = $("<div>");
		newCTermDiv.attr('id','term_'+(TERM_ID++));
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
		newCTermDiv.each(function() {
			$(this).click(function() {
				newCTermInput.focus();
			});
		});
		
		newCTermDiv.append(newCTermInput);

		wrapper.append(newCTermDiv);
		
		_termRack.append(wrapper);
	}
}

function update(me) {
	//map click to get focus!

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
	_xVal.attr('value',newXValue);
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