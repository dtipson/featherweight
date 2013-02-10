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
	-jQuery 1.7 or later: http://jquery.com/
	-enquire.js: http://wicky.nillia.ms/enquire.js/
	-matchMedia polyfill

Optional: Modernizr/yepnope could be used to conditionally preload a polyfill for matchMedia in browsers that don't support it (primarily IE9: IE8 and IE7 will fallback to desktop regardless) but the polyfill is so tiny that it's included by default.

###CSS
	-normalize.css/normalize.scss
	-SASS

Theoretically, this approach should work even on IE5/6, as the general approach it's is all based on did: http://alistapart.com/article/creating-intrinsic-ratios-for-video 

This approach may not work well with any method that attempts to get IE7/IE8 to respond to media queries.

##The Setup

1. Include normalize.css in your SASS project.
2. Import the mixin to your SASS project.
3. Define the css class you want to use and apply the proper mix of mixins
4. Include the js.

##The Markup

Using SASS, you'd define the base class that controls the behavior, in this case "intrinsic."  All the rest of the markup is either central to the css/javascript behavior for this approach.

###Youtube markup:
		<figure class="intrinsic">
			<a href="//www.youtube.com/watch?v=rjx1-otbBLg&fs=1&rel=0">
				<figcaption>Lord of the Rings 2</figcaption>
			</a>
		</figure>

###Vimeo markup:
		<figure class="intrinsic">
			<a href="//player.vimeo.com/video/40301492?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff">
				<figcaption>April</figcaption>
			</a>
		</figure>	

If you wanted the video thumbnails to load by default, you'd add style="background-image:url(/full/path/to/thumbnail/image)" and the css class "videoBgImgOn" to the <a> tag.

If you wanted to control the thumbnail image, but still want it to be loaded conditionally (i.e., not by default at desktop widths), then add the data class data-video-img-fallback="/full/path/to/thumbnail/image" to the <a> tag.

##What's still Missing

1. Making this more of an extensible plugin than a list of custom methods
2. adding methods to rescan and add thumbnails and/or videos that are dynamically added to the page.
3. Reducing the size further