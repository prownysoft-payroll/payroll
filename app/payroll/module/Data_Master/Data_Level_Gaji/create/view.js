define([
		'backbone',
		'namespace',
		'text!../../app/payroll/module/Data_Master/Data_Level_Gaji/create/template.html',
		'bootstrap-modalmanager',
		'bootstrap-modal',
		'loadCss'
], function(Backbone, ns, template) {
	ns.define('module.data_master.data_level_gaji');
	module.data_master.data_level_gaji.create = Backbone.View.extend({
		id: "data_master-data_level_gaji-create",
		className: "modal hide fade",
		initialize: function() {
			loadCss('../../../../../../public/css/bootstrap-modal.min.css');
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
		}
	});
	return module.data_master.data_level_gaji.create;
});