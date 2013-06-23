"use strict";
define.amd.jQuery = true;
requirejs.config({
	baseUrl: '../../public/js',
	paths: {
		jquery: 'jquery-1.9.1.min',
		underscore: 'underscore-min',
		backbone: 'backbone-min',
		namespace: 'namespace',
		bootstrap: 'bootstrap.min',
		jqBootstrapValidation: 'jqbootstrapvalidation',
		bootbox: 'bootbox.min',
		fn: URL_APP + 'fn',
		login: URL_APP + 'module/Login/view',
		menu: URL_APP + 'module/Menu/view'
	},
	shim: {
		'underscore': {
			deps: ['jquery'],
			exports: '_'
		},
		'namespace': {
			deps: ['underscore']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'jqBootstrapValidation': {
			deps: ['jquery']
		},
		'bootbox': {
			deps: ['jquery', 'bootstrap']
		},
		'backbone': {
			deps: ['jquery', 'underscore', 'bootstrap', 'underscore'],
			exports: 'Backbone'
		},
		'eventAggregator': {
			deps: ['namespace', 'backbone'],
			exports: 'eventAggregator'
		}
	}
});

define([
		'backbone',
		'fn',
		'eventAggregator',
		'bootbox',
], function(Backbone, fn, eventAggregator) {
	$(function() {
		Backbone.history.start();

		eventAggregator.on('loadFormLoginOrMenu',function(){

			$.ajax({
				url: URL_SERVER + 'login',
				error: function(xhr, status, error) {
					var data = JSON.parse(xhr.responseText);
					if (data.short_message == "wrong login") {
						require(["login"], function(Login) {
							var login = new Login();
							$('body').empty();
							$('body').append("<div class='container'></div>");
							$('.container').html(login.render().$el);
							login.$("input").first().focus();
						})
					} else if (data.short_message == "already login")
						fn.loadMenu();
					else
						bootbox.alert(ERROR_SERVER);
				}
			});
		});

		eventAggregator.trigger('loadFormLoginOrMenu');
	});
});