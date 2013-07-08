"use strict";
define.amd.jQuery = true;
requirejs.config({
	baseUrl: '../../../../public/js',
	paths: {
		jquery: 'jquery-1.9.1.min',
		underscore: 'underscore-min',
		backbone: 'backbone-min',
		namespace: 'namespace',
		bootstrap: 'bootstrap.min'
	},
	shim: {
		'underscore': {
			exports: '_',
			deps: ['jquery']
		},
		'namespace': {
			deps: ['underscore']
		},
		'backbone': {
			deps: ['jquery', 'underscore', 'bootstrap', 'underscore'],
			exports: 'Backbone'
		}
	}
});

define([
		'backbone',
		'../../../../public/component/button_group.js'
], function(Backbone, View) {
	$(function() {
		var view = new View({
			items: [{
				
			}, {
				
			}]
		});

		$('.container').html(view.render().$el);
	})
})