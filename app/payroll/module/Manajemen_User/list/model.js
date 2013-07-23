define([
	'underscore',
	'backbone',
	'namespace'
	], function(_, Backbone, ns){
		ns.define('module.management_user');
		module.management_user.model = Backbone.Model.extend({
			urlRoot: URL_SERVER + "manajemen_user/lists",
		});
		return module.management_user.model;
	})