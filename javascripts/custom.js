'use strict';

var context;
var centerX = 400;
var centerY = 300;
var angle = 0;
var TERM_ID = 0;
var A = 0, B = 0, C = 0, D = 0;
var red = 'rgb(255, 0, 0)';
var blue = 'rgb(0, 0, 255)';
var _xVal;
var _show_x;
var _scale_eq;
var _problem_eq;
var _termRack;
var _sides;
var _leftSide;
var _trash;
var _rightSide;
var leftWeight;
var rightWeight;



function init() {

	_termRack = $('#new_term_rack');
	_termRack.droppable({
		drop: handleRackDrop,
		over: highlightSide,
		out: highlightSide
	});
	
	//offset sides
	_sides = $('#sides');
	_sides.css('top',centerY - 20 - _sides.css('bottom-border-width') - _termRack.clientHeight);


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

	_trash = $('#trash');
	_trash.droppable({
		drop: handleTrashDrop
	});

	_xVal = $('#x_val');
	_xVal[0].oninput = function(){
		update();
	}

	_scale_eq = $('#scale_eq');
	_problem_eq = $('#problem_eq');

	rotate();

	newC();
	newC();
	newX();
}

function hideX(cb){
	_xVal.toggleClass("invisible");
}

function highlightSide(event,ui){
	$(this).toggleClass('highlighted');
}

function handleTermDrop(event,ui) {
	var draggable = $(ui.draggable);
	var droppable = $(this);
	var draggedFrom = $(draggable.parent());
	if (droppable.children().length < 3){
		droppable.toggleClass('highlighted');
		draggable.position(0,0);
		droppable.append(draggable);
		if (draggedFrom.hasClass('side') && draggedFrom.attr('id') != droppable.attr('id')){
			var term = $(draggable.children()[0]);
			var coefficient = $(term.children()[0]);
			if (term.css('backgroundColor') === red){
				term.css('backgroundColor', blue);
				coefficient.attr('value',Math.abs(parseFloat(coefficient.val())));
			} else if (term.css('backgroundColor') === blue){
				term.css('backgroundColor', red);
				coefficient.attr('value',-Math.abs(parseFloat(coefficient.val())));
			}
		}
	}
	update();
}

function handleRackDrop(event,ui){
	var draggable = $(ui.draggable);
	var droppable = $(this);
	if (droppable.children().length < 10){
		droppable.toggleClass('highlighted');
		droppable.append(draggable);
	}
	update();
}

function handleTrashDrop(event,ui) {
	var draggable = $(ui.draggable);
	draggable.remove();
	update();
}

function handleTermToTermDrop(event,ui){
	var draggable = $(ui.draggable);
	var droppable = $(this);

	var term1 = $(droppable.children()[0]);
	var term2 = $(draggable.children()[0]);

	console.log(term1.attr('class') + " " + term2.attr('class'));

	if (term1.attr('class') === term2.attr('class')){

		
		var coefficient1 = $(term1.children()[0]);
		var coefficient2 = $(term2.children()[0]);
		var val1 = coefficient1.val();
		var val2 = coefficient2.val();
		var sum = parseFloat(val1) + parseFloat(val2);
		
		coefficient1.attr('value',sum);
		
		if (sum>0){
			term1.css('backgroundColor',blue);
		}
		else {
			term1.css('backgroundColor',red);
		}
		
		draggable.remove();
	}

	droppable.toggleClass('highlighted');
	update();
}

function newX(me) {
	if (_termRack.children().length<8){
			
		var wrapper = $('<div>');
		wrapper.addClass('wrapper');
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
		wrapper.droppable({
			drop: handleTermToTermDrop,
			over: highlightSide,
			out: highlightSide
		});
		var newXTermDiv = $('<div>');
		newXTermDiv.attr('id','term_'+(TERM_ID++));
		newXTermDiv.addClass('term x');
		
		//create input field
		var newXCoefficient = $('<input>');
		newXCoefficient.addClass('coefficient');
		newXCoefficient.attr('value',1);
		newXCoefficient.attr('maxLength',5);
		newXCoefficient.css('line-height',3.5);
		newXCoefficient.css('margin-left','-15px');
		newXCoefficient[0].oninput = function(){
			if (this.value < 0){
				newXTermDiv.css('backgroundColor','red');
			}
			else {
				newXTermDiv.css('backgroundColor','blue');
			}
			update();
		}
		newXTermDiv.each(function() {
			$(this).click(function() {
				newXCoefficient.focus();
			});
		});

		//create span
		var newXSpan = $('<span>X</span>');
		newXSpan.addClass('xterm_x_label');

		newXTermDiv.append(newXCoefficient);
		newXTermDiv.append(newXSpan);
		
		wrapper.append(newXTermDiv);

		_termRack.append(wrapper);
	}
}

function newC(me) {
	if (_termRack.children().length<8){

		var wrapper = $('<div>');
		wrapper.addClass('wrapper');
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
		wrapper.droppable({
			drop: handleTermToTermDrop,
			over: highlightSide,
			out: highlightSide
		});


		var newCTermDiv = $('<div>');
		newCTermDiv.attr('id','term_'+(TERM_ID++));
		newCTermDiv.addClass('term c');
		
		var newCCoefficient = $('<input>');
		newCCoefficient.addClass('coefficient constant');
		newCCoefficient.attr('value',1);
		newCCoefficient.attr('maxLength',6);
		newCCoefficient.css('line-height',3.5);
		newCCoefficient[0].oninput = function(){
			if (this.value < 0){
				newCTermDiv.css('backgroundColor','red');
			}
			else {
				newCTermDiv.css('backgroundColor','blue');
			}
			update();
		}

		newCTermDiv.each(function() {
			$(this).click(function() {
				newCCoefficient.focus();
			});
		});
		
		newCTermDiv.append(newCCoefficient);

		wrapper.append(newCTermDiv);
		
		_termRack.append(wrapper);
	}
}

function update(me) {
	calculateWeights();
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
	var x = getXVal();

	for (var i = 0,l = _leftSide.children().length;i<l;i++){
	
		var wrapper = $(_leftSide.children()[i]);
		var term = $(wrapper.children()[0]);
		var coefficient = $(term.children()[0]);
	
		if (term.hasClass('x')) {
			var c;
			if (coefficient.val()===""){
				c = 1;
			}
			else {
				c = getFloatVal(coefficient);	
			}

			var w = parseFloat(c * x);
			
			A += c;
			
			leftWeight += w;
		}
		else if (term.hasClass('c')) {
			var w =getFloatVal(coefficient);
			C += w;
			leftWeight += w;
		}
	}
	
	for (var i = 0,l = _rightSide.children().length;i<l;i++){
	
		var wrapper = $(_rightSide.children()[i]);
		var term = $(wrapper.children()[0]);
		var coefficient = $(term.children()[0]);
	
		if (term.hasClass('x')) {
			var c;
			if (coefficient.val() === ""){
				c = 1;
			} else {
				c = getFloatVal(coefficient);	
			}

			var w = parseFloat(c * x);

			B += c;
			rightWeight += w;
		}
		else if (term.hasClass('c')) {
			var w = getFloatVal(coefficient);
			D += w;
			rightWeight += w;
		}
	}

	var diff = Math.abs(rightWeight-leftWeight);

	if (leftWeight > rightWeight && diff > 0.001 ) {
		angle = 25;

	}
	else if (leftWeight < rightWeight  && diff > 0.001) {
		angle = -25;
	}
	else {
		angle = 0;
	}

	//build equation
	var eq = '';

	if (A!=0){
		eq += A+'X';
		if (C!=0){
			eq += '+'+C;
		}
	}
	else {
		eq += C;
	}
	
	if (angle === -25){
		eq += '<';
	}
	else if (angle === 25){
		eq += '>';
	}
	else if (angle === 0){
		eq += '=';
	}


	if (B!=0){
		eq += B+'X';
		if (D!=0){
			eq += '+'+D;
		}
	}
	else {
		eq += D;
	}

	eq = eq.replace(/\+\-/g, '-');
	_scale_eq.attr('value',eq);
	return [A,B,C,D];
}

function rotate() {

	if (angle === -25){
		_sides.addClass('sides-rotated-ccw');
		_sides.removeClass('sides-rotated-cw');
		_sides.removeClass('sides-flat');
	} else if (angle === 25){
		_sides.removeClass('sides-rotated-ccw');
		_sides.addClass('sides-rotated-cw');
		_sides.removeClass('sides-flat');
	} else if (angle === 0){
		_sides.removeClass('sides-rotated-ccw');
		_sides.removeClass('sides-rotated-cw');
		_sides.addClass('sides-flat');
	}

}

function getXVal(){
	return getFloatVal(_xVal);
}

function getFloatVal(object){
	var val = object.val();
	var floatVal;
	//check for fraction
	var i;
	if ((i = val.indexOf("/")) > -1){
		var num = val.substring(0,i);
		var denom = val.substring(i+1);
		floatVal = parseFloat(num)/parseFloat(denom);
	}
	else {
		floatVal = parseFloat(val);
	}
	return floatVal;
}

