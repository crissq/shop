(function($){
	'use strict';
	function Tab($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$items = this.$elem.find('.tab-item');
		this.$panel = this.$elem.find('.tab-panel');
		this.itemNum = this.$items.length;
		this.curIndex = this._getCorrectIndex(this.options.activeIndex);
		this._init();
	}
	Tab.DEFAULTS = {
		event:'mouseenter',
		css3: false,
		js: false,
		animation: 'fade', // fade  slide
		activeIndex: 0,
		interval: 0,
		delay:0
	};
	Tab.prototype._init = function(){
		var self = this,
			timer = null;
		this.$items.removeClass('tab-item-active');
		this.$items.eq(this.curIndex).addClass('tab-item-active');
		this.$panel.eq(this.curIndex).show();
		this.$elem.trigger('tab-show',[this.curIndex,this.$panel[this]]);
		//trigger event
		this.$panel.on('show shown hide hidden',function(e){
			self.$elem.trigger('tab-'+e.type,[self.$panel.index(this),this]);
		});
		//showHide
		this.$panel.showHide(this.options);
		//bind event
		this.options.event = this.options.event === 'click'?'click':'mouseenter';
		this.$elem.on(this.options.event,'.tab-item',function(){
			if(self.options.delay){
				clearInterval(timer);
				timer = setTimeout(function(){
					self.toggle(self.$items.index(this));
				},self.options.delay);
			}else{
				self.toggle(self.$items.index(elem));
			}
			self.toggle(self.$items.index(this));
		});
		
		//auto
		if(this.options.interval&&!isNaN(Number(this.options.interval))){
			this.$elem.hover($.proxy(this.pause,this),$.proxy(this.auto,this));
			this.auto();
		}
	};
	Tab.prototype._getCorrectIndex = function(index) {
	    if (isNaN(Number(index))) return 0;
	    if (index < 0) return this.itemNum - 1;
	    if (index > this.itemNum - 1) return 0;
	    return index;
	};
	Tab.prototype.toggle = function(index) {
		if(this.curIndex===index) return;
		this.$panel.eq(this.curIndex).showHide('hide');
		this.$panel.eq(index).showHide('show');
		this.$items.eq(this.curIndex).removeClass('tab-item-active');
		this.$items.eq(index).addClass('tab-item-active');
		this.curIndex = index;
	};
	Tab.prototype.auto = function() {
	    var self = this;
	
	    this.intervalId = setInterval(function () {
	        self.toggle(self._getCorrectIndex(self.curIndex + 1));
	    }, this.options.interval);
	};
	Tab.prototype.pause = function() {
	    clearInterval(this.intervalId);
	};
	
	$.fn.extend({
	    tab: function (option) {
	        return this.each(function () {
	            var $this = $(this),
	                tab = $this.data('tab'),
	                options = $.extend({}, Tab.DEFAULTS, $this.data(), typeof option === 'object' && option);
	
	            if (!tab) { // first time
	                $this.data('tab', tab = new Tab($this, options));
	            }
	
	            if (typeof tab[option] === 'function') {
	                tab[option]();
	            }
	        });
	    }
	});
})(jQuery);