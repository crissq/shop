(function($){
	'use strict';
	function Search($elem,options){
		this.$elem = $elem;
		this.options = options;
		
		this.$form = this.$elem.find('.search-form');
		this.$input = this.$elem.find('.search-inputbox');
		this.$layer = this.$elem.find('.search-layer');
		
		this.$elem.on('click','.search-btn',$.proxy(this.submit,this));
	}
	Search.DEFAULTS = {
		autocomplete:false,
		url:"https://suggest.taobao.com/sug?code=utf-8&_ksTS=1580173454275_439&callback=jsonp440&k=1&area=c2c&bucketid=16&q=",
		css3:false,
		js:false,
		animation:'fade'
	};
	Search.prototype.submit = function(){
		if($.trim(this.$input.val())===''){
			return false;
		}
		this.$form.submit();
	};
	Search.prototype.autocomplete = function(){
		
	};
	Search.prototype.getData = function(){
		
	};
	Search.prototype.showLayer = function(){
		
	};
	Search.prototype.hideLayer = function(){
		
	};
	
	$.fn.extend({
	    search: function(option) {
	        return this.each(function() {
	            var $this=$(this),
	            search=$this.data('search'),
	            options = $.extend({}, Search.DEFAULTS, $(this).data(), typeof option==='object'&&option);
	            // search(this, options);  
	            if(!search){//解决多次调用search问题
	                $this.data('search',search=new Search($this,options));
	            }  
	            if(typeof search[option]==='function'){
	                search[option]();
	            }
	        });
	    }
	});
})(jQuery)

// (function($){
// 	'use strict';
// 	var $search = $('.search'),
// 		$form = $('.search-form'),
// 		$input = $search.find('.search-inputbox'),
// 		$btn = $search.find('.search-btn'),
// 		$layer = $search.find('.search-layer');
// 		//验证
// 		$form.on('submit',function(){
// 			if($.trim($input.val())===''){
// 				return false;
// 			}
// 		});
// 		//自动完成
// 		$input.on('input',function(){
// 			// console.log(1);
// 			var url = "https://suggest.taobao.com/sug?code=utf-8&_ksTS=1580173454275_439&callback=jsonp440&k=1&area=c2c&bucketid=16&q=" + encodeURIComponent($.trim($input.val()))
// 			$.ajax({
// 				url:url,
// 				// timeout:1,
// 				dataType:'jsonp'
// 			}).done(function(data){
// 				console.log(data);
// 				var html = '',
// 					dataNum = data['result'].length,
// 					maxNum = 10;
// 				if(dataNum === 0){
// 					$layer.hide().html('');
// 					return ;
// 				}
// 				for(var i = 0;i < dataNum;i++){
// 					if(i>=maxNum) break;
// 					html += '<li class="search-layer-item text-ellipsis">' + data['result'][i][0] + '</li>';
// 				}
// 				$layer.html(html).show();
// 			}).fail(function(){
// 				// console.log(1);
// 				$layer.hide().html('');
// 			}).always(function(){
// 				console.log(2);
// 			})
// 		});
// 		$layer.on('click','.search-layer-item',function(){
// 			$input.val(removeHtmlTags($(this).html()));
// 			$form.submit();
// 		});
// 		$input.on('focus',function(){
// 			$layer.show();
// 		}).on('click',function(){
// 			return false;
// 		});
// 		$(document).on('click',function(){
// 			$layer.hide();
// 		})
// 		function removeHtmlTags(str){
// 			return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g, '');
// 		}
// })(jQuery);