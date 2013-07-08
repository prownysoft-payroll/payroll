define([
		'backbone',
		'namespace',
		'button'
], function(Backbone, ns) {
	ns.define('component');
	component.button_Group = Backbone.View.extend({
		className: 'btn-group',
		initialize: function() {

		},
		render: function() {
			this.items();
			return this;
		},
		items: function() {
			this.options.items && _.each(items, this.addOne(item), this);
		},
		addOne: function(item) {
			var button = new Button(item);
			this.$el.append(button.render().$el);
		}
	});
	return component.button_Group;
});