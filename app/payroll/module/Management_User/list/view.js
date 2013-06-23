define([
	'backbone',
	'namespace',
	'model.js',
	'collection.js',
	'text!../../app/payroll/module/Management_User/list/template.html'],
function(Backbone, ns, model, Collection, template) {
	ns.define('module.data_master.data_jenis_pinjaman');
	module.data_master.data_jenis_pinjaman.list = Backbone.View.extend({
		initialize: function() {
			this.collection = new Collection();
			this.collection.on('reset',function(){
				this.bodyEmpty();
			}, this);
			var html = "";
		},
		template: _.template(template),
		render: function() {
			this.$el.html(this.template());
			return this;
		},
		bodyEmpty: function(){
			this.$('body').empty();
		},
		addOne: function(){
			this.$('body').append();
		}

	});
	return module.data_master.data_jenis_pinjaman.list;
});