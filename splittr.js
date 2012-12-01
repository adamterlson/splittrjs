define(function () {
	var splittr = {},
		defaults = {
			test: '',
			branch: '',
			reset: true
		},
		settings = $.extend({}, defaults);

	splittr.setup = function (config) {
		$.extend(settings, config);
	};

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
});