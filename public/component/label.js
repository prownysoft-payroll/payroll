define([
		'jquery',
		'underscore',
		'backbone',
		'namespace',
	],
	function($, _, Backbone, ns) {
		ns.define('component');
		component.Label = Backbone.View.extend({
			tagName: 'label',
			render: function(){
				this.$el.empty();
				if (this.options.viewPrepend){
					this.$el.prepend(this.options.viewPrepend());
				}

				this.$el.append(this.options.text || '');

				if (this.options.viewAppend){
					this.$el.append(this.options.viewAppend())
				}
				return this;
			}
		});

		return component.Label;
	});