define([
		'jquery',
		'underscore',
		'backbone',
		'namespace',
		'text!../../app/payroll/module/login/template.html',
		'jqBootstrapValidation'
], function($, _, Backbone, ns, template) {
	ns.define('payroll.module.login');
	payroll.module.login.View = Backbone.View.extend({
		id: 'formLogin',
		initialize: function() {
			var Model = Backbone.Model.extend({
				url: url_server+'login'
			});
			this.model = new Model();
		},
		template: _.template(template),
		render: function() {
			var self = this;
			this.$el.html(this.template());
			this.$('input').jqBootstrapValidation({
				submitError: function($form, event, error){
					self.$('.alert').remove();
				},
				submitSuccess: function($form, event){
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
				success: function(data) {
					if (data.success){

					}
				},
				error: function(data, status, error) {
					if (status.responseText) {
						var data = JSON.parse(status.responseText);
						self.showErrorMessage(data.message);
					}
				},
				complete: function() {
					self.$('.btn').removeClass('disabled').removeAttr("disabled");
				}
			});
		},
		showErrorMessage: function(msg){
			var html = '<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">x</button><span>'+msg+'</span></div>';
			this.$('.alert').remove();
			this.$('button').after(html);
		}
	});
	return payroll.module.login.View;
});