define([
	'backbone',
	'namespace',
	'model.js',
	'collection.js',
	'Table',
	'Input',
	'Button',
	'ButtonGroup',
	'Label',
	'loadCss',
	'create_update_delete'
], function(Backbone, ns, model, Collection, Table, Input, Button, ButtonGroup,
	Label) {
	ns.define('module.manajemen_user.list');
	module.manajemen_user.list.View = Backbone.View.extend({
		initialize: function() {
			var selfListView = this;
			this.view = {};
			loadCss(URL_APP+'module/manajemen_user/style.css');
			this.collection = new Collection();
			this.collection.on('reset', function() {
				this.bodyEmpty();
			}, this);

			this.view.tdCrudPopoverUpdate = function(self) {
				var defaults = {};
				defaults[self.options.dataIndex] = self.model.get(self.options.dataIndex);
				var ModelChange = Backbone.Model.extend({
					defaults: defaults
				});
				var modelChange = new ModelChange();
				modelChange.on('change:' + self.options.dataIndex, function() {
					buttonGroup.render();
				});

				var cudMode = self.model.get(self.options.dataIndex);
				var iconDelete = "<i class='icon-trash" + (isCUDModeDelete(cudMode) ? "' title='hapus'" : " icon-white'") + "></i>";
				var iconUpdate = "<i class='icon-edit" + (isCUDModeUpdate(cudMode) ? "' title='ubah'" : " icon-white'") + "></i>";
				var iconCreate = "<i class='icon-pencil" + (isCUDModeCreate(cudMode) ? "' title='tambah'" : " icon-white'") + "></i>";

				self.$el.html($('<div class="text">' + iconCreate + iconUpdate + iconDelete + '</div>'));

				var modelChangeCudMode = modelChange.get(self.options.dataIndex);
				var buttonGroup = new ButtonGroup({
					items: [{
						className: function() {
							return 'btn ' + (isCUDModeCreate(this.model.get(self.options.dataIndex)) ? 'btn-success' : '');
						},
						model: modelChange,
						html: function(model, buttonSelf) {
							return "<i class='icon-ok " + (isCUDModeCreate(model.get(self.options.dataIndex)) ? 'icon-white' : '') + "'></i>"
						},
						eventClick: function(model, buttonSelf) {
							model.set(self.options.dataIndex, setCUDModeCreate(model.get(self.options.dataIndex), !isCUDModeCreate(model.get(self.options.dataIndex))));
						}
					}, {
						className: function() {
							return 'btn ' + (isCUDModeUpdate(this.model.get(self.options.dataIndex)) ? 'btn-success' : '');
						},
						model: modelChange,
						html: function(model, buttonSelf) {
							return "<i class='icon-pencil " + (isCUDModeUpdate(model.get(self.options.dataIndex)) ? 'icon-white' : '') + "'></i>"
						},
						eventClick: function(model, buttonSelf) {
							model.set(self.options.dataIndex, setCUDModeUpdate(model.get(self.options.dataIndex), !isCUDModeUpdate(model.get(self.options.dataIndex))));
						}
					}, {
						className: function() {
							return 'btn ' + (isCUDModeDelete(this.model.get(self.options.dataIndex)) ? 'btn-success' : '');
						},
						model: modelChange,
						html: function(model, buttonself) {
							return "<i class='icon-trash " + (isCUDModeDelete(model.get(self.options.dataIndex)) ? 'icon-white' : '') + "'></i>"
						},
						eventClick: function(model, buttonSelf) {
							model.set(self.options.dataIndex, setCUDModeDelete(model.get(self.options.dataIndex), !isCUDModeDelete(model.get(self.options.dataIndex))));
						}
					}]
				});

				var buttonOk = new Button({
					model: modelChange,
					className: 'btn btn-success margin-left-more',
					html: "<i class='icon-ok icon-white'></i>",
					eventClick: function(model, buttonSelf) {

						buttonClose.click();
					}
				});

				var buttonClose = new Button({
					html: "<i class='icon-remove'></i>",
					eventClick: function() {
						self.$('div').popover('destroy');
						self.render();
					}
				});

				var html = $('<div></div>');
				$(html).append(buttonGroup.render().$el);
				$(html).append(buttonOk.render().el);
				$(html).append(buttonClose.render().el);
				return html;
			};

			this.view.column = function(data){
				return {
					dataIndex: data.dataIndex,
					events: {
						'click .text': function() {
							$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
							this.$('div').popover('destroy')
							this.render();
							this.$('div').popover('show');
						}
					},
					render: function() {
						var html = this.options.tdCrudPopoverUpdate(this);
						this.$('div').popover('destroy').popover({
							trigger: 'manual',
							html: true,
							content: html,
							title: data.title || ' '
						});
						return this;
					},
					tdCrudPopoverUpdate: data.tdCrudPopoverUpdate
				}
			};

			this.view.Table = new Table({
				className: 'table table-bordered table-condensed table-striped table-hover table-autonumbering table-tbody-tr-td-dblclick manajemen-user-table',
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
							}]
						}
					},
					tbody: {
						htmlTag: {
							tr: {
								htmlTag: {
									td: [
										'' // autonumbering
										, {
											dataIndex: "username",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var self = this;

												if (this.options.dataIndex && this.model)
													this.$el.html("<div class='text'>" + this.model.get(this.options.dataIndex) + "</div>");
												var input = new Input({
													model: this.model,
													dataIndex: this.options.dataIndex,
													className: 'input-medium',
													attr: {
														placeholder: 'nama user'
													}
												});

												var buttonOk = new Button({
													className: 'btn btn-success',
													html: "<i class='icon-ok icon-white'></i>",
													css: {
														'max-width': '300px'
													}
												});

												var buttonClose = new Button({
													html: "<i class='icon-remove'></i>",
													eventClick: function(model, buttonself) {
														self.$('div').popover('destroy');
														self.render();
													}
												});
												var html = $('<div></div>');
												$(html).append(input.render().el);
												$(html).append(buttonOk.render().el);
												$(html).append(buttonClose.render().el);

												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update Nama User</b>"
												});
												return this;
											}
										}, {
											dataIndex: "role",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var self = this;
												if (this.options.dataIndex && this.model)
													this.$el.html("<div class='text'>" + this.model.get(this.options.dataIndex) + "</div>");

												var roleAry = this.model.get('role') && this.model.get('role').split(',');

												var labelCheckboxOwner = new Label({
													className: 'checkbox',
													model: this.model,
													viewPrepend: function() {
														var input = new Input({
															model: self.model,
															attr: {
																type: 'checkbox',
																value: 'owner',
																checked: roleAry && (_.find(roleAry, function(role) {
																	return role == 'owner'
																}) && 'checked')
															}
														});
														return input.render().el;
													},
													text: "Owner"
												});
												var labelCheckboxAdministrator = new Label({
													className: 'checkbox',
													model: this.model,
													viewPrepend: function() {

														var input = new Input({
															model: self.model,
															attr: {
																type: 'checkbox',
																value: 'administrator',
																checked: roleAry && (_.find(roleAry, function(role) {
																	return role == 'administrator'
																}) && 'checked')
															}
														});
														return input.render().el;
													},
													text: 'Administrator'
												});

												var buttonOk = new Button({
													className: 'btn btn-success',
													html: "<i class='icon-ok icon-white'></i>",
													css: {
														'max-width': '300px'
													}
												});

												var buttonClose = new Button({
													html: "<i class='icon-remove'></i>",
													eventClick: function(model, buttonself) {
														self.$('div').popover('destroy');
														self.render();
													}
												});
												var html = $('<div></div>');
												$(html).append(labelCheckboxOwner.render().el);
												$(html).append(labelCheckboxAdministrator.render().el);
												$(html).append(buttonOk.render().el);
												$(html).append(buttonClose.render().el);

												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update Nama User</b>"
												});
												return this;

											}
										},
											this.view.column({
												dataIndex: 'crud_golongan_kerja',
												title: '<b>Update Golongan Kerja</b>',
												tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
											})
										// {
										// 	dataIndex: "crud_golongan_kerja",
										// 	events: {
										// 		'click .text': function() {
										// 			$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
										// 			this.$('div').popover('destroy')
										// 			this.render();
										// 			this.$('div').popover('show');
										// 		}
										// 	},
										// 	render: function() {
										// 		var html = this.options.tdCrudPopoverUpdate(this);
										// 		this.$('div').popover('destroy').popover({
										// 			trigger: 'manual',
										// 			html: true,
										// 			content: html,
										// 			title: "<b>Update Golongan Kerja</b>"
										// 		});
										// 		return this;
										// 	},
										// 	tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
										// }
										, {
											dataIndex: "crud_tunjangan",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var html = this.options.tdCrudPopoverUpdate(this);
												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update Tunjangan</b>"
												});
												return this;
											},
											tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
										}, {
											dataIndex: "crud_departemen",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var html = this.options.tdCrudPopoverUpdate(this);
												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update Departemen</b>"
												});
												return this;
											},
											tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
										}, {
											dataIndex: "crud_jabatan",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var html = this.options.tdCrudPopoverUpdate(this);
												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update Jabatan</b>"
												});
												return this;
											},
											tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
										}, {
											dataIndex: "crud_penambah_gaji",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var html = this.options.tdCrudPopoverUpdate(this);
												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update Penambah Gaji</b>"
												});
												return this;
											},
											tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
										}, {
											dataIndex: "crud_pengurang_gaji",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var html = this.options.tdCrudPopoverUpdate(this);
												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update Pengurang Gaji</b>"
												});
												return this;
											},
											tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
										}, {
											dataIndex: "crud_PTKP",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var html = this.options.tdCrudPopoverUpdate(this);
												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update PTKP</b>"
												});
												return this;
											},
											tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
										}, {
											dataIndex: "crud_status_karyawan",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var html = this.options.tdCrudPopoverUpdate(this);
												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update Staus Karyawan</b>"
												});
												return this;
											},
											tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
										}, {
											dataIndex: "crud_mata_uang",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var html = this.options.tdCrudPopoverUpdate(this);
												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update Mata Uang</b>"
												});
												return this;
											},
											tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
										}, {
											dataIndex: "crud_level_gaji",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var html = this.options.tdCrudPopoverUpdate(this);
												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update Level Gaji</b>"
												});
												return this;
											},
											tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
										}, {
											dataIndex: "crud_bank",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var html = this.options.tdCrudPopoverUpdate(this);
												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update Bank</b>"
												});
												return this;
											},
											tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
										}, {
											dataIndex: "crud_jenis_pinjaman",
											events: {
												'click .text': function() {
													$(this.$el).parents('tbody').find('.popover').prev().popover('hide');
													this.$('div').popover('destroy')
													this.render();
													this.$('div').popover('show');
												}
											},
											render: function() {
												var html = this.options.tdCrudPopoverUpdate(this);
												this.$('div').popover('destroy').popover({
													trigger: 'manual',
													html: true,
													content: html,
													title: "<b>Update Jenis Pinjaman</b>"
												});
												return this;
											},
											tdCrudPopoverUpdate: this.view.tdCrudPopoverUpdate
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