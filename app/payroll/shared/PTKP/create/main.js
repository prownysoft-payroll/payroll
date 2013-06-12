"use strict";
define.amd.jQuery = true;

requirejs.config({
	baseUrl: '../../../../../public/js',
	paths: {
		jquery: 'jquery-1.9.1.min',
		underscore: 'underscore-min',
		backbone: 'backbone-min',
		bootstrap: 'bootstrap.min',
		'bootstrap-modalmanager': 'bootstrap-modalmanager.min',
		'bootstrap-modal': 'bootstrap-modal.min',
		'loadCss': 'loadCss'
	},
	shim: {
		'underscore': {
			deps: ['jquery'],
			exports: '_'
		},
		'namespace': {
			deps: ['underscore'],
			export: '_'
		},
		'loadCss':{
			deps: ['jquery']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'bootstrap-modalmanager':{
			deps: ['bootstrap']
		},
		'bootstrap-modal':{
			deps: ['bootstrap']
		},
		'backbone': {
			deps: ['jquery', 'underscore', 'bootstrap', 'underscore'],
			exports: 'Backbone'
		}
	}
});

define([
	'backbone',
	'view.js'], function(Backbone, View) {
	$(function() {
		this.view = new View();
		this.view.render().$el.modal();
	});
});