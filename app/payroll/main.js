"use strict";
define.amd.jQuery = true;

requirejs.config({
	baseUrl: '../../public/js',
	paths: {
		jquery: 'jquery-1.9.1.min',
		underscore: 'underscore-min',
		backbone: 'backbone-min',
		namespace: 'namespace',
		bootstrap: 'bootstrap.min'
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
		'bootstrap': {
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
	'jquery',
	'underscore',
	'backbone',
	'namespace',
	'eventAggregator',
	'shared/menu.js'], function($, _, Backbone, ns, eventAggregator, menu) {
	$(function() {
		this.menu = new menu();
		//$('body').html(this.menu.render().$el);
		//$('body').append("<div class='container'></div>");
		Backbone.history.start();
	});
});