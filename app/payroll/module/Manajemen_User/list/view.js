define([
		'backbone',
		'namespace',
		'model.js',
		'collection.js',
		'componentTable'
], function(Backbone, ns, model, Collection, Table) {
	ns.define('module.manajemen_user.list');
	module.manajemen_user.list.View = Backbone.View.extend({
		initialize: function() {
			this.view = {};
			this.collection = new Collection();
			this.collection.on('reset', function() {
				this.bodyEmpty();
			}, this);
			var html = "";
			this.view.Table = new Table({
				className: 'table table-bordered',
				collection: this.collection,
				htmlTag: {
					thead: {
						htmlTag: {
							th: [{
									html: "No"
								}, {
									html: "Nama User"
								}, {
									html: "Role"
								}, {
									html: "Golongan Kerja"
								}, {
									html: "Tunjangan"
								}, {
									html: "Departemen"
								}, {
									html: "Jabatan"
								}, {
									html: "Penambah Gaji"
								}, {
									html: "Pengurang Gaji"
								}, {
									html: "PTKP"
								}, {
									html: "Status Karyawan"
								}, {
									html: "Mata Uang"
								}, {
									html: "Level Gaji"
								}, {
									html: "Bank"
								}, {
									html: "Jenis Pinjaman"
								}
							]
						}
					},
					tbody: {
						htmlTag: {
							tr: {
								htmlTag: {
									td: [{
											dataIndex: "no"
										}, {
											dataIndex: "username"
										}, {
											dataIndex: "role"
										}, {
											dataIndex: "crud_golongan_kerja"
										}, {
											dataIndex: "crud_tunjangan"
										}, {
											dataIndex: "crud_departemen"
										}, {
											dataIndex: "crud_jabatan"
										}, {
											dataIndex: "crud_penambah_gaji"
										}, {
											dataIndex: "crud_pengurang_gaji"
										}, {
											dataIndex: "crud_PTKP"
										}, {
											dataIndex: "crud_status_karyawan"
										}, {
											dataIndex: "crud_mata_uang"
										}, {
											dataIndex: "crud_level_gaji"
										}, {
											dataIndex: "crud_bank"
										}, {
											dataIndex: "crud_jenis_pinjaman"
										}
									]
								}
							}
						}
					}
				}
			});
		},
		render: function() {
			this.$el.html(this.view.Table.render().$el);
			return this;
		},
		bodyEmpty: function() {
			this.$('body').empty();
		},
		addOne: function() {
			this.$('body').append();
		}

	});
	return module.manajemen_user.list.View;
});