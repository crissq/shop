(function(){
	var transitionEndEventName = {
		transition: 'transitionend',
		MozTransition: 'transitionend',
		WebTransition: 'webkitTransitionEnd',
		OTransition: 'oTransitionEnd otransitionend',
	};
	var transitionEnd = '',
		isSupport = false;
	for(var name in transitionEndEventName){
		if(document.body.style[name]!==undefined){
			transitionEnd = transitionEndEventName[name];
			isSupport = true;
			break;
		}
	}
	
	window.qt = window.qt || {};
	window.qt.transition = {
		end:transitionEnd,
		isSupport:isSupport
	};
})();
