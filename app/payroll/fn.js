define([
		'jquery',
		'namespace',
		'bootbox'
], function($, ns) {
	ns.define('payroll');
	payroll.fn = {
		loadMenu: function(){
			$.ajax({
				url: URL_SERVER + 'menu',
				success: function(data) {

					require(["menu"],
					function(Menu) {
						var menu = new Menu();
						menu.model.set(data);
						$('body').empty();
						$('body').html("\
							<div class='navbar navbar-fixed-top'>\
        						<div class='navbar-inner'>\
            						<div class='container'>\
            						</div>\
            					</div>\
            				</div>");
						$('.container').html(menu.render().$el);
					});
				},
				error: function(xhr, status, error) {
					var data = JSON.parse(xhr.responseText);
					bootbox.alert(typeof data == "object" ? data.message : ERROR_SERVER);
				}
			});
		}
	};
	return payroll.fn;
});