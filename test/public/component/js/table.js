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
		'../../../../public/component/table.js'
], function($, _, Backbone, View) {
	$(function() {
		var Model = Backbone.Model.extend({

		});

		var Collection = Backbone.Collection.extend({
			model: Model
		});
		var collection = new Collection();

		var view = new View({
			collection: collection,
			htmlTag: {
				thead: {
					htmlTag: {
						th: [{
								html: "Nomor"
							}, {
								html: "Nama"
							}, {
								html: "Kelas"
							}
						]
					}
				},
				tbody: {
					htmlTag: {
						tr: {
							htmlTag: {
								td: [{
										dataIndex: "No"
									}, {
										dataIndex: "Name"
									}, {
										dataIndex: "Class",
										html: function(model){
											return "test"
										}
									}
								]
							}
						}
					}
				}
			}
		});
		$('.container').html(view.render().$el);

		collection.reset([{
				No: 1,
				Name: "Anggun",
				Class: "3A"
			}, {
				No: 2,
				Name: "Michael",
				Class: "3A"
			}, {
				No: 3,
				Name: "Yuji",
				Class: "3B"
			}
		]);
	});
});