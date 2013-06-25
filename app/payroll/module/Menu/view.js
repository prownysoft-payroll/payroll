define([
		'backbone',
		'namespace',
		'fn',
		'eventAggregator',
	URL_APP + 'module/menu/model.js',
		'text!' + URL_APP + 'module/menu/template.html'
], function(Backbone, ns, fn, eventAggregator, Model, template) {
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
		},
		events: {
			'click .logout': 'logout'
		},
		logout: function() {
			$.ajax({
				url: URL_SERVER + 'login/logout',
				async: false
			});
			eventAggregator.trigger('loadFormLoginOrMenu');
		}
	});

	return payroll.module.menu.View;

})