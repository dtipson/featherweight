/*
@codekit-prepend "polyfills/match-media-polyfill.js","enquire.js";
*/

(function($){
	var $wraps = $('.fw-intrinsic'),
		breakWidth = 480,
		//hash = window.location.hash.replace('#',''),
		c=0;

	function decodeParam(str){
		var obj = {};
		str.replace(/\&amp;/gi,"&").replace(/([^=&]+)=([^&]*)/g, function(m, key, value) {
			obj[decodeURIComponent(key)] = decodeURIComponent(value);
		});
		return obj;
	}
	
	function videoString(slug, nonyt, ops){
		return '<iframe src="'+(
				(nonyt)?
					('https://player.vimeo.com/video/'+slug+'?'+$.param(ops)):
					('https://www.youtube.com/embed/'+slug+'?'+$.param(ops))
		)+'" style="background:black;visibility:hidden;" onload="this.style.visibility=\'visible\';" frameborder="0" allowfullscreen allowtransparency="true"></iframe>';
	}
	
	function vidProcess($el){
		var href = $el.attr('href'),
			nonyt = href.indexOf('vimeo')>0,
			ops = (href.indexOf('?'))?
				decodeParam(href.split('?').slice(-1)[0]):  //turn a query string into an object
				{},
			slug = (nonyt)?href.split('?')[0].split('/').slice(-1)[0]:ops.v, //get the video slug in either format
			id = $el.attr('id')?$el.attr('id'):$el.attr('id',slug+(++c)).attr('id'); //get the core id, or make one up if none is available and ensure it's unique
		$el.attr('href','#'+id).data({
			slug:slug,
			href:href,
			ops:ops,
			nonyt:nonyt
		});
	}
	
	function vidThumb($el){
		var slug = $el.data('slug'),
			nonyt = $el.data('nonyt'),
			ytImg = $el.data('video-img-fallback')||'http://img.youtube.com/vi/'+slug+'/mqdefault.jpg';
			console.log(slug,nonyt,ytImg);
		if(nonyt){
			$.ajax({
				'url':'http://vimeo.com/api/v2/video/'+slug+'.json',
				 'dataType':'jsonp'
			}).then(function(r){
				$el.css({'background-image':'url('+r[0].thumbnail_medium+')'});
			});
		}
		else{
			$el.css({'background-image':'url('+ytImg+')'});
		}
	}
	
	function vidLoad($el,autono){
		var parent = $el.parent('figure'),
			slug = $el.data('slug'),
			nonyt = $el.data('nonyt'),
			ops = $el.data('ops');
			autono = (autono)?0:1;
			$el.prepend(videoString(slug, nonyt, $.extend(ops,{autoplay:autono})));
			if (!nonyt && !ops.autohide){
				parent.addClass('fw-ratio-unknown');
			}
			else if (!nonyt && (!!ops.autohide && ops.autohide!=="1")){
				parent.addClass('fw-ratio-chrome-30');
			}
			else {
				parent.addClass('fw-ratio-nochrome');
			}
			console.log(slug, ops);
	}
	
	$wraps.find('a').each(function(){
		vidProcess($(this).addClass('processed'));
	});
	
	function videoThumbs(){
		$wraps.find('a').not('.videoBgImgOn').each(function(){
			vidThumb($(this).addClass('videoBgImgOn'));
		});
	}
	
	enquire.register("screen and (min-width: "+(breakWidth+1)+"px)", {
		match: function(){
			$wraps.find('a').not('.loaded').each(function(){
				vidLoad($(this).addClass('loaded'), true);
			});
		}
	}, true);
	enquire.register("screen and (max-width: "+(breakWidth)+"px)", {
		match: function(){
			videoThumbs();
		}
	}, true);
	enquire.listen(500);
	
	$wraps.on('click','a',function(e){
		e.preventDefault();
		var $el = $(this),
			nonyt = $el.data('nonyt'),
			slug = $el.data('slug'),
			ops = $el.data('ops')||{};
			
		$wraps.find('a').removeClass('loaded').find('iframe').remove(); //needs to just stop them playing, not destroy them... hmmm
		$el.addClass('loaded').prepend(videoString(slug,nonyt,$.extend(ops,{autoplay:1})));
	});
}(jQuery));