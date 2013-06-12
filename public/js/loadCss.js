loadCss = function(url) {
	if (!$('head link[href="' + url + '"]').length) {
		var link = document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = url;
		document.getElementsByTagName("head")[0].appendChild(link);
	}
}