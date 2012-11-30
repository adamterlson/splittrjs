
function querystring(key) {
   var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
   var r=[], m;
   while ((m=re.exec(document.location.search)) != null) r.push(m[1]);
   return r;
}

var split = (function (config) {
	var splittr = {},
		defaults = {
			test: '',
			branch: '',
			reset: true
		},
		settings;

	splittr.initialize = function () {
		settings = $.extend({}, defaults, config);

		var string = querystring('splittr')[0];
		if (string) {
			var urlConfig = $.parseJSON(decodeURIComponent(string));
			urlConfig.querystring = string;
			$.extend(settings, urlConfig);
		}

		if (settings.reset) {
			settings.querystring = "splittr=" + settings.querystring;
			history.pushState(null, "custom", document.location.search.replace(settings.querystring, ''));
		}
	};
	
	splittr.initialize();
	
	var split = function (name) {
		if (!settings.test || !settings.branch)
			return name;

		var parts = name.split('.');
		var newName = parts[0] + '-' + settings.test + '-' + settings.branch;
		if (parts[1]) {
			newName += '.' + parts[1];
		}
		return newName;
	};


	return $.extend(split, splittr);

})();

define([split('mytemplate')], function (template) {
	alert(template);
})