"use strict";
define.amd.jQuery = true;
requirejs.config({
	baseUrl: '../../../../public/js',
	paths:{
		jquery: 'jquery-1.9.1.min',
		underscore: 'underscore-min',
		backbone: 'backbone-min',
		bootstrap: 'bootstrap.min',
		jqBootstrapValidation: 'jqbootstrapvalidation',
		bootbox: 'bootbox.min',
		fn: URL_APP + 'fn',
	},
	shim:{
		'underscore': {
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
			deps: ['jquery', 'underscore', 'bootstrap', 'underscore'],
			exports: 'Backbone'
		}
	}
});

define([
	'backbone',
	'view.js'
], function(Backbone, View){
	$(function(){
		this.view = new View();
		$('.container').html(this.view.render().$el);
	});
});