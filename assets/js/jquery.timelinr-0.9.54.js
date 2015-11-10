/* ----------------------------------
jQuery Timelinr 0.9.54
tested with jQuery v1.6+

Copyright 2011, CSSLab.cl
Free under the MIT license.
http://www.opensource.org/licenses/mit-license.php

instructions: http://www.csslab.cl/2011/08/18/jquery-timelinr/
---------------------------------- */

jQuery.fn.timelinr = function(options){

	// default plugin settings
	settings = jQuery.extend({
		orientation: 				'horizontal',		// value: horizontal | vertical, default to horizontal
		containerDiv: 				'#timeline',		// value: any HTML tag or #id, default to #timeline
		datesDiv: 					'#dates',			// value: any HTML tag or #id, default to #dates
		datesSelectedClass: 		'selected',			// value: any class, default to selected
		datesSpeed: 				'normal',			// value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to normal
		issuesDiv: 					'#issues',			// value: any HTML tag or #id, default to #issues
		issuesSelectedClass: 		'selected',			// value: any class, default to selected
		issuesSpeed: 				'fast',				// value: integer between 100 and 1000 (recommended) or 'slow', 'normal' or 'fast'; default to fast
		issuesTransparency: 		0.2,				// value: integer between 0 and 1 (recommended), default to 0.2
		issuesTransparencySpeed: 	500,				// value: integer between 100 and 1000 (recommended), default to 500 (normal)
		prevButton: 				'#prev',			// value: any HTML tag or #id, default to #prev
		nextButton: 				'#next',			// value: any HTML tag or #id, default to #next
		arrowKeys: 					'false',			// value: true | false, default to false
		startAt: 					1,					// value: integer, default to 1 (first)
		autoPlay: 					false,			    // value: true | false, default to false
		autoPlayDirection: 			'forward',			// value: forward | backward, default to forward
		autoPlayPause: 				2000				// value: integer (1000 = 1 sec), default to 2000 (2secs)
	}, options);

	$(function(){

		// setting variables... many of them
        // removing unused variables
        //currentDate = $(settings.datesDiv).find('a.' + settings.datesSelectedClass),
        //currentIssue = $(settings.issuesDiv).find('li.' + settings.issuesSelectedClass),
        //widthIssues = $(settings.issuesDiv).width(),
        //heightIssues = $(settings.issuesDiv).height(),
        //widthDates = $(settings.datesDiv).width(),
        //heightDates = $(settings.datesDiv).height(),

		var howManyDates = $(settings.datesDiv + ' li').length,
		    howManyIssues = $(settings.issuesDiv + ' li').length,
		    widthContainer,
		    heightContainer,
		    widthIssue,
			calcHeight,
		    heightIssue = $(settings.issuesDiv + ' li').height(),
		    widthDate = $(settings.datesDiv + ' li').width(),
		    heightDate = $(settings.datesDiv + ' li').height(),
            defaultPositionDates;

		setWidths();

		function setWidths() {

			//if($( window ).width() < 768) {
			//	console.log("width: " + $( ".container" ).width());
				$("#issues").children().width(($( ".container" ).width()));
				//$("#issues").children().width(($( window ).width()));
				$("#time-line-holder").height("auto");

			//} else {

				calcHeight = 0;

                $("#issues").children().css('height', 'auto');

				$("#issues").children().each(function(){
					//console.log("issue child");
					if ($(this).height() > calcHeight) {
						calcHeight = $(this).height();
					}
					//console.log($(this).height());
				});

				//console.log("calc = " + calcHeight);

				$("#issues").children().height(calcHeight);
				$("#time-line-holder").height(calcHeight + 280);

				//console.log("height: " + $("#issues").height());
			//}

			// set positions!
			if(settings.orientation == 'horizontal') {

				widthIssue = $(settings.issuesDiv + ' li').width();

				widthContainer = $(settings.containerDiv).width();

				//console.log(widthContainer);

				$(settings.issuesDiv).width(widthIssue * howManyIssues);

				$(settings.datesDiv).width(widthDate * howManyDates).css('marginLeft', widthContainer/2 - widthDate/2);

				defaultPositionDates = parseInt(
					$(settings.datesDiv).css('marginLeft').substring(0, $(settings.datesDiv).css('marginLeft').indexOf('px'))
				);
				//console.log(defaultPositionDates);

			} else if(settings.orientation == 'vertical') {

				heightContainer = $(settings.containerDiv).height();

				$(settings.issuesDiv).height(heightIssue * howManyIssues);

				$(settings.datesDiv).height(heightDate * howManyDates).css('marginTop', heightContainer/2 - heightDate/2);

				defaultPositionDates = parseInt(
					$(settings.datesDiv).css('marginTop').substring(0, $(settings.datesDiv).css('marginTop').indexOf('px'))
				);

			}
		}
		
		$(settings.datesDiv + ' a').click(function(event){

            //setWidths();
			event.preventDefault();

			// first vars
			//var whichIssue = $(this).text(),
			var currentIndex = $(this).parent().prevAll().length;

			// moving the elements
			if(settings.orientation == 'horizontal') {

				$(settings.issuesDiv).animate(
                    {
                        'marginLeft'    :   -widthIssue * currentIndex
                    },
                    {
                        queue           :   false,
                        duration        :   settings.issuesSpeed
                    }
                );

			} else if(settings.orientation == 'vertical') {

				$(settings.issuesDiv).animate(
                    {
                        'marginTop' :   -heightIssue * currentIndex
                    },
                    {
                        queue       :   false,
                        duration    :   settings.issuesSpeed
                    }
                );

			}

			$(settings.issuesDiv + ' li').animate(
                {
                    'opacity'   :   settings.issuesTransparency
                },
                {
                    queue       :   false,
                    duration    :   settings.issuesSpeed
                }
            ).removeClass(settings.issuesSelectedClass).eq(currentIndex).addClass(settings.issuesSelectedClass).fadeTo(settings.issuesTransparencySpeed, 1);

			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows | bugfixed: arrows not showing when jumping from first to last date
			if(howManyDates == 1) {

				$(settings.prevButton + ',' + settings.nextButton).fadeOut('fast');

			} else if(howManyDates == 2) {

				if($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {

					$(settings.prevButton).fadeOut('fast');
				 	$(settings.nextButton).fadeIn('fast');

				} else if ($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {

					$(settings.nextButton).fadeOut('fast');
					$(settings.prevButton).fadeIn('fast');

				}

			} else {

				if( $(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass) ) {

					$(settings.nextButton).fadeIn('fast');
					$(settings.prevButton).fadeOut('fast');

				} else if( $(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass) ) {

					$(settings.prevButton).fadeIn('fast');
					$(settings.nextButton).fadeOut('fast');

				} else {

					$(settings.nextButton + ',' + settings.prevButton).fadeIn('slow');

				}	
			}

			// now moving the dates
            // add the selected class to the li to change all the styles
			//$(settings.datesDiv + ' a').removeClass(settings.datesSelectedClass);
            $(settings.datesDiv + ' li').removeClass(settings.datesSelectedClass);
            //console.log($(settings.datesDiv));

			//$(this).addClass(settings.datesSelectedClass);
            $(this).parent().addClass(settings.datesSelectedClass);


			if(settings.orientation == 'horizontal') {

				$(settings.datesDiv).animate(
                    {
                        'marginLeft'    :   defaultPositionDates - (widthDate * currentIndex)
                    },
                    {
                        queue           :   false,
                        duration        :   'settings.datesSpeed'
                    }
                );

			} else if(settings.orientation == 'vertical') {

				$(settings.datesDiv).animate(
                    {
                        'marginTop'     :   defaultPositionDates - (heightDate * currentIndex)
                    },
                    {
                        queue           :   false,
                        duration        :   'settings.datesSpeed'
                    }
                );

			}
		});

		$(settings.nextButton).bind('click', function(event){

            //setWidths();
			event.preventDefault();

			// bugixed from 0.9.54: now the dates gets centered when there's too much dates.
			var currentIndex = $(settings.issuesDiv).find('li.' + settings.issuesSelectedClass).index(),
                currentPositionIssues, currentPositionDates;
            //currentIssueIndex, currentIssueDate


			if(settings.orientation == 'horizontal') {

				currentPositionIssues = parseInt(
                    $(settings.issuesDiv).css('marginLeft').substring(0, $(settings.issuesDiv).css('marginLeft').indexOf('px'))
                );
				//currentIssueIndex = currentPositionIssues / widthIssue;

                //currentPositionDates = parseInt(
                //    $(settings.datesDiv).css('marginLeft').substring(0, $(settings.datesDiv).css('marginLeft').indexOf('px'))
                //);
				//currentIssueDate = currentPositionDates - widthDate;

				if(currentPositionIssues <= -(widthIssue * howManyIssues-(widthIssue))) {

					$(settings.issuesDiv).stop();
					$(settings.datesDiv + ' li:last-child a').click();

				} else {

					if (!$(settings.issuesDiv).is(':animated')) {

						// bugixed from 0.9.52: now the dates gets centered when there's too much dates.
						$(settings.datesDiv + ' li').eq(currentIndex+1).find('a').trigger('click');
					}
				}

			} else if(settings.orientation == 'vertical') {

				currentPositionIssues = parseInt(
                    $(settings.issuesDiv).css('marginTop').substring(0, $(settings.issuesDiv).css('marginTop').indexOf('px'))
                );
				//currentIssueIndex = currentPositionIssues/heightIssue;

                //currentPositionDates = parseInt(
                //    $(settings.datesDiv).css('marginTop').substring(0, $(settings.datesDiv).css('marginTop').indexOf('px'))
                //);
				//currentIssueDate = currentPositionDates-heightDate;

				if(currentPositionIssues <= -(heightIssue * howManyIssues - (heightIssue))) {

					$(settings.issuesDiv).stop();
					$(settings.datesDiv + ' li:last-child a').click();

				} else {

					if (!$(settings.issuesDiv).is(':animated')) {

						// bugixed from 0.9.54: now the dates gets centered when there's too much dates.
						$(settings.datesDiv + ' li').eq(currentIndex+1).find('a').trigger('click');
					}
				}
			}

			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
			if(howManyDates == 1) {

				$(settings.prevButton + ',' + settings.nextButton).fadeOut('fast');

			} else if(howManyDates == 2) {

				if($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {

					$(settings.prevButton).fadeOut('fast');
				 	$(settings.nextButton).fadeIn('fast');

				} else if($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {

					$(settings.nextButton).fadeOut('fast');
					$(settings.prevButton).fadeIn('fast');

				}

			} else {

				if( $(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass) ) {

					$(settings.prevButton).fadeOut('fast');

				} else if( $(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass) ) {

					$(settings.nextButton).fadeOut('fast');

				} else {

					$(settings.nextButton + ',' + settings.prevButton).fadeIn('slow');
				}	
			}
		});

		$(settings.prevButton).click(function(event){

            //setWidths();
			event.preventDefault();

			// bugixed from 0.9.54: now the dates gets centered when there's too much dates.
			var currentIndex = $(settings.issuesDiv).find('li.' + settings.issuesSelectedClass).index(),
                currentPositionIssues, currentPositionDates;
            // currentIssueDate, currentIssueIndex

			if(settings.orientation == 'horizontal') {

				currentPositionIssues = parseInt($(settings.issuesDiv).css('marginLeft').substring(0, $(settings.issuesDiv).css('marginLeft').indexOf('px')));
				//currentIssueIndex = currentPositionIssues / widthIssue;

				//currentPositionDates = parseInt($(settings.datesDiv).css('marginLeft').substring(0, $(settings.datesDiv).css('marginLeft').indexOf('px')));
				//currentIssueDate = currentPositionDates + widthDate;

				if(currentPositionIssues >= 0) {

					$(settings.issuesDiv).stop();
					$(settings.datesDiv + ' li:first-child a').click();

				} else {

					if (!$(settings.issuesDiv).is(':animated')) {

						// bugixed from 0.9.54: now the dates gets centered when there's too much dates.
						$(settings.datesDiv + ' li').eq(currentIndex - 1).find('a').trigger('click');
					}
				}

			} else if(settings.orientation == 'vertical') {

				currentPositionIssues = parseInt(
                    $(settings.issuesDiv).css('marginTop').substring(0, $(settings.issuesDiv).css('marginTop').indexOf('px'))
                );
				//currentIssueIndex = currentPositionIssues / heightIssue;

                //currentPositionDates = parseInt(
                //    $(settings.datesDiv).css('marginTop').substring(0, $(settings.datesDiv).css('marginTop').indexOf('px'))
                //);
				//currentIssueDate = currentPositionDates + heightDate;

				if(currentPositionIssues >= 0) {

					$(settings.issuesDiv).stop();
					$(settings.datesDiv + ' li:first-child a').click();

				} else {

					if (!$(settings.issuesDiv).is(':animated')) {

						// bugixed from 0.9.54: now the dates gets centered when there's too much dates.
						$(settings.datesDiv + ' li').eq(currentIndex - 1).find('a').trigger('click');
					}
				}
			}

			// prev/next buttons now disappears on first/last issue | bugfix from 0.9.51: lower than 1 issue hide the arrows
			if(howManyDates == 1) {

				$(settings.prevButton + ',' + settings.nextButton).fadeOut('fast');

			} else if(howManyDates == 2) {

				if($(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass)) {

					$(settings.prevButton).fadeOut('fast');
				 	$(settings.nextButton).fadeIn('fast');

				} else if($(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass)) {

					$(settings.nextButton).fadeOut('fast');
					$(settings.prevButton).fadeIn('fast');
				}

			} else {

				if( $(settings.issuesDiv + ' li:first-child').hasClass(settings.issuesSelectedClass) ) {

					$(settings.prevButton).fadeOut('fast');

				} else if( $(settings.issuesDiv + ' li:last-child').hasClass(settings.issuesSelectedClass) ) {

					$(settings.nextButton).fadeOut('fast');

				} else {
					$(settings.nextButton + ',' + settings.prevButton).fadeIn('slow');
				}	
			}
		});

		$( window ).resize(function() {

			//console.log("resize");
			setWidths();
			//autoPlay();

		});

        if(Modernizr.touch){
            window.addEventListener( 'orientationchange', function() {
                setWidths();
            }, false);
        }

		// keyboard navigation, added since 0.9.1
		if(settings.arrowKeys == 'true') {

			if(settings.orientation == 'horizontal') {

				$(document).keydown(function(event){

					if (event.keyCode == 39) {

				       $(settings.nextButton).click();
				    }

					if (event.keyCode == 37) {

				       $(settings.prevButton).click();
				    }
				});

			} else if(settings.orientation == 'vertical') {

				$(document).keydown(function(event){

					if (event.keyCode == 40) {

				       $(settings.nextButton).click();
				    }

					if (event.keyCode == 38) {

				       $(settings.prevButton).click();
				    }
				});
			}
		}

		// default position startAt
		$(settings.datesDiv + ' li').eq(settings.startAt - 1).find('a').trigger('click');

		if(settings.autoPlay === true) {

			setInterval(autoPlay, settings.autoPlayPause);
		}
	});
};

// autoPlay
function autoPlay(){

	var currentDate = $(settings.datesDiv).find('li.' + settings.datesSelectedClass + ' a');

	if(settings.autoPlayDirection == 'forward') {

		if(currentDate.parent().is('li:last-child')) {

			$(settings.datesDiv + ' li:first-child').find('a').trigger('click');

		} else {

			currentDate.parent().next().find('a').trigger('click');

        }

	} else if(settings.autoPlayDirection == 'backward') {

		if(currentDate.parent().is('li:first-child')) {

			$(settings.datesDiv + ' li:last-child').find('a').trigger('click');

		} else {

			currentDate.parent().prev().find('a').trigger('click');

		}
	}
}