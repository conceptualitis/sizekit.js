var sk = (function () {
	"use strict";

	if(undefined === window.parent.sk) {
		var that = {};
		var html = document.getElementsByTagName("html")[0];
		var breakpoints = [];
		var settings = {
			units: "px",
			background: "#999"
		};
		var presets = {
			"iphone": {
				"width": 320,
				"height": 480
			},
			"iphone-retina": {
				"width": 640,
				"height": 960
			},
			"ipad": {
				"width": 768,
				"height": 1024
			},
			"ipad-retina": {
				"width": 1536,
				"height": 2048
			}
		};
		var iframe;

		var resize = function () {
			if ("100%" === iframe.style.width) {
				iframe.style.marginLeft = "-" + (window.innerWidth / 2) + "px";
			}
		};

		var update = function () {
			html.style.backgroundColor = settings.background;
		};

		var keyChecker = function (e) {
			if (40 === e.which && true === e.shiftKey) {
				// thinner by one pixel on down arrow
				that.w((!e.altKey) ? "-1" : "-10");
			} else if (38 === e.which && true === e.shiftKey) {
				// wider by one pixel on up arrow
				that.w((!e.altKey) ? "+1" : "+10");
			} else if (187 === e.which || 61 === e.which && true === e.altKey) {
				that.setBreakpoint();
			}
		};

		var init = function () {
			window.addEventListener("resize", resize);
			document.addEventListener("keydown", keyChecker);

			iframe = document.createElement("iframe");
			iframe.style.cssText = "position: absolute; top: 0; left: 50%; width: 100%; height: 100%; border: 0; box-shadow: 0 0 35px rgba(0, 0, 0, .3); margin-left: -" + (window.innerWidth / 2) + "px;";
			// slapping some junk onto the end of the URL tricks Firefox (and others?) into letting the page load itself into an iframe
			iframe.src = window.location.href + (("" === window.location.search) ? "?" : "&") + "is_this_a_hack=true";
			iframe.addEventListener("load", function () {
				iframe.contentDocument.addEventListener("keydown", keyChecker);
			});
			
			document.body.style.position = "relative";
			document.body.style.height = window.innerHeight + "px";

			html.innerHTML = "";
			html.style.backgroundColor = settings.background;

			document.body.appendChild(iframe);
		};

		that.width = function (size) {
			var newSize = size;

			if ("string" !== typeof newSize) {
				newSize += settings.units;
			} else if (0 === size.indexOf("+") || 0 === size.indexOf("-")) {
				size = (("100%" === iframe.style.width) ? window.innerWidth : parseInt(iframe.style.width, 10)) + parseInt(size, 10);
				newSize = size + "px";
			}

			iframe.style.width = newSize;
			iframe.style.marginLeft = "-" + (parseInt(size, 10) / 2) + "px";
		};

		that.preset = function (preset) {
			iframe.style.width = presets[preset].width + "px";
			iframe.style.height = presets[preset].height + "px";
			iframe.style.marginLeft = "-" + (presets[preset].width / 2) + "px";
			document.body.style.height = presets[preset].height + "px";
		};

		that.setBreakpoint = function () {
			if (-1 === breakpoints.indexOf(iframe.style.width)) {
				breakpoints.push(iframe.style.width);
			}
		};

		that.getBreakpoints = function () {
			var bpString = "";

			breakpoints.sort();

			for (var i = 0; i < breakpoints.length; i += 1) {
				//console.log("@media (max-width: "+ breakpoints[i] +") { }");
				bpString += "@media (max-width: "+ breakpoints[i] +") {\n/* stuff and things */\n}\n\n";
			}

			console.log(bpString);
		};

		that.customize = function (options) {
			for (var option in options) {
				if (options.hasOwnProperty(option)) {
					settings[option] = options[option];
				}
			}
			update();
		};

		init();

		/* shorthand ! */
		that.c = that.customize;
		that.p = that.preset;
		that.w = that.width;

		return that;
	}
}());