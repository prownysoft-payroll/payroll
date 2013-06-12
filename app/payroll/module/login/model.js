define([
	'jquery',
	'underscore',
	'backbone',
	'namespace',
	'model.js',
	'text!../../app/payroll/module/login/template.html'],
function($, _, Backbone, ns) {
	ns.define('payroll.module.login');
	payroll.module.login.model = Backbone.Model.extend({
		url: 'backend.php'
	});
	return payroll.module.login.model;
});