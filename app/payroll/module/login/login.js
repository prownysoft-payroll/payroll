define([
		'jquery',
		'underscore',
		'backbone',
		'namespace',
		'text!../../app/payroll/module/login/template.html'
], function($, _, Backbone, ns, template) {
	ns.define('payroll.module.login');
	payroll.module.login.View = Backbone.View.extend({
		initialize: function() {
			var Model = Backbone.Model.extend({
				url: 'backend.php'
			});
			this.model = new Model();
		},
		template: _.template(template),
		render: function() {
			this.$el.html(this.template());
			return this;
		},
		events: {
			'click .btn': 'submit',
			'change input': function(ev) {
				this.model.set($(ev.target).attr('name'), $(ev.target).val())
			},
			'change input[name="password"]': 'changeInputPassword',
		},
		submit: function() {
			this.model.fetch({
				data: this.model.toJSON()
			})
		}
	});
	return payroll.module.login.View;
});