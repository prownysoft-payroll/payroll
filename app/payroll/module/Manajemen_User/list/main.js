"use strict";
define.amd.jQuery = true;

requirejs.config({
	baseUrl: '../../../',
	paths: {
		jquery: '../../public/js/jquery-1.9.1.min',
		underscore: '../../public/js/underscore-min',
		backbone: '../../public/js/backbone-min',
		namespace: '../../public/js/namespace',
		bootstrap: '../../public/js/bootstrap.min',
		text: '../../public/js/text',
		eventAggregator: '../../public/js/eventAggregator',
		jqBootstrapValidation: '../../public/js/jqbootstrapvalidation.min',
		create_update_delete: '../../public/js/create_update_delete',
		loadCss: '../../public/js/loadCss',
		bootbox: '../../public/js/bootbox.min',
		Button: '../../public/component/button',
		ButtonGroup: '../../public/component/buttongroup',
		Table: '../../public/component/table',
		Input: '../../public/component/input',
		Label: '../../public/component/label'
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
		}
	}
});

define([
	'backbone',
	'view.js'], function(Backbone, View) {
	$(function() {

		this.view = new View();
		$('body > .container').html(this.view.render().$el);
		this.view.collection.fetch();
	});
});