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
		events: {
			'click .logout': 'logout'
		},
		render: function() {
			this.$el.html(this.template(this.model.attributes));
			return this;
		},
		logout: function() {
			$.ajax({
				url: URL_SERVER + 'login/logout',
				async: false
			});
			eventAggregator.trigger('payroll_router_router:index');
		}

	});

	return payroll.module.menu.View;

})