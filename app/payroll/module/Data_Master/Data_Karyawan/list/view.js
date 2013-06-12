define([
	'backbone',
	'namespace',
	'text!../../app/payroll/module/Data_Master/Data_Karyawan/list/template.html'],
function(Backbone, ns, template) {
	ns.define('module.data_master.data_karyawan');
	module.data_master.data_karyawan.list = Backbone.View.extend({
		initialize: function() {
			var html = "";
		},
		template: _.template(template),
		render: function() {
			this.$el.html(this.template());
			return this;
		}
	});
	return module.data_master.data_karyawan.list;
});