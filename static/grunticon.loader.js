/*global loadCSS:true*/
/*global onloadCSS:true*/

(function(w){
	var grunticon = function( css, onload, before ){
		"use strict";
		// expects a css array with 3 items representing CSS paths to datasvg, datapng, urlpng
		if( !css || css.length !== 3 ){
			return;
		}

		var navigator = w.navigator;
		var document = w.document;
		var Image = w.Image;

		// Thanks Modernizr & Erik Dahlstrom
		var svg = !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect && !!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1") && !(w.opera && navigator.userAgent.indexOf('Chrome') === -1) && navigator.userAgent.indexOf('Series40') === -1;

		var img = new Image();

		img.onerror = function(){
			grunticon.method = "png";
			grunticon.href = css[2];
			loadCSS( css[2] );
		};

		img.onload = function(){
			var data = img.width === 1 && img.height === 1,
				href = css[ data && svg ? 0 : data ? 1 : 2 ];

			if( data && svg ){
				grunticon.method = "svg";
			} else if( data ){
				grunticon.method = "datapng";
			} else {
				grunticon.method = "png";
			}

			grunticon.href = href;
			onloadCSS( loadCSS( href, before ), onload );
		};

		img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		document.documentElement.className += " grunticon";
	};
	grunticon.loadCSS = loadCSS;
	grunticon.onloadCSS = onloadCSS;
	w.grunticon = grunticon;
}(window));
