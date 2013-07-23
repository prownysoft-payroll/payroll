
define([
	'jquery',
	'underscore',
	'backbone',
	'namespace'],
	function($, _, Backbone, ns){
		ns.define('component');
		component.Input = Backbone.View.extend({
			tagName: 'input',
			initialize: function(){
				if(!(this.$el.attr && this.$el.attr.type))
					this.$el.attr({'type':'text'});
				if(this.options.attr)
					this.$el.attr(this.options.attr);
			},
			events:{
				'change': 'setModelValue'
			},
			render: function(){
				if(this.model && this.options.dataIndex)
					this.$el.val(this.model.get(this.options.dataIndex));
				return this;
			},
			setModelValue: function(){

			}
		});
		return component.Input;
	})