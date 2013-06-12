define(['backbone', 'namespace','underscore'], function(Backbone, ns, _) {
	ns.define('payroll');
	payroll.eventAggregator = payroll.eventAggregator || _.extend({}, Backbone.Events);
	return payroll.eventAggregator;
});