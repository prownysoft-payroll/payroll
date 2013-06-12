define([
		'backbone',
		'namespace',
		'text!../../app/payroll/module/Data_Master/Data_Karyawan/create/template.html',
		'bootstrap-modalmanager',
		'bootstrap-modal',
		'bootstrap-datepicker',
		'loadCss'
], function(Backbone, ns, template) {
	ns.define('module.data_master.data_karyawan');
	module.data_master.data_karyawan.create = Backbone.View.extend({
		id: "data_master-data_karyawan-create",
		className: "modal container hide fade",
		initialize: function() {
			loadCss('../../../../../../public/css/bootstrap-modal.min.css');
			loadCss('../../../../../../public/css/bootstrap-datepicker.min.css');
			loadCss('style.css');
			this.$el.attr({
				"data-focus-on": "input:first",
				"data-backdrop": "static",
				"data-keyboard": false
			})
		},
		template: _.template(template),
		render: function() {
			this.$el.html(this.template);
			return this;
		},
		modal: function(options) {
			this.$el.modal();
			this.$('#inputBirthDate, #inputNPWPDate').datepicker();
		}
	});
	return module.data_master.data_karyawan.create;
});