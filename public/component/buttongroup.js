define([
		'backbone',
		'namespace',
		'Button'
], function(Backbone, ns, Button) {
	ns.define('component');
	component.ButtonGroup = Backbone.View.extend({
		className: 'btn-group',
		initialize: function() {
			if(this.options.attr)
				this.$el.attr(this.options.attr);
		},
		render: function() {
			this.$el.empty();
			this.items();
			return this;
		},
		items: function() {
			this.options.items && _.each(this.options.items, this.addOne, this);
		},
		addOne: function(item) {
			var button = new Button(item);
			this.$el.append(button.render().$el);
		}
	});
	return component.ButtonGroup;
});