"use strict";
define.amd.jQuery = true;

requirejs.config({
	baseUrl: '../../../../../../public/js',
	paths: {
		jquery: 'jquery-1.8.0.min',
		underscore: 'underscore',
		backbone: 'backbone-min',
		namespace: 'namespace',
		bootstrap: 'bootstrap.min',
		'bootstrap-modalmanager': 'bootstrap-modalmanager.min',
		'bootstrap-modal': 'bootstrap-modal.min',
		'bootstrap-datepicker': 'bootstrap-datepicker.min',
		'loadCss': 'loadCss',
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
		'loadCss': {
			deps: ['jquery']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'bootstrap-modalmanager': {
			deps: ['bootstrap']
		},
		'bootstrap-modal': {
			deps: ['bootstrap']
		},
		'bootstrap-datepicker': {
			deps: ['jquery']
		},
		'backbone': {
			deps: ['underscore', 'jquery', 'bootstrap'],
			exports: 'Backbone'
		}
	}
});

define([
		'backbone',
		'view.js'
], function(backbone, View) {
	$(function() {
		var view = new View();
		$('.container').append(view.render().$el);
		view.$el.modal();
	});
});