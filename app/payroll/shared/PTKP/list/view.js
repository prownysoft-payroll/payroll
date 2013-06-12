define([
	'backbone',
	'namespace',
	'text!../../app/payroll/shared/PTKP/list/template.html',
	'bootstrap-modalmanager',
	'bootstrap-modal',
	'loadCss'],

function(Backbone, ns, template) {
	ns.define('payroll.shared.ptkp');
	payroll.shared.ptkp.list = Backbone.View.extend({
		id: "shared-ptkp-list",
		className: "modal hide fade",
		initialize: function() {
			loadCss('../../../../../public/css/bootstrap-modal.min.css');
			loadCss('style.css');
			this.$el.attr({
				"data-focus-on": "input:first",
				"data-backdrop": "static",
				"data-keyboard": false
			})
		},
		template: _.template(template),
		render: function() {
			this.$el.html(this.template());
			return this;
		},
		modal: function(options) {
			this.$el.modal();
		}
	});
	return payroll.shared.ptkp.list;
});