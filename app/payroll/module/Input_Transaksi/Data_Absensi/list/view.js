define([
	'backbone',
	'namespace',
	'text!../../app/payroll/module/Input_Transaksi/Data_Absensi/list/template.html'],
function(Backbone, ns, template) {
	ns.define('module.input_transaksi.data_absensi');
	module.input_transaksi.data_absensi.list = Backbone.View.extend({
		initialize: function() {
			var html = "";
		},
		template: _.template(template),
		render: function() {
			this.$el.html(this.template());
			return this;
		},
		createHighcharts: function(){
			require(['highcharts'], 
			function(){
				this.$('.graph').highcharts({
					chart: {
						type: 'column'
					},
					title:{
						text: 'Grafik Absensi Karyawan Tidak hadir Berdasarkan Tahun Periode 2013'
					},
					xAxis: {
						categories:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
					},
					series:[{
						name:'Tidak Hadir',
						data:[49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
					}]
				});
			});
		}
	});
	return module.input_transaksi.data_absensi.list;
});