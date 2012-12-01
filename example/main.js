require(['../splittr', 'jquery'], function (splittr, $) {
	var string = querystring('splittr')[0];
	var urlConfig = {};

	if (string) {
		urlConfig = $.parseJSON(decodeURIComponent(string));
		urlConfig.querystring = string;
	}

	// Good idea to push on a new URL that masks config?
	/*
		settings.querystring = "splittr=" + settings.querystring;
		history.pushState(null, "custom", document.location.search.replace(settings.querystring, ''));
	*/

	splittr.set(urlConfig);

	require([splittr('../text!mytemplate.html')], function (template) {
		$('#split').html(template)
	})

	var html = 'Loading version:<br />';
	if (urlConfig.test) {
		html += 'test: ' + urlConfig.test + '<br />';
		html += 'branch: ' + urlConfig.branch;
	}
	else {
		html += 'BASE';
	}
	$('#info').html(html);
	
	$('#reload').click(function () {
		var s = $('#config').val();
		s.replace(/\s+/g, ' ');
		window.location = "index.html?splittr=" + encodeURIComponent(s);
	});

});

function querystring(key) {
   var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
   var r=[], m;
   while ((m=re.exec(document.location.search)) != null) r.push(m[1]);
   return r;
}
