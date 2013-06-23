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
		'jquery',
		'underscore',
		'backbone',
		'../../../../public/component/button.js'
], function($, _, Backbone, View) {
	$(function(){
		var Model = Backbone.Model.extend({

		});
		var model = new Model();

		var view = new View({
			model: model,
			html: "test"
		});

		$('.container').html(view.render().$el);
		view.changeColor('warning');
		view.changeSize('small');
	})
})