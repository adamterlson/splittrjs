require(['../splittr'], function (splittr) {
	var string = querystring('splittr')[0];
	var urlConfig;

	if (string) {
		urlConfig = $.parseJSON(decodeURIComponent(string));
		urlConfig.querystring = string;
	}

	// Good idea to push on a new URL that masks config?
	if (false) {
		settings.querystring = "splittr=" + settings.querystring;
		history.pushState(null, "custom", document.location.search.replace(settings.querystring, ''));
	}

	splittr.setup(urlConfig);

	require([splittr('text!mytemplate.html')], function (template) {
		alert(template);
	})
});

function querystring(key) {
   var re=new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi');
   var r=[], m;
   while ((m=re.exec(document.location.search)) != null) r.push(m[1]);
   return r;
}
