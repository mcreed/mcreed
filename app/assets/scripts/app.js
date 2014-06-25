'use strict';


// Initialize Sounds
var snd = new Audio("/assets/audio/pipe.mp3");
snd.volume = 0.8;

var snd2 = new Audio("/assets/audio/powerup.mp3");
snd.volume = 0.8;

var snd3 = new Audio("/assets/audio/secret.mp3");
snd.volume = 0.8;

var snd4 = new Audio("/assets/audio/jump.mp3");
snd.volume = 0.8;

// Jquery
$(document).ready(function() {

    /*
	// Scrollto Background
	$('article').each(function(i) {
		var position = $(this).position();
		var article = $(this);
		console.log(position);
		console.log('min: ' + position.top + ' / max: ' + parseInt(position.top + $(this).height()));
		$(this).scrollspy({
			min: position.top,
			max: position.top + $(this).height(),
			onEnter: function(element, position) {
				// Load and Cycle the background
				//if(element.id == 'beeri'){
				article.append('<div class="focuslide" style="background-image:url(/img/project-bg-qreo.jpg);"></div>').
					    css({ opacity: 0, 'z-index':5 }).
					    transition({ opacity: 1 }, 2000);

				//}

				if(console) console.log('entering ' +  element.id);
				//	$("body").css('background-color', element.id);
			},
			onLeave: function(element, position) {
				if(console) console.log('leaving ' +  element.id);

				article.children('.focuslide').
				    css({ opacity: 1 }).
				    transition({ opacity: 0}, 1000), function() {
					    article.children('.focuslide').remove();
					};
				// Fade any loaded background items out
				//	$('body').css('background-color','#eee');
			}
		});
	});

	*/
	// Focused styles
	$('article').each(function(i) {
		var position = $(this).position();
		var article = $(this);
		$(this).scrollspy({
			min: position.top-200,
			max: position.top-200 + $(this).height(),
			onEnter: function(element, position) {
				if(console) console.log('entering ' +  element.id);
				article.addClass('current');
			},
			onLeave: function(element, position) {
				article.removeClass('current');
			}
		});
	});

	/*
	$('#banner').scrollspy({
		min: $('#banner').offset().top,
		onEnter: function(element, position) {
			$("#banner").addClass('fixed');
		},
		onLeave: function(element, position) {
			$("#nav").removeClass('fixed');
		}
	});
	*/




	// Jquery Transit
	// Fallback to regular jquery animations if css3 aren't avail
	/*
	if (!$.support.transition)
	    $.fn.transition = $.fn.animate;

	// Transit uses the same default as $.fn.animate.
	$.fx.speeds._default = 50;

	// Default easing is stored in $.cssEase.
	$.cssEase['bounce'] = 'cubic-bezier(0,1,0.8,1.1)';
	$.cssEase._default = 'out'; //bounce
	*/

	// Sticky Head
    var
    Node = $('#logo'),
	Nav = $('nav'),
	Header = $('header'),
    BaseWidth = Node.height(),
	BaseWidthHeader = Header.height();

    $(window).resize(function() {
        $('section').css({
            top: ($(window).height() - $('section').outerHeight()) / 2
        });
    });

    // To initially run the function:
    $(window).resize();

    var $scrollingDiv = Node;
    $(window).scroll(function() {
        var winScrollTop = $(window).scrollTop() + 0,
            //zeroSizeHeight = $(document).height() - $(window).height(),
			zeroSizeHeight = 160,
			nodeMinSize = 32,
			headerMinSize = 64,
			topHeight = 48,
            newTopSize = topHeight * ( 1 - (winScrollTop / zeroSizeHeight) * (2/3) ),
			newSize = BaseWidth * ( 1 - (winScrollTop / zeroSizeHeight) * (2/3) ),
			newSizeHeader = BaseWidthHeader * ( 1 - (winScrollTop / zeroSizeHeight) * (2/3) );

		if(newSize <= nodeMinSize){newSize=nodeMinSize;}
		if(newSizeHeader <= headerMinSize){newSizeHeader=headerMinSize;}
		if(newTopSize <= 16){newTopSize=16;}

        Nav.css({
            top: newTopSize
			// ,"marginTop": winScrollTop + "px"
        });
        Node.css({
            height: newSize
			// ,"marginTop": winScrollTop + "px"
        });
        Header.css({
            height: newSizeHeader
			// ,"marginTop": winScrollTop + "px"
        });

    });

    // Call again just to get it in
    var winScrollTop = $(window).scrollTop() + 0,
	zeroSizeHeight = 160,
	nodeMinSize = 32,
	headerMinSize = 64,
	topHeight = 48,
    newTopSize = topHeight * ( 1 - (winScrollTop / zeroSizeHeight) * (2/3) ),
	newSize = BaseWidth * ( 1 - (winScrollTop / zeroSizeHeight) * (2/3) ),
	newSizeHeader = BaseWidthHeader * ( 1 - (winScrollTop / zeroSizeHeight) * (2/3) );

	if(newSize <= nodeMinSize){newSize=nodeMinSize;}
	if(newSizeHeader <= headerMinSize){newSizeHeader=headerMinSize;}
	if(newTopSize <= 16){newTopSize=16;}

    Nav.css({
        top: newTopSize
    });
    Node.css({
        height: newSize
    });
    Header.css({
        height: newSizeHeader
    });



	// Click Events
	$("#logo").touchClick(function(e) {
		$("html, body").animate({ scrollTop: 0 }, "slow", function(){
			snd2.play();
		});
		return false;
	});


	$('h3:not(#contact h3)').touchClick(function(e){
		//$(this).css({ perspective: '100px', rotateX: '0deg', transformOrigin: '50% 100%' }).
	    //	transition({ rotateX: '3deg'}, function() {
		//    $(this).transition({ rotateX: '0deg'});
		//});
		$(this).siblings('h4').slideToggle(100, 'swing');
		$(this).siblings('p').slideToggle(100,'swing');
		if($(this).siblings('h4').is(":visible")){
			snd.play();
		} else {
			snd4.play();
		}

		return false;
    });


	// up up down down left right left right
	konami = new Konami();
	konami.code = function() {
		$('#secret').slideToggle(100,'swing');
		$('html,body').animate({ scrollTop: $('#secret').offset().top }, { duration: 3000, easing: 'linear'});
		snd3.play();
	}
	konami.load();


});