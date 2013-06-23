define([
		'backbone',
		'namespace',
		'fn',
	URL_APP + 'module/menu/model.js',
		'text!' + URL_APP + 'module/menu/template.html'
], function(Backbone, ns, fn, Model, template) {
	ns.define('payroll.module.menu');
	payroll.module.menu.View = Backbone.View.extend({
		id: 'menuView',
		initialize: function(){
			this.model = new Model();
		},
		template: _.template(template),
		render: function(){

			this.$el.html(this.template());
			return this;
		}
	});

	return payroll.module.menu.View;

})