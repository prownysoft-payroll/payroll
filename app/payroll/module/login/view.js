define([
		'backbone',
		'namespace',
		'eventAggregator',
		'module/login/model.js',
		'text!module/login/template.html',
		'jqBootstrapValidation',
		'bootbox'
], function(Backbone, ns, eventAggregator, Model, template) {
	ns.define('payroll.module.login');
	payroll.module.login.View = Backbone.View.extend({
		id: 'formLogin',
		initialize: function() {
			this.model = new Model();
		},
		template: _.template(template),
		render: function() {
			var self = this;
			this.$el.html(this.template());
			this.$('input').jqBootstrapValidation({
				submitError: function($form, event, error) {
					self.$('.alert').remove();
				},
				submitSuccess: function($form, event) {
					event.preventDefault();
					self.$('.alert').remove();
					self.submit();
				}
			});
			return this;
		},
		events: {
			'change input': function(ev) {
				this.model.set($(ev.target).attr('name'), $(ev.target).val());
			}
		},
		submit: function(ev) {
			var self = this;
			this.model.fetch({
				data: this.model.toJSON(),
				success: function(model, response, options) {
					if (response.success)
						eventAggregator.trigger('payroll_router_router:index');
					else
						bootbox.alert(ERROR_SERVER);
				},
				error: function(model, response, options) {
					if (response.responseText) {
						var data = JSON.parse(response.responseText);
						if (data.message) {
							self.showErrorMessage(data.message);
							return false;
						}
					}
					bootbox.alert(ERROR_SERVER);
				},
				complete: function() {
					self.$('.btn').removeClass('disabled').removeAttr("disabled");
				}
			});
		},
		showErrorMessage: function(msg) {
			var html = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">x</button><span>' + msg + '</span></div>';
			this.$('.alert').remove();
			this.$('button').after(html);
		}
	});
	return payroll.module.login.View;
});