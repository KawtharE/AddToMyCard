var AppView = Backbone.View.extend({
	el: '#form',

	initialize: function(){
		this.listenTo(app.items.toJSON(), 'change', this.render);
		this.listenTo(app.items.toJSON(), 'all', this.render);
		app.listView = new app.ListView();
		this.render();
	},
	render: function(){
		this.form = $('#form');
		this.list = $('#list');
		this.total = $('#total');
		this.list.show();
		this.total.show();
		this.form.show();

		return this;
	}
});
