"use strict";
define.amd.jQuery = true;
requirejs.config({
	paths: {
		jquery: '../../public/js/jquery-1.9.1.min',
		underscore: '../../public/js/underscore-min',
		backbone: '../../public/js/backbone-min',
		namespace: '../../public/js/namespace',
		bootstrap: '../../public/js/bootstrap.min',
		text: '../../public/js/text',
		eventAggregator: '../../public/js/eventAggregator',
		jqBootstrapValidation: '../../public/js/jqbootstrapvalidation.min',
		bootbox: '../../public/js/bootbox.min',
		button: '../../public/../component/button'
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
		'bootbox': {
			deps: ['jquery', 'bootstrap']
		},
		'backbone': {
			deps: ['jquery', 'underscore', 'bootstrap', 'namespace'],
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
		'router/router.js',
		'eventAggregator'
], function(Backbone, Router, eventAggregator) {
	$(function() {
		var router = new Router();
		Backbone.history.start({root: '/soft/payroll/app/payroll'});
		eventAggregator.on("router:navigate", function(uri){
			router.navigate(uri,{trigger: true, replace: true});
		});
	});
});