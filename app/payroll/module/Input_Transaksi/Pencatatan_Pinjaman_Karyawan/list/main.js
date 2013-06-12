"use strict";
define.amd.jQuery = true;

requirejs.config({
	baseUrl: '../../../../../../public/js',
	paths: {
		jquery: 'jquery-1.9.1.min',
		underscore: 'underscore-min',
		backbone: 'backbone-min',
		namespace: 'namespace',
		bootstrap: 'bootstrap.min',
		highcharts: 'highcharts/highcharts'
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
		'highcharts':{
			deps: ['jquery']
		}
	}
});

define([
	'backbone',
	'view.js'], function(Backbone, View) {
	$(function() {
		var view = new View();
		$('body > .container > .datatable').html(view.render().$el);
		view.createHighcharts();
	});
});