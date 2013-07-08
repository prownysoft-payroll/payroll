define([
		'underscore',
		'backbone',
		'namespace',
		'model.js'
], function(_, Backbone, ns,Model){
	ns.define('module.management_user');
	module.management_user.Collection = Backbone.Collection.extend({
		url: URL_SERVER + "/manajemen_user/lists",
		model: Model
	});
	return module.management_user.Collection
})