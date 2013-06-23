define([
		'jquery',
		'underscore',
		'backbone',
		'namespace'
], function($, _, Backbone, ns) {
	ns.define('component');
	component.table = Backbone.View.extend({
		tagName: 'table',
		render: function() {
			this.$el.empty();
			this.createThead();
			this.createTbody();
			return this;
		},
		createThead: function() {
			this.thead = new Thead(this.options.htmlTag.thead);
			this.$el.append(this.thead.render().$el);
		},
		createTbody: function() {
			this.tbody = new Tbody({
				collection: this.collection,
				htmlTag: this.options.htmlTag.tbody.htmlTag
			});
			this.$el.append(this.tbody.render().$el)
		},
		emptyTable: function() {
			this.$el.empty();
		}
	});

	Thead = Backbone.View.extend({
		tagName: "thead",
		render: function() {
			this.$el.empty();
			if(this.options.htmlTag && this.options.htmlTag.th)
			{
				this.createTh();
			}
			return this;
		},
		createTh: function() {
			_.each(this.options.htmlTag.th, function(item){
				this.addOne(item);
			}, this);
		},
		addOne: function(item) {
			var th = new Th(item);
			this.$el.append(th.render().$el);
		}
	});

	Th = Backbone.View.extend({
		tagName: "th",
		render: function() {
			this.$el.html(this.options.html);
			return this;
		}
	});

	Tbody = Backbone.View.extend({
		tagName: "tbody",
		initialize: function(){
			this.collection.on('reset', this.render, this);
			this.collection.on('remove', this.remove, this);
			this.collection.on('add', this.add, this);
		},
		render: function() {
			this.$el.empty();
			this.add(this.collection.models)
			return this;
		},
		add: function(models){
			_.each(models, function(model){
				this.addOne(model)
			}, this);
		},
		addOne: function(model){
			var tr = new Tr({
				model: model,
				htmlTag: this.options.htmlTag.tr.htmlTag
			})
			this.$el.append(tr.render().$el);
		},
		remove: function(models){

		},
		removeOne: function(model){

		}
	});

	Tr = Backbone.View.extend({
		tagName: "tr",
		render: function() {
			this.$el.empty();
			this.add();
			return this;
		},
		add: function(){
			_.each(this.options.htmlTag.td, function(field){
				this.addOne(field);
			}, this)
		},
		addOne: function(field){
			field.model = this.model;
			var td = new Td(field)
			this.$el.append(td.render().$el);
		}
	});

	Td = Backbone.View.extend({
		tagName: "td",
		initialize: function(){
			this.model.on('change:'+this.options.dataIndex, this.render, this);
		},
		render: function() {
			this.$el.html(this.model.get(this.options.dataIndex));
			return this;
		}
	});

	return component.table;
})