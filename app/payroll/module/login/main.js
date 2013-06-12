"use strict";
define.amd.jQuery = true;

requirejs.config({
	baseUrl: '../../../../public/js',
	paths:{
		jquery: 'jquery-1.9.1.min',
		underscore: 'underscore-min',
		backbone: 'backbone-min',
		namespace: 'namespace',
		bootstrap: 'bootstrap.min'
	},
	shim:{
		'underscore': {
			exports: '_'
		},
		'namespace': {
			deps: ['underscore'],
			export: '_'
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
	'view.js'
], function($, _, Backbone,ns, eventAggregator, View){
	$(function(){
		this.view = new View();
		$('body > .container').html(this.view.render().$el);
		this.view.$("input[name='username']").focus();
	});
});