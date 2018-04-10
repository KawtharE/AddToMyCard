var app = app || {};

(function(){
	'use strict';

	app.ListView = Backbone.View.extend({
		el: '#list',
		template: _.template($('#item-template').html()),
		events: {
			'click .toggle': 'toggle'
		},
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html(this.template({items: app.items.toJSON()}));
			return this;
		},
		toggle: function(ev){
			console.log("app.items.checkedItems()");
			var listName = $(ev.currentTarget).attr('data-name');
			app.model = app.items.where({name: listName});
			app.model[0].toggle();
			var total = 0;
			_.each(app.items.checkedItems(), function(item){
				total += item.get('price');
			});
			$('#total').html('$ '+total.toFixed(2));
		}
	});
	
})();