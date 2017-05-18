$(document).ready(function(){

	$('#slider').on('init', function(e, slick) {
        var $firstAnimatingElements = $('div.content-wrapper:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);    
    });

    $('#slider').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.slick-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);    
    });

    $('#slider').slick({
    	arrows: false,
    	dots: false,
    	autoplay: true,
    	autoplaySpeed: 7000,
    	pauseOnHover: false,
    	fade: true
    });

    $('.ricon').click(function(){
        if($(this).hasClass('rclose')){
            $(this).removeClass('rclose').addClass('rmenu');
            $('#menu-toggle').removeClass('fadeInRight').addClass('fadeOutRight');
        }else{
            $(this).removeClass('rmenu').addClass('rclose');
            $('#menu-toggle').removeClass('hidden').addClass('fadeInRight').removeClass('fadeOutRight');
        }
    });

    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
    }
});

