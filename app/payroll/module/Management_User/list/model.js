define([
	'underscore',
	'backbone',
	'namespace'
	], function(_, Backbone, ns){
		ns.define('module.management_user');
		module.management_user.model = Backbone.Model.extend({
			urlRoot: '/module/management_user/crud.php'
		});
		return module.management_user.model;
	})