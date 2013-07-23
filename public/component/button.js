define([
	'jquery',
	'underscore',
	'backbone',
	'namespace'],
	function($, _, Backbone, ns){
		ns.define('component');
		component.Button = Backbone.View.extend({
			tagName: 'button',
			className: 'btn',
			initialize: function(){
				this.options.css && this.$el.css(this.options.css);
			},
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
			}
		});
		return component.Button;
	})