/* global screenReaderText */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */

( function( $ ) {
	var $body, $window, $sidebar, adminbarOffset, top = false,
	    bottom = false, windowWidth, windowHeight, lastWindowPos = 0,
	    topOffset = 0, bodyHeight, sidebarHeight, resizeTimer,
	    secondary, button;

	function initMainNavigation( container ) {
		// Add dropdown toggle that display child menu items.
		container.find( '.menu-item-has-children > a' ).after( '<button class="dropdown-toggle" aria-expanded="false">' + screenReaderText.expand + '</button>' );

		// Toggle buttons and submenu items with active children menu items.
		container.find( '.current-menu-ancestor > button' ).addClass( 'toggle-on' );
		container.find( '.current-menu-ancestor > .sub-menu' ).addClass( 'toggled-on' );

		container.find( '.dropdown-toggle' ).click( function( e ) {
			var _this = $( this );
			e.preventDefault();
			_this.toggleClass( 'toggle-on' );
			_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );
			_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
			_this.html( _this.html() === screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand );
		} );
	}
	initMainNavigation( $( '.main-navigation' ) );

	// Re-initialize the main navigation when it is updated, persisting any existing submenu expanded states.
	$( document ).on( 'customize-preview-menu-refreshed', function( e, params ) {
		if ( 'primary' === params.wpNavMenuArgs.theme_location ) {
			initMainNavigation( params.newContainer );

			// Re-sync expanded states from oldContainer.
			params.oldContainer.find( '.dropdown-toggle.toggle-on' ).each(function() {
				var containerId = $( this ).parent().prop( 'id' );
				$( params.newContainer ).find( '#' + containerId + ' > .dropdown-toggle' ).triggerHandler( 'click' );
			});
		}
	});

	secondary = $( '#secondary' );
	button = $( '.site-branding' ).find( '.secondary-toggle' );

	// Enable menu toggle for small screens.
	( function() {
		var menu, widgets, social;
		if ( ! secondary.length || ! button.length ) {
			return;
		}

		// Hide button if there are no widgets and the menus are missing or empty.
		menu    = secondary.find( '.nav-menu' );
		widgets = secondary.find( '#widget-area' );
		social  = secondary.find( '#social-navigation' );
		if ( ! widgets.length && ! social.length && ( ! menu.length || ! menu.children().length ) ) {
			button.hide();
			return;
		}

		button.on( 'click.twentyfifteen', function() {
			secondary.toggleClass( 'toggled-on' );
			secondary.trigger( 'resize' );
			$( this ).toggleClass( 'toggled-on' );
			if ( $( this, secondary ).hasClass( 'toggled-on' ) ) {
				$( this ).attr( 'aria-expanded', 'true' );
				secondary.attr( 'aria-expanded', 'true' );
			} else {
				$( this ).attr( 'aria-expanded', 'false' );
				secondary.attr( 'aria-expanded', 'false' );
			}
		} );
	} )();

	/**
	 * @summary Add or remove ARIA attributes.
	 * Uses jQuery's width() function to determine the size of the window and add
	 * the default ARIA attributes for the menu toggle if it's visible.
	 * @since Twenty Fifteen 1.1
	 */
	function onResizeARIA() {
		if ( 955 > $window.width() ) {
			button.attr( 'aria-expanded', 'false' );
			secondary.attr( 'aria-expanded', 'false' );
			button.attr( 'aria-controls', 'secondary' );
		} else {
			button.removeAttr( 'aria-expanded' );
			secondary.removeAttr( 'aria-expanded' );
			button.removeAttr( 'aria-controls' );
		}
	}

	// Sidebar scrolling.
	function resize() {
		windowWidth = $window.width();

		if ( 955 > windowWidth ) {
			top = bottom = false;
			$sidebar.removeAttr( 'style' );
		}
	}

	function scroll() {
		var windowPos = $window.scrollTop();

		if ( 955 > windowWidth ) {
			return;
		}

		sidebarHeight = $sidebar.height();
		windowHeight  = $window.height();
		bodyHeight    = $body.height();

		if ( sidebarHeight + adminbarOffset > windowHeight ) {
			if ( windowPos > lastWindowPos ) {
				if ( top ) {
					top = false;
					topOffset = ( $sidebar.offset().top > 0 ) ? $sidebar.offset().top - adminbarOffset : 0;
					$sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
				} else if ( ! bottom && windowPos + windowHeight > sidebarHeight + $sidebar.offset().top && sidebarHeight + adminbarOffset < bodyHeight ) {
					bottom = true;
					$sidebar.attr( 'style', 'position: fixed; bottom: 0;' );
				}
			} else if ( windowPos < lastWindowPos ) {
				if ( bottom ) {
					bottom = false;
					topOffset = ( $sidebar.offset().top > 0 ) ? $sidebar.offset().top - adminbarOffset : 0;
					$sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
				} else if ( ! top && windowPos + adminbarOffset < $sidebar.offset().top ) {
					top = true;
					$sidebar.attr( 'style', 'position: fixed;' );
				}
			} else {
				top = bottom = false;
				topOffset = ( $sidebar.offset().top > 0 ) ? $sidebar.offset().top - adminbarOffset : 0;
				$sidebar.attr( 'style', 'top: ' + topOffset + 'px;' );
			}
		} else if ( ! top ) {
			top = true;
			$sidebar.attr( 'style', 'position: fixed;' );
		}

		lastWindowPos = windowPos;
	}

	function resizeAndScroll() {
		resize();
		scroll();
	}

	$( document ).ready( function() {
		$body          = $( document.body );
		$window        = $( window );
		$sidebar       = $( '#sidebar' ).first();
		adminbarOffset = $body.is( '.admin-bar' ) ? $( '#wpadminbar' ).height() : 0;

		$window
			.on( 'scroll.twentyfifteen', scroll )
			.on( 'load.twentyfifteen', onResizeARIA )
			.on( 'resize.twentyfifteen', function() {
				clearTimeout( resizeTimer );
				resizeTimer = setTimeout( resizeAndScroll, 500 );
				onResizeARIA();
			} );
		$sidebar.on( 'click.twentyfifteen keydown.twentyfifteen', 'button', resizeAndScroll );

		resizeAndScroll();

		for ( var i = 1; i < 6; i++ ) {
			setTimeout( resizeAndScroll, 100 * i );
		}
	} );

    //custom scripts
    //перенос категории под заголовок(имя)
    if ($('.testimonial-inner').length > 0) {
        $('.testimonial-inner').each(function(){
            $cat = $(this).find('.testimonial-cat');
            $(this).children('.testimonial-heading').after( $cat  );
        });
    }
	//обрамляем капчу в див для цсс
	if ($("img.captcha").length > 0) {
		$( "img.captcha" ).wrap( "<div class='captcha-img-wrap'></div>" );
	}
    //equal height
    //$('.equal').equalHeights();

    //styling captcha on contact form
    $(".wpcf7-captchac").wrap( "<div class='captcha-img-wrap'></div>" );

} )( jQuery );


