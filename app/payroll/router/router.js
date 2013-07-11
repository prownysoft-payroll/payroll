define([
		'backbone',
		'namespace',
		'eventAggregator',
		'bootbox'
], function(Backbone, ns, eventAggregator, Menu) {
	ns.define('payroll.router');
	payroll.router.Router = Backbone.Router.extend({
		initialize: function() {
			eventAggregator.on('payroll_router_router:index', this.index, this);
			this.view = {};
		},
		routes: {
			'': 'index',
			'manajemen_user': 'manajemen_user',
			'*default': 'default'
		},
		index: function() {
			var self = this;
			this.checkAuth({
				onAlreadyLoginLoadMenu: true
			})
		},
		manajemen_user: function() {
			var self = this;
			if (this.menu && this.menu.model.get('role')) {
				console.log("masuk manager");
			} else {
				this.checkAuth({
					onAlreadyLoginLoadMenu: true,
					load: function() {
						// console.log("pertengahan manager");
						self.manajemen_user();
					}
				});
			}
			//console.log("keluar manager");

			var load = function() {
				require([
						'module/Manajemen_User/view.js'
				], function(View) {
					self.view.managemen_user = new View();
				});
			}
		},
		default: function() {
			$('body').html("maaf, menu yang dicari belum tersedia");
		},
		checkAuth: function(options) {
			console.log('masuk checkAuth');
			var self = this;
			$.ajax({
				async: false,
				url: URL_SERVER + 'login',
				error: function(xhr) {
					var data = JSON.parse(xhr.responseText);
					if (data.short_message == "wrong login")
						self.loadLogin();
					else if (data.short_message == "already login")
						options && options.onAlreadyLoginLoadMenu && self.loadMenu({
							load: options.load
						});
					else
						bootbox.alert(ERROR_SERVER);
				}
			});
			console.log('keluar checkAuth');
		},
		loadLogin: function() {
			self = this;
			require([
					'module/login/view.js'
			], function(View) {
				self.login = new View();
				$('body').empty();
				$('body').append("<div class='container'></div>");
				$('.container').html(self.login.render().$el);
				self.login.$("input").first().focus();
			});
		},
		loadMenu: function(options) {
			var self = this;
			$.ajax({
				async: false,
				url: URL_SERVER + 'menu',
				success: function(data) {
					require(['module/Menu/view.js'], function(View) {
						self.menu = new View();
						self.menu.model.set(data);
						$('body').empty();
						$('body').html("\
								<div class='navbar navbar-fixed-top'>\
	        						<div class='navbar-inner'>\
	            						<div class='container'>\
	            						</div>\
	            					</div>\
	            				</div>");
						$('.container').html(self.menu.render().$el);
						if (options && options.load)
							options.load();
					});
				},
				error: function(xhr) {
					var data = JSON.parse(xhr.responseText);
					bootbox.alert(typeof data == "object" ? data.message : ERROR_SERVER);
				}
			});
		},
		isValidAuth: function(field, value) {
			this.menu && this.menu.model
		},
		checkMenuModel: function() {
			role
		}

	});
	return payroll.router.Router;
})