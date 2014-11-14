/*!
 * utils.smoothwheel
 *
 * Created by aotten77 on 14.11.2014.
 *
 * Released under the MIT license
 */
define(['jquery', '_super', 'rAF', 'jquery_mousewheel'], function ($, _super){
	'use strict';
	var smoothwheel = $.extend({}, _super, {
		init: function (options, elem) {
			this.options = $.extend({}, this.options, options);
			this.name = this.options.pluginName;
			this.pos = this.options.pos;
			this.jmname = this.options.jmname;
			this.$elem = $(elem);
			_super.config.call(this);

			this.onInitExec();
			return this;
		},

		onInitExec: function () {
			// https://github.com/simov/simplr-smoothscroll/blob/master/lib/jquery.simplr.smoothscroll.js
			var that = this;
			this.onAnimationFrame = this.onAnimationFrame.bind(this);
			this.viewHeight = $(window).height();
			this.$window = $(window);
			this.$body = (navigator.userAgent.indexOf('AppleWebKit') !== -1) ? $('body') : $('html');
			this.scrollToX = this.$body.scrollLeft();
			this.scrollToY = this.$body.scrollTop();
			this.viewY = 0;
			this.scrollwheel = false;
			this.docHeight = this.getDocHeight();
			this.$window.on('resize', function () {
				that.viewHeight = that.$window.height();
				that.docHeight = that.getDocHeight();
			}).on('scroll', function () {
				that.scrollToX = that.$body.scrollLeft();
				if (!that.scrollwheel)	that.scrollToY = that.viewY = that.$window.scrollTop();
				console.log(that.scrollToY);
			});
			this.$body.mousewheel(function(event){
				//var deltaFactor = event.deltaFactor;
				var deltaFactor = event.deltaFactor * 100/Math.abs(event.deltaFactor);
				//console.log(event.deltaFactor, deltaFactor);
				that.scrollwheel = true;
				if(event.deltaY < 0){
					that.scrollToY = (that.scrollToY + that.viewHeight) >= that.docHeight ? that.scrollToY : that.scrollToY += deltaFactor;
				}else{
					that.scrollToY = that.scrollToY <= 0 ? 0 : that.scrollToY -= deltaFactor;
				}
				that.raf = requestAnimationFrame(that.onAnimationFrame);
				return false;
			});


		},


		options: {

		},

		_exec: function(e){
			this.raf = requestAnimationFrame(this.onAnimationFrame);
		},

		//http://james.padolsey.com/javascript/get-document-height-cross-browser/
		getDocHeight: function(){
			var d = document;
			return Math.max(d.body.scrollHeight, d.documentElement.scrollHeight, d.body.offsetHeight, d.documentElement.offsetHeight, d.body.clientHeight, d.documentElement.clientHeight);
		},

		onAnimationFrame: function(){
			console.log(this.scrollToY);
			this.viewY += (this.scrollToY - this.viewY) * 0.2;
			window.scrollTo(this.scrollToX, Math.round(this.viewY));
			if(window.pageYOffset !== this.scrollToY){
				this.raf = requestAnimationFrame(this.onAnimationFrame);
			}else{
				this.scrollwheel = false;
			}
		}
	});

	$.plugin('utils.smoothwheel', smoothwheel);
	return smoothwheel;
});

