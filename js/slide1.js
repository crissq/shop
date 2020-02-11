(function($){
	'use strict'
	console.log(1);
	function Slider($elem,options){
		console.log(2);
		this.$elem = $elem;
		this.options = options;
		
		this.$items= this.$elem.find('.slider-item');
		this.$controls = this.$elem.find('.slider-control');
		this.$indicators = this.$elem.find('.slider-indicator');
		this.curIndex = this._getCorrectIndex(this.options.activeIndex);
		this.itemNum = this.$items.length;
		this._init();
		
	};
	Slider.prototype._init = function(){
		// init show
		var self = this;
		alert(1);
		this.$indicators.removeClass('slider-indicator-active');
		this.$indicators.eq(this.curIndex).addClass('slider-indicator-active');
	};
	Slider.prototype.to = function(index){
		if(this.options.animation === 'slide'){
			this.$elem.addClass('slider-slide');
			this.to = this._slide;
		}else{
			this.$elem.addClass('slider-fade');
			this.$items.eq(this.curIndex).show();
			this.to = this._fade;
		}
		// showHide
		this.$item.showHide(this.options);
		// bind event
		this.$elem
			.hover(function(){
				self.$controls.show();
			},function(){
				self.$controls.hide();
			});
			.on('click','.slider-control-left',function(){
				self.to(self._getCorrectIndex(self.curIndex - 1));
			});
			.on('click','.slider-control-right',function(){
				self.to(self._getCorrectIndex(self.curIndex + 1));
			})
			.on('click','.slider-indicator',function(){
				self.to(self._getCorrectIndex(self.$indicators.index(this)));
			});
		// auto
		if(this.options.interval && !isNaN(Number(this.options.interval))){
			this.$elem.hover($.proxy(this.pause,this),$.proxy(this.auto,this));
			this.auto();
		}
		
		// send message
		this.$items.on('slider-show slider-shown slider-hide slider-hidden',function(e){
			self.$elem.trigger('slider-'+e.type,[self.$items.index(this),this]);
		});
	};
	Slider.prototype._getCorrectIndex = function(index){
		if(isNaN(Number(index))) return 0;
		if(index < 0) return this.item.itemNum - 1;
		if(index > this.itemNum - 1) return 0;
		return index;
	};
	Slider.prototype._fade = function(index){
		if(this.curIndex === index) return;
		this.$item.eq(this.curIndex).showHide("hide");
		this.$item.eq(Index).showHide("show");
		this.$indicators.eq(this.curIndex).removeClass('slider-indicator-active');
		this.$indicators.eq(Index).addClass('slider-indicator-active');
		this.curIndex = index;
	};
	Slider.prototype._slide = function(){
		
	};
	Slider.prototype.auto = function(){
		var self = this;
		this.intervalId = setInterval(function(){
			self.to(self._getCorrectIndex(self.curIndex + 1));
		},this.options.interval);
	};
	Slider.prototype.pause = function(){
		clearInterval(this.intervalId);
	};
	Slider.DEFAULTS = {
		css3:false,
		js:false,
		animation:'fade',
		activeIndex:0,
		interval: 4000
	}
	$.fn.extend({
		slider:function(option){
			return this.each(function() {
			    var $this=$(this),
					slider=$this.data('dropdown'),
			    options = $.extend({}, Slider.DEFAULTS, $(this).data(), typeof option==='object'&&option);
			    if(!slider){
			        $this.data('slider',slider=new Slider($this,options));
			    }  
			    if(typeof slider[option]==='function'){
			        slider[option]();
			    }
			});
		}
	})
})(jQuery);