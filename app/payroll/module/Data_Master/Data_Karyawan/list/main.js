"use strict";
define.amd.jQuery = true;

requirejs.config({
	baseUrl: '../../../../../../public/js',
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
			exports: 'ns'
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
	});
});