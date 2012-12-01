/**
 * http://github.com/adamterlson/splittr
 */

define(function () {
    'use strict';

	var settings = {
		test: '',
		branch: '',
		randomize: false
	};

	function parseRequireString (name) {
		var resource = {
			plugin: null,
			path: null,
			extension: null
		};

		var pluginSplit = name.split('!');
		if (pluginSplit[1]) {
			resource.plugin = pluginSplit[0];
			name = pluginSplit[1];
		}

		var lastDot = name.lastIndexOf('.')
		if (lastDot !== -1 && name.charAt(lastDot+1) !== '/') { //mega swag to skip over ../ bits yet find a potential extension
			resource.path = name.substring(0, lastDot);
			resource.extension = name.substring(lastDot);
		}
		else {
			resource.path = name;
		}

		console.log(resource);

		return resource;
	}

	function createRequireString (parts) {
		var builder = [];
		if (parts.plugin) {
			builder.push(parts.plugin, '!');
		}

		builder.push(parts.path);

		if (parts.extension){
			builder.push(parts.extension)
		}

		return builder.join('');
	}
	

	var splittr = function (name) {
		if (!name || !settings.test || !settings.branch || (settings.randomize && Math.round(Math.random())))
			return name;

		var parts = parseRequireString(name);
		parts.path += '-' + settings.test + '-' + settings.branch;

		return createRequireString(parts);
	};

	splittr.set = function (config) {
		//TODO: Check for undefined... Really I want a mixin without jQuery.

		settings.test = config.test;
		settings.branch = config.branch;
		settings.randomize = config.randomize;
	};

	return splittr;
});