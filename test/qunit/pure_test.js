module("Pure Template Controller");

$.Controller.Pure.extend("TestAutoRenderPureController", 
{
  defaultData: { "panda": "bears" },
  
  dataRefresher: function() {
    this.setData({ "refreshed": "data" });
  }
},
{
});

TestAutoRenderPureController.extend("TestAutoloadPureController", 
{
  autoload: true
},
{
});

$.Controller.Pure.extend("TestDirectivePureController", 
{
  directive: {
    "a": "name"
  }
},
{
});

test("Should use autoRender", function(){
  var testElement = $(".name").hide().test_auto_render_pure();
  testElement.controller().setData({ name: "My Name" });
  stop();
  
  setTimeout(function() {
    start();
    equals($(".name").text(), "My Name");
  }, 50);
});

asyncTest("Should use render with directive", function(){
  var testElement = $(".directive").hide().test_directive_pure();
  testElement.controller().setData({ name: "My Name" });
  
  stop();
  
  setTimeout(function() {
    start();
    equals($(".directive a").text(), "My Name");
  }, 50);
});

asyncTest("Should use defaultData", function(){
  var testElement = $("#panda").hide().test_auto_render_pure();
  testElement.trigger("dataChanged");
  
  stop();
  
  setTimeout(function() {
    start();
    equals($("#panda").text(), "bears");
  }, 50);
});

asyncTest("Should use options.data", function(){
  var testElement = $("#panda2").hide().test_auto_render_pure({ "data": { "panda" : "wolves" }});
  testElement.trigger("dataChanged");
  
  stop();
  
  setTimeout(function() {
    start();
    equals($("#panda2").text(), "wolves");
  }, 50);
});

asyncTest("Should use dataRefresher", function(){
  var testElement = $("#refreshed").hide().test_auto_render_pure();
  testElement.controller().refresh();
  
  stop();
  
  setTimeout(function() {
    start();
    equals($("#refreshed").text(), "data");
  }, 50);
});

asyncTest("Should use options.dataRefresher", function(){
  var testElement = $("#refreshed2").hide().test_auto_render_pure({
    dataRefresher: function() {
      this.setData({ "refreshed": "data2" });
    }
  });
  testElement.controller().refresh();
  
  stop();
  
  setTimeout(function() {
    start();
    equals($("#refreshed2").text(), "data2");
  }, 50);
});

asyncTest("Should use autoload", function(){
  var testElement = $("#autoload").hide().test_autoload_pure();
  
  stop();
  
  setTimeout(function() {
    start();
    equals($("#autoload").text(), "data");
  }, 50);
});

asyncTest("Should use options.autoload", function(){
  var testElement = $("#autoload2").hide().test_auto_render_pure({
    autoload: true
  });
  
  stop();
  
  setTimeout(function() {
    start();
    equals($("#autoload2").text(), "data");
  }, 50);
});
