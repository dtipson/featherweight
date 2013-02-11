featherweight
=============

Responsibly responsive, ratio-scaled video embeds with extremely low-weight, mobile-first-friendly markup.

##The Problem: 

Iframe video embeds, when loaded by default, can add a lot of initial weight to a page (both a large number of extra http requests and some seriously huge files for each player type and its various sprites), especially on any page with multiple embeds.  On a mobile device, this can very noticeably slow down initial page loads.

##This Solution's Goals: 
1. Create mobile-first approach to video embeds, radically reducing the number of http requests and overall file size for embedded videos when loaded at mobile widths.
2. Give mobile video embeds intelligible, consistent, & recognizable styling as playable video content, making them look and work as much like a real iframe player as possible.
3. Provide useful video content descriptions for screen-readers.
4. Keep desktop styling and functionality consistent with what users expect, with a fluid but properly scaled layout that's already baked into the css on page load, even though the video embed content itself is being loaded asynchronously.
5. Make sure the solution isn't itself anywhere near as heavy as even a single video iframe embed. :)

##The Approach:

Standardized HTML markup, a small js library, and a few sassy css mixins that are all built work together.

##The Requirements:
	
###Javascript
[jQuery 1.7 or later](http://jquery.com/)

[enquire.js](http://wicky.nillia.ms/enquire.js/)

[matchMedia polyfill](https://github.com/paulirish/matchMedia.js/)

Optional: Modernizr/yepnope could be used to conditionally preload a polyfill for matchMedia in browsers that don't support it (primarily IE9: IE8 and IE7 will fallback to desktop regardless) but the polyfill is so tiny that it's included by default.

###CSS
[normalize.css/normalize.scss](http://necolas.github.com/normalize.css/)

[SASS](http://sass-lang.com/)

I suppose you could do this in LESS pretty easily too. Should be pretty easy to read the SASS code and port it over if you feel like it.

Also, theoretically, this whole approach should work even on IE5/6, as the general approach it's is all based on did: http://alistapart.com/article/creating-intrinsic-ratios-for-video 

However, this approach may or may not work well with any method that attempts to get IE7/IE8 to respond to media queries. I don't know. But, seriously, why are you trying to do that anyway?  Why work so hard to make incredibly slow browsers capable of doing things that nearly nobody using them ever tries to do, anyhow? Give em a desktop view, or enough CSS to get a working mobile view, and be done with it.

##The Setup

1. Include some form of normalize.css in your SASS project, because reasons.
2. Import the core mixin to your SASS project.
3. Define the css class you want to use and apply the proper mix of mixins
4. Include the js, modifying it if you've chosen a different core classname other than "intrinsic." In the meantime, I'll try to come up with better core classnames.

##The Markup

Using SASS, you'd define the base class that controls the behavior, in this case "intrinsic."  All the rest of the markup is pretty either central to the css/javascript behavior for this approach, so you'd probably better stick to it.

###Youtube markup:
		<figure class="fw-intrinsic">
			<a href="//www.youtube.com/watch?v=rjx1-otbBLg&fs=1&rel=0">
				<figcaption>Lord of the Rings 2</figcaption>
			</a>
		</figure>

###Vimeo markup:
		<figure class="fw-intrinsic">
			<a href="//player.vimeo.com/video/40301492?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff">
				<figcaption>April</figcaption>
			</a>
		</figure>	

If you wanted to control the exact thumbnail image, but still want it to be loaded conditionally (i.e., not by default at desktop widths), then add the data class data-video-img-fallback="/full/path/to/thumbnail/image" to the <a> tag.

If, however, you want video thumbnails to load by default, you'd add style="background-image:url(/full/path/to/thumbnail/image)" and the css class "videoBgImgOn" to the <a> tag and be done with it. Those thumbnails will load on desktop where they aren't really needed, sure, but they'd also load as soon as possible on mobile if you care about such things.

#What's still Missing: I.E. TODOS PRE PRIMTEIME

1. Making it easier to decide on the overall project breakpoint (currently defaulting to 480px, but you'd have to change it in at least two places to change it). Ideally, the media queries would be using something other than width, but it's the best solution for now.
1. Making this more of an extensible jquery plugin than a list of random custom functions all glommed together in an IIFE that happens to reply on jQuery
2. When loaded on a Windows desktop at tiny width, youtube complains that the video width is too small. WHAT? People still use windows machines with all their insane limitations and errors?  Oh, they do. Oh, crap.
3. Are aspect ratios not QUITE right? Really? We'll have to tweak that. Looks like it's a subpixel off in some cases though, which can't easily be corrected.  We may have to set the extra padding values for various player bar heights in the plugin instead of leaving them to users to determine. Mehsauce.
4. #hash-based target:css is nice in theory: in practice, it puts the video at the _very_ top of the page, which many mobile browsers have decided is a place where they wish to cover up actual content with random nonsense when they feel like it. And the usual, already quite hacky, workarounds won't work here (as they require messing with then re-correcting margins and other things that are bad general approaches). So, it's probably better to abandon this approach and use window.scrolling instead, which is more fine-tunable. Thanks, horribly awful UX collaboration between mobile browser designers and HTML5/W3C folks!
5. Standardizing classes, figuring out a good final name for the plugin
6. adding optional methods to rescan and add thumbnails and/or videos that are dynamically added to the page.
7. Vimeo videos aren't autoplaying on mobile devices, or on windows, despite the supposed support for an autoplay spec. It works on mobile widths on Mac desktop, but Android phones and Windows machines are requiring an extra, second click on the loaded play button to start the video. NICE.
8. Reducing the filesize further
9. Currently, the mobile version behavior when watching a video is to remove all the other iframe videos on the page, reverting them to the thumbnail view.  This is because this is the only reliable way to stop them from playing.  By and large for most use cases, this is acceptable behavior.  If the embeds used the javascript api, a more elegant solution would be possible (pausing already loaded videos so that they can be played from where they left off if the user so desires), but that's a much bigger project to tackle, and is even a little trickier on the vimeo side.