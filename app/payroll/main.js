"use strict";
define.amd.jQuery = true;
var url_server = "http://localhost:99/soft/payroll/server/index.php/";
var url_app = "../../app/payroll/";
requirejs.config({
	baseUrl: '../../public/js',
	paths: {
		jquery: 'jquery-1.9.1.min',
		underscore: 'underscore-min',
		backbone: 'backbone-min',
		namespace: 'namespace',
		bootstrap: 'bootstrap.min',
		jqBootstrapValidation: 'jqbootstrapvalidation',
		login: url_app + 'module/login/login'
	},
	shim: {
		'underscore': {
			deps: ['jquery'],
			exports: '_'
		},
		'namespace': {
			deps: ['underscore'],
			exports: 'ns'
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'jqBootstrapValidation': {
			deps: ['jquery']
		},
		'backbone': {
			deps: ['jquery', 'underscore', 'bootstrap', 'underscore'],
			exports: 'Backbone'
		},
		'eventAggregator': {
			deps: ['namespace', 'backbone']
		}
	}
});

define([
		'backbone'
], function(Backbone) {
	$(function() {
		Backbone.history.start();
		$.ajax({
			url: url_server + 'login',
			success: function(data) {
				console.log(data);
			},
			error: function(xhr, status, error) {
				var data = JSON.parse(xhr.responseText);
				if (data.short_message == "wrong login") {
					require(["login"], function(Login) {
						var login = new Login();
						$('body > .container').empty();
						$('body > .container').append(login.render().$el);
						login.$("input").first().focus();
					})
				} else if (data.short_message == "already login") {
					$.ajax({
						url: url_server + 'login/get_menus',
						success: function(data) {
							console.log(data);
						},
						error: function(xhr, status, error) {
							// if no menut availabel
							var data = JSON.parse(xhr.responseText);
							if (typeof data =="object"){
								if (data.short_message =="already login"){
									
								}
							}
						}
					});
				} else
					console.log(data.error ? data.message : error)
			}
		});
	});
});