// flexnav
(function($) {
    /* Mobile nav */
    $(".flexnav").flexNav();
})( jQuery );


// Owl carousel
if (window.matchMedia("only screen and (min-width: 768px)").matches) {
    (function($) {

        $(document).ready(function(){
              $(".fullwidth").owlCarousel({
                items: 1,
                loop: true,
                nav: true,
                center: true
              });


          $('.galereya').owlCarousel({
            center: true,
            items:1.5,
            loop:true,
            nav: true,
            margin:15,
            autoplay:true,
            autoplayTimeout:2000,
            autoplayHoverPause:true
          });

         $(".single div.gallery.gallery-size-thumbnail").addClass('owl-carousel');
         $(".single div.gallery.owl-carousel").owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            center: true
          });

        });
    })( jQuery );
}

(function($) {

    //map switcher (табы)
    //первый пареаметр - селектор ссылки переключателя
    //второй - селектор карты (блока который нужно скрывать или показать)
    function mapSwch(controls, map){
        var maps = $(map);
        var controls = $(controls);
        maps.hide();

        $(controls).click(function(e){
            e.preventDefault();

            controls.removeClass('active');
            $(this).addClass('active');

            maps.hide();
            var href = $(this).attr('href');
            href = $(href);
            href.fadeIn(400);
        });

        $(controls[0]).trigger( "click" );
    }
    mapSwch('.mapper .map-swch a', '.map');
    mapSwch('.mapper2 .map-swch a', '.map2');
	mapSwch('.mainpage-tabs a', '.mainpage-tab');

	// Inline popups
	$('.popup').magnificPopup({
	  //delegate: 'a',
	  removalDelay: 500, //delay removal by X to allow out-animation
	  callbacks: {
	    beforeOpen: function() {
	       this.st.mainClass = 'mfp-zoom-in';//класс анимации
	    }
	  },
	  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});

    //slider timer добавляет таймер на анимацию слайдера(полоску снизу)
    $('#metaslider_container_702').append("<div class='sl-timer'></div>");

    function sldTimer(){
        $('.sl-timer').css("width", '0');
        $('.sl-timer').animate({
    	    width: '100%',
 	      }, 5000, function() {
    	    // Animation complete.
            $('#metaslider_container_702 .next').trigger('click');
            sldTimer();
    	  });
    }
    sldTimer();

    //smooth scroll
    $(function() {
      $('.page-nav a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top - 75
            }, 1000);
            return false;
          }
        }
      });
    });

    //best-neadvig popup
    $('#best-nedvig-sbm').click(function(){
        var form = $(this).parent().parent();
        var sq = form.find('#square-val').val();
        var pr = form.find('#price-val').val();
        var job = form.find('#job-val').val();

		sq = sq.replace(/&/g, '&amp;')
		   .replace(/"/g, '&quot;')
		   .replace(/'/g, '&#39;')
		   .replace(/</g, '&lt;')
		   .replace(/>/g, '&gt;');
		pr =  pr.replace(/&/g, '&amp;')
 		   .replace(/"/g, '&quot;')
 		   .replace(/'/g, '&#39;')
 		   .replace(/</g, '&lt;')
 		   .replace(/>/g, '&gt;');
		job = job.replace(/&/g, '&amp;')
   		   .replace(/"/g, '&quot;')
   		   .replace(/'/g, '&#39;')
   		   .replace(/</g, '&lt;')
   		   .replace(/>/g, '&gt;');

        $('#square-popup').attr('value', sq);
        $('#price-popup').attr('value', pr);
        $('#job-popup').attr('value', job);
    });

    //fixed nav

jQuery(window).scroll(function() { 
    var the_top = jQuery(document).scrollTop();
    if (the_top > 295) {
        jQuery('#fixblock').addClass('fixed');
    }
    else {
        jQuery('#fixblock').removeClass('fixed');
    }
});
 
   
   
   
   
   
                              
        

})( jQuery );
