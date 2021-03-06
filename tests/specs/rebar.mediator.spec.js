describe("mediator",function(){

	var dispatcher = _.clone(Backbone.Events);

	beforeEach(function(){
	});

	afterEach(function(){
	});

	it("initializes",function(){
		var mediator = new Mediator();
		expect(mediator.on).toBeDefined();
		expect(mediator._views).toBeDefined();
	});

	it("extends",function(){
		var CustomMediator = Mediator.extend({
			foo:function(){
				// ...
			}
		});
		var mediator = new CustomMediator();
		expect(mediator.on).toBeDefined();
		expect(mediator._views).toBeDefined();
		expect(mediator.foo).toBeDefined();
	});

	it("can attach events from single dispatcher",function(){
		var flag = false;
		var mediator = new Mediator({
			dispatcher:dispatcher,
			events:{
				"foo":"bar"
			},
			bar:function(){
				flag = true;
			}
		});
		dispatcher.trigger("foo");
		expect(flag).toBeTruthy();
	});

	it("can attach events from multiple dispatchers",function(){
		var flag = false;
		var mediator = new Mediator({
			events:{
				"foo":{
					dispatcher:dispatcher,
					callback:"bar"
				}
			},
			bar:function(){
				flag = true;
			}
		});
		dispatcher.trigger("foo");
		expect(flag).toBeTruthy();
	});

	it("can add views",function(){

		var flag = false;

		var mediator = new Mediator({
			handle:function(eventName, view, options) {
				if(eventName === "foo") {
					flag = true;
				}
			}
		});

		var view = new Backbone.View();
		mediator.addView(view,"foo");
		view.trigger("foo");

		expect(mediator._views.length).toEqual(1);
		expect(flag).toBeTruthy();
	});

	it("can remove views",function(){
		var mediator = new Mediator();
		var view = new Backbone.View();
		mediator.addView(view,"foo");
		mediator.removeView(view);
		expect(mediator._views.length).toEqual(0);
	});

	it("can get view",function(){
		var mediator = new Mediator();
		var view = new Backbone.View({
			name:"foo"
		});
		mediator.addView(view);
		var lookup = mediator.getView({name:"foo"});
		expect(lookup).toBeDefined();
		expect(lookup.cid).toEqual(view.cid);
	});

	it("can get view by name",function(){
		var mediator = new Mediator();
		var view = new Backbone.View({
			name:"foo"
		});
		mediator.addView(view);
		var lookup = mediator.getViewByName("foo");
		expect(lookup).toBeDefined();
		expect(lookup.cid).toEqual(view.cid);
	});

	it("can check for contained views",function(){
		var mediator = new Mediator();
		var view = new Backbone.View();
		mediator.addView(view,"foo");
		expect(mediator.hasView(view)).toBeTruthy();
	});

	it("with config view",function(){
		var flag = false;
		var view = new View();
		var mediator = new Mediator({
			view:view,
			initialize:function(){
				this.view.on("foo",function(){
					flag = true;
				},this);
			}
		});
		view.trigger("foo");
		expect(flag).toBeTruthy();
	});

	it("with config view and config view events",function(){
		var flag = false;
		var view = new View();
		var mediator = new Mediator({
			view:view,
			viewEvents:"foo",
			handle:function(event,view,options){
				flag = true;
			}
		});
		view.trigger("foo");
		expect(flag).toBeTruthy();
	});

});