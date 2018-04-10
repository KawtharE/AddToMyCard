var app = app || {};

(function(){
	'use strict';

	var AppRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},
		setFilter: function(param){
			// Set the current filter to be used
			app.AppFilter = param || '';
		}
	});
	app.AppRouter = new AppRouter();
	Backbone.history.start();
})();
