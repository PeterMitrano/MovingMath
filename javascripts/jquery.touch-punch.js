/*!
 * jQuery Touch Punch 0.1
 *
 * extended from jQuery UI Touch Punch 0.2.2 Copyright 2011, Dave Furfero
 * Copyright 2013, Michael Angstadt 
	- modified eliminate the requirement of jQuery UI usage
	- extended into jQuery plugin to be used on specific elements
	- usage is for elements that you've defined mouse event handlers for
	  and want to extend touch interface events to simulate these events properly
	  on touch interface devices
	
	- ex. $('.draggableObject').touchDraggable();
	
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.js
 */
(function ($) {
    $.fn.touchDraggable = function () {

        //Detect touch support
        $.support.touch = 'ontouchend' in document;

        //if we don't support touch, ignore it
        if (!$.support.touch) {
            return;
        }

        //hook up the touch events to the mouse events
        this._touchHandled = false;
        this._touchMoved = false;

        /**
        * Simulate a mouse event based on a corresponding touch event
        * @param {Object} event A touch event
        * @param {String} simulatedType The corresponding mouse event
        */
        function simulateMouseEvent(event, simulatedType) {

            // Ignore multi-touch events
            if (event.touches.length > 1) {
                return;
            }

            event.preventDefault();

            var touch = event.changedTouches[0],
        simulatedEvent = document.createEvent('MouseEvents');

            // Initialize the simulated mouse event using the touch event's coordinates
            simulatedEvent.initMouseEvent(
      simulatedType,    // type
      true,             // bubbles                    
      true,             // cancelable                 
      window,           // view                       
      1,                // detail                     
      touch.screenX,    // screenX                    
      touch.screenY,    // screenY                    
      touch.clientX,    // clientX                    
      touch.clientY,    // clientY                    
      false,            // ctrlKey                    
      false,            // altKey                     
      false,            // shiftKey                   
      false,            // metaKey                    
      0,                // button                     
      null              // relatedTarget              
    );

            // Dispatch the simulated event to the target element
            event.target.dispatchEvent(simulatedEvent);
        }


        //incase we've got multiple items
        var theseElements = this;
        for (var i = 0; i < theseElements.length; i++) {
            /**
            * Add an event handler to the jQuery object's element for 'touchstart'
            * using any pre-defined handlers for typical browser events
            */
            theseElements[i].addEventListener("touchstart", function (event) {

                var self = this;
                
                // Ignore the event if another element is already being handled
                // removed test to see if the mouse is handling it - b/c we already
                // control if we aren't on a touch device.
                if (self._touchHandled) {
                    return;
                }

                // Set the flag to prevent other elements from inheriting the touch event
                self._touchHandled = true;

                // Track movement to determine if interaction was a click
                self._touchMoved = false;

                // Simulate the mouseover event
                simulateMouseEvent(event, 'mouseover');

                // Simulate the mousemove event
                simulateMouseEvent(event, 'mousemove');

                // Simulate the mousedown event
                simulateMouseEvent(event, 'mousedown');
            });

            /**
            * Add an event handler to the jQuery object's element for 'touchmove'
            * using any pre-defined handlers for typical browser events
            */
            theseElements[i].addEventListener("touchmove", function (event) {

                // Ignore event if not handled
                if (!this._touchHandled) {
                    return;
                }

                // Interaction was not a click
                this._touchMoved = true;

                // Simulate the mousemove event
                simulateMouseEvent(event, 'mousemove');
            });

            /**
            * Add an event handler to the jQuery object's element for 'touchend'
            * using any pre-defined handlers for typical browser events
            */
            theseElements[i].addEventListener("touchend", function (event) {

                // Ignore event if not handled
                if (!this._touchHandled) {
                    return;
                }

                // Simulate the mouseup event
                simulateMouseEvent(event, 'mouseup');

                // Simulate the mouseout event
                simulateMouseEvent(event, 'mouseout');

                // If the touch interaction did not move, it should trigger a click
                if (!this._touchMoved) {

                    // Simulate the click event
                    simulateMouseEvent(event, 'click');
                }

                // Unset the flag to allow other widgets to inherit the touch event
                this._touchHandled = false;
            });


        }
    };
})(jQuery);