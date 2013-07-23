define([
	'jquery',
	'underscore',
	'backbone',
	'namespace',
	'bootstrap',
], function($, _, Backbone, ns) {
	ns.define('component');
	component.Table = Backbone.View.extend({
		tagName: 'table',
		className: 'table table-striped table-hover table-condensed',
		initialize: function() {
			this.collection.on('reset', function() {
				this.tbody.remove();
				this.createTbody();
			}, this)
		},
		render: function() {
			this.$el.empty();
			this.createThead();
			this.createTbody();
			return this;
		},
		createThead: function() {
			this.thead = new Thead(this.options.htmlTag.thead);
			this.$el.prepend(this.thead.render().$el);
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

	var Thead = Backbone.View.extend({
		tagName: "thead",
		render: function() {
			this.$el.empty();
			if (this.options.htmlTag && this.options.htmlTag.th) {
				this.createTh();
			}
			return this;
		},
		createTh: function() {
			_.each(this.options.htmlTag.th, function(item) {
				this.addOne(item);
			}, this);
		},
		addOne: function(item) {
			var th = new Th(item);
			this.$el.append(th.render().$el);
		}
	});

	var Th = Backbone.View.extend({
		tagName: "th",
		render: function() {
			this.$el.html(this.options.html);
			return this;
		}
	});

	var Tbody = Backbone.View.extend({
		tagName: "tbody",
		initialize: function() {
			this.collection.on('remove', this.remove, this);
			this.collection.on('add', this.add, this);
		},
		render: function() {
			this.$el.empty();
			return this;
		},
		add: function(models) {
			if (models.length > 0) {
				_.each(models, function(model) {
					this.addOne(model)
				}, this);
			} else
				this.addOne(models);
		},
		addOne: function(model) {
			var tr = new Tr({
				model: model,
				htmlTag: this.options.htmlTag.tr.htmlTag
			})
			this.$el.append(tr.render().$el);
		},
		remove: function(models) {
			if (models.length > 0) {
				_.each(models, function(model) {
					this.removeOne(model);
				});
			} else
				this.removeOne(models);
		},
		removeOne: function(model) {

		}
	});

	var Tr = Backbone.View.extend({
		tagName: "tr",
		initialize: function() {
			this.model.on('remove', this.remove, this);
		},
		render: function() {
			this.$el.empty();
			this.add();
			return this;
		},
		add: function() {
			_.each(this.options.htmlTag.td, function(field) {
				this.addOne(field);
			}, this)
		},
		addOne: function(field) {
			if (field)
				field.model = this.model;

			var td = new Td(field);
			this.$el.append(td.render().$el);
		}
	});

	var Td = Backbone.View.extend({
		tagName: "td",
		initialize: function() {
			if (this.options.dataIndex && this.model)
				this.model.on('change:' + this.options.dataIndex, this.render, this);
			else
				this.$el.addClass('nodata');

			if (this.options.events)
				this.events = this.options.events

			if(this.options.render)
				this.render = this.options.render
		},
		render: function() {
			if (this.options.dataIndex && this.model)
				this.$el.html(this.model.get(this.options.dataIndex));

			return this;
		}
	});

	return component.Table;
})