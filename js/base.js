var context, context2, context3, context4;
var hasWebAudio = false;

function quickHideAddressBar() {
	setTimeout(function() {
		if(window.pageYOffset !== 0) return;
		window.scrollTo(0, window.pageYOffset + 1);
	}, 1000);
}

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
			
	// Create the Web Audio context
  try {
	hasWebAudio = true;
      var context = new webkitAudioContext()
	    , source  = context.createBufferSource()
	    , request = new XMLHttpRequest();

	  var context2 = new webkitAudioContext()
	    , source2  = context2.createBufferSource()
	    , request2 = new XMLHttpRequest();

	  var context3 = new webkitAudioContext()
	    , source3  = context3.createBufferSource()
	    , request3 = new XMLHttpRequest();

	  // Jump
	  var context4 = new webkitAudioContext()
	    , source4  = context4.createBufferSource()
	    , request4 = new XMLHttpRequest();



	  // Make an EventListener to handle the sound-file after it has been loaded
	  request.addEventListener( 'load', function( e ){
	    context.decodeAudioData( request.response, function( decoded_data ){
	      source.buffer = decoded_data;
	      source.connect( context.destination );

	    // Handle any decoding errors
	    }, function( e ){ console.log( e ); }

	    // End of decode handler
	    );

	  // End of Event Listener
	  }, false );

	  request2.addEventListener( 'load', function( e ){
	    context2.decodeAudioData( request2.response, function( decoded_data ){
	      source2.buffer = decoded_data;
	      source2.connect( context2.destination );

	    // Handle any decoding errors
	    }, function( e ){ console.log( e ); }

	    // End of decode handler
	    );

	  // End of Event Listener
	  }, false );

	  request3.addEventListener( 'load', function( e ){
	    context3.decodeAudioData( request3.response, function( decoded_data ){
	      source3.buffer = decoded_data;
	      source3.connect( context3.destination );

	    // Handle any decoding errors
	    }, function( e ){ console.log( e ); }

	    // End of decode handler
	    );

	  // End of Event Listener
	  }, false );

	  request4.addEventListener( 'load', function( e ){
	    context4.decodeAudioData( request4.response, function( decoded_data ){
	      source4.buffer = decoded_data;
	      source4.connect( context4.destination );

	    // Handle any decoding errors
	    }, function( e ){ console.log( e ); }

	    // End of decode handler
	    );

	  // End of Event Listener
	  }, false );



	  // Point the request to the sound-file that you want to play
	  //request.open( 'GET', '/audio/click.mp3', true );
	  request.open( 'GET', '/audio/pipe.mp3', true );
	  request.responseType = "arraybuffer";
	  request.send();

	  request2.open( 'GET', '/audio/powerup.mp3', true );
	  request2.responseType = "arraybuffer";
	  request2.send();

	  request3.open( 'GET', '/audio/secret.mp3', true );
	  request3.responseType = "arraybuffer";
	  request3.send();


	  request4.open( 'GET', '/audio/jump.mp3', true );
	  request4.responseType = "arraybuffer";
	  request4.send();



	  // The function that plays the sound
	  function playSound(){

	    // Create a new BufferSource
	    var newSource = context.createBufferSource();
	    newSource.buffer = source.buffer;
	    newSource.connect( context.destination );
	    newSource.noteOn( 0 );

	  };

	  function playSound2(){

	    // Create a new BufferSource
	    var newSource2 = context2.createBufferSource();
	    newSource2.buffer = source2.buffer;
	    newSource2.connect( context2.destination );
	    newSource2.noteOn( 0 );

	  };


	  function playSound3(){

	    // Create a new BufferSource
	    var newSource3 = context3.createBufferSource();
	    newSource3.buffer = source3.buffer;
	    newSource3.connect( context3.destination );
	    newSource3.noteOn( 0 );

	  };

	  function playSound4(){

	    // Create a new BufferSource
	    var newSource4 = context4.createBufferSource();
	    newSource4.buffer = source4.buffer;
	    newSource4.connect( context4.destination );
	    newSource4.noteOn( 0 );

	  };
  


  }
  catch(e) {
    //alert('Web Audio API is not supported in this browser');
  }
	

  
	
	// Jquery Transit
	// Fallback to regular jquery animations if css3 aren't avail
	if (!$.support.transition)
	    $.fn.transition = $.fn.animate;
	
	// Transit uses the same default as $.fn.animate.
	$.fx.speeds._default = 50;
	
	// Default easing is stored in $.cssEase.
	$.cssEase['bounce'] = 'cubic-bezier(0,1,0.8,1.1)';
	$.cssEase._default = 'out'; //bounce
	
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
		/*
		Node.transition({
		    height: newSize
		});
		Header.transition({
		    height: newSizeHeader
		});
		*/
		
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


	
	
	// Click Events
	$("#logo").touchClick(function(e) {
		$("html, body").animate({ scrollTop: 0 }, "slow", function(){
			if(hasWebAudio){playSound2();}
		});
		return false;
	});
	/*
	$('h1').touchClick(function(e){
		$(this).css({ perspective: '100px', rotateX: '0deg', transformOrigin: '50% 100%' }).
	    	transition({ rotateX: '3deg'}, function() {
		    $(this).transition({ rotateX: '0deg'});
		});
		$(this).siblings('h2').slideToggle(100, 'swing');
		$(this).siblings('p').slideToggle(100,'swing');
		if(hasWebAudio){playSound();}
		return false;
    });
*/
		
	$('h3:not(#contact h3)').touchClick(function(e){
		$(this).css({ perspective: '100px', rotateX: '0deg', transformOrigin: '50% 100%' }).
	    	transition({ rotateX: '3deg'}, function() {
		    $(this).transition({ rotateX: '0deg'});
		});
		$(this).siblings('h4').slideToggle(100, 'swing');
		$(this).siblings('p').slideToggle(100,'swing');
		if($(this).siblings('h4').is(":visible")){
			if(hasWebAudio){playSound();}
		} else {
			if(hasWebAudio){playSound4();}
		}
		
		return false;
    });


	// up up down down left right left right
	konami = new Konami()
	konami.code = function() {
		$('#secret').slideToggle(100,'swing');
		$('html,body').animate({ scrollTop: $('#secret').offset().top }, { duration: 3000, easing: 'linear'});
		if(hasWebAudio){playSound3();}
	}
	konami.load();
	
	// Hide ios bar
	quickHideAddressBar();

});