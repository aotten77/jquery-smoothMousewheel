/*!
 * jQuery SmoothMousewheel Plugin v1.0
 *
 * Copyright (c) 2014 Andreas Otten (aotten77)
 * Released under the MIT license
 */
(function ($) {
	$.smoothMousewheel = function(options){
		if(window.smoothMousewheel || navigator.platform.toLowerCase().indexOf('win') === -1 || navigator.userAgent.toLowerCase().indexOf('firefox') === 0 ) return;
		window.smoothMousewheel = true;
		var opt = $.extend({
			friction: 0.2,
			deltaSteps: 100
		}, options);

		var raf,
			scrollwheel = false,
			$window = $(window),
			$document = $(document),
			viewHeight = $window.height(),
			$body = (navigator.userAgent.indexOf('AppleWebKit') !== -1) ? $('body') : $('html'),
			viewY = $body.scrollTop(),
			scrollToX = $body.scrollLeft(),
			scrollToY = $body.scrollTop();

		var _onAnimationFrame = function(){
			viewY += (scrollToY - viewY) * opt.friction;
			window.scrollTo(scrollToX, Math.round(viewY));
			if(window.pageYOffset !== scrollToY){
				raf = requestAnimationFrame(_onAnimationFrame);
			}else{
				scrollwheel = false;
			}
		};

		$window.on('resize', function () {
			viewHeight = $window.height();
		}).on('scroll', function () {
			scrollToX = $body.scrollLeft();
			if (!scrollwheel) scrollToY = viewY = $body.scrollTop();
		});

		$body.mousewheel(function(event){
			var deltaFactor = event.deltaFactor * opt.deltaSteps/Math.abs(event.deltaFactor);
			scrollwheel = true;
			if(event.deltaY < 0){
				scrollToY = ((scrollToY + viewHeight) < $document.height()) ? scrollToY + deltaFactor : $body.scrollTop();
			}else{
				scrollToY = 0 < scrollToY ? scrollToY - deltaFactor : 0;
			}
			raf = requestAnimationFrame(_onAnimationFrame);
			return false;
		});
	};
})(jQuery);
