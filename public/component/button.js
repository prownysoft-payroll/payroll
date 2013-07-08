define([
	'jquery',
	'underscore',
	'backbone',
	'namespace'],
	function($, _, Backbone, ns){
		ns.define('component');
		component.button = Backbone.View.extend({
			tagName: 'button',
			className: 'btn',
			events:{
				'click': "click"
			},
			render: function(){
				var html = (typeof this.options.html == "function" && this.options.html(this.model, this) ) || this.options.html;
				this.$el.html(html);
				return this;
			},
			click: function(){
				this.options.eventClick && this.options.eventClick(this.model, this);
			},
			changeColor: function(name){
				var classes = ["primary", "info", "success", "warning", "danger", "inverse", "link"]
				this.removeClass(classes, 'btn-');
				this.changeClass(classes, 'btn-', name);
			},
			changeSize: function(name){
				var classes = ["large", "small", "mini"];
				this.removeClass(classes, 'btn-');
				this.changeClass(classes, 'btn-', name);
			},
			changeClass: function(classes, prefix, name){
				var ketemu = _.find(classes, function(cls){
					return cls == name;
				}, this);
				ketemu && this.$el.addClass('btn-'+name)
			},
			removeClass: function(classes, prefix){
				_.each(classes, function(cls){
					this.$el.removeClass(prefix+cls);
				}, this)
			}
		});
		return component.button;
	})