var app = app || {};

(function(){
	'use strict';

	app.Item = Backbone.Model.extend({
		default:{
			name: '',
			author: '',
			price: 0,
			checked: false
		},
		toggle: function(){
			this.set('checked', !this.get('checked'));
		}
	});
})();