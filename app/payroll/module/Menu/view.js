define([
		'backbone',
		'namespace',
		'eventAggregator',
		'module/menu/model.js',
		'text!module/menu/template.html'
], function(Backbone, ns, eventAggregator, Model, template) {
	ns.define('payroll.module.menu');
	payroll.module.menu.View = Backbone.View.extend({
		id: 'menuView',
		initialize: function() {
			this.model = new Model();
		},
		template: _.template(template),
		render: function() {

			this.$el.html(this.template(this.model.attributes));
			return this;
		}
	});

	return payroll.module.menu.View;

})