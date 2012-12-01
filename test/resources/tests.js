var splittr;

module('core', {
	setup: function () {
		stop();
		require(['../splittr'], function (s) {
			splittr = s;
			start();
		});
	},
	teardown: function () {
		splittr.set({});
	}
});

test('Unconfigured splittr returns passed path without modification', function () {
	strictEqual(splittr('mypath'), 'mypath');
});

test('Configuration missing test returns passed path without modification', function () {
	splittr.set({ branch: 'b' });
	strictEqual(splittr('mypath'), 'mypath');
});

test('Configuration missing test returns passed path without modification', function () {
	splittr.set({ test: 't' });
	strictEqual(splittr('mypath'), 'mypath');
});

test('Passing in an empty name bails and returns it', function () {
	splittr.set({
		branch: 'b',
		test: 't'
	});

	strictEqual(splittr(''), '');
});

test('Parsing various valid paths returns the proper formats', function() {
	splittr.set({
		branch: 'b',
		test: 't'
	});

	strictEqual(splittr('foo'), 'foo-t-b');
	strictEqual(splittr('foo-bar'), 'foo-bar-t-b');
	strictEqual(splittr('foo-bar.html'), 'foo-bar-t-b.html');
	strictEqual(splittr('text!foo-bar.html'), 'text!foo-bar-t-b.html');
	strictEqual(splittr('../text!foo-bar.html'), '../text!foo-bar-t-b.html');
	strictEqual(splittr('../text!../foo-bar.html'), '../text!../foo-bar-t-b.html');
	strictEqual(splittr('../text!../foo-bar.baz.html'), '../text!../foo-bar.baz-t-b.html');
});