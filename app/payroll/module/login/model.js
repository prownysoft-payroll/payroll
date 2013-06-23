define([
		'backbone',
		'namespace',
], function(Backbone, ns, Model) {
	ns.define('payroll.module.login');
	payroll.module.login.Model = Backbone.Model.extend({
		url: URL_SERVER + "login"
	});
	return payroll.module.login.Model;
});