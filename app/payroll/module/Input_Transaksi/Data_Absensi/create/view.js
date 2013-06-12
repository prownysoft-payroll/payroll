define([
		'backbone',
		'namespace',
		'text!../../app/payroll/module/Input_Transaksi/Data_Absensi/create/template.html',
		'bootstrap-modalmanager',
		'bootstrap-modal',
		'bootstrap-datepicker',
		'loadCss'
], function(Backbone, ns, template) {
	ns.define('module.data_master.data_jenis_pinjaman');
	module.data_master.data_jenis_pinjaman.create = Backbone.View.extend({
		id: "data_master-data_jenis_pinjaman-create",
		className: "modal hide fade",
		initialize: function() {
			loadCss('../../../../../../public/css/bootstrap-modal.min.css');
			loadCss('../../../../../../public/css/bootstrap-datepicker.min.css');
			this.$el.attr({
				"data-focus-on": "input:first",
				"data-backdrop": "static",
				"data-keyboard": false
			})
		},
		template: _.template(template),
		render: function() {
			this.$el.html(this.template);
			this.$("#inputDate").datepicker();
			return this;
		},
		modal: function(options) {
			this.$el.modal();
		}
	});
	return module.data_master.data_jenis_pinjaman.create;
});