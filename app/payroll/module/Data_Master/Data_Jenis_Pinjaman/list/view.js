define([
	'backbone',
	'namespace',
	'text!../../app/payroll/module/Data_Master/Data_Jenis_Pinjaman/list/template.html'],
function(Backbone, ns, template) {
	ns.define('module.data_master.data_jenis_pinjaman');
	module.data_master.data_jenis_pinjaman.list = Backbone.View.extend({
		initialize: function() {
			var html = "";
		},
		template: _.template(template),
		render: function() {
			this.$el.html(this.template());
			return this;
		}
	});
	return module.data_master.data_jenis_pinjaman.list;
});