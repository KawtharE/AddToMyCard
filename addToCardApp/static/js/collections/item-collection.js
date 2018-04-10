var app = app || {};

(function(){
	'use strict';

	var Items = Backbone.Collection.extend({
		model: app.Item,
		checkedItems: function(){
			return this.where({checked: true});
		}
	});
	app.items = new Items([
		new app.Item({id:0, name: 'The Self-Taught Programmer', author:'Cory Althoff', price: 14.98, checked: false}),
		new app.Item({id:1, name: 'Python for R Users: A Data Science Approach', author:'Ajay Ohri', price: 42.53, checked: false}),
		new app.Item({id:2, name: 'Web Design with HTML, CSS, JavaScript and jQuery Set', author:'Jon Duckett', price: 29.55, checked: false}),
		new app.Item({id:3, name: 'HTML and CSS: Design and Build Websites ', author:'Jon Duckett', price: 13.99, checked: false}),
		new app.Item({id:4, name: 'Deep Learning with Python ', author:'Francois Chollet', price: 42.78, checked: false})
		]);

})();