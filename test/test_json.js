var dataExchange = require('../source/util/dataExchange')

describe("JSON 格式转换", function() {
   it("Case0", function() {
    var rkJson = require("./mock/layouts/layout0.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
  it("Case1", function() {
    var rkJson = require("./mock/layouts/layout1.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
  it("Case2", function() {
    var rkJson = require("./mock/layouts/layout2.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
  it("Case3", function() {
    var rkJson = require("./mock/layouts/layout3.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
  it("Case4", function() {
    var rkJson = require("./mock/layouts/layout4.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
  it("Case5", function() {
    var rkJson = require("./mock/layouts/layout5.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
  it("Case6", function() {
    var rkJson = require("./mock/layouts/layout6.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });


   it("CaseDecorate0", function() {
    var rkJson = require("./mock/layouts/layout0.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson, true);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
  it("CaseDecorate1", function() {
    var rkJson = require("./mock/layouts/layout1.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson, true);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
  it("CaseDecorate2", function() {
    var rkJson = require("./mock/layouts/layout2.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson, true);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
  it("CaseDecorate3", function() {
    var rkJson = require("./mock/layouts/layout3.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson, true);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
  it("CaseDecorate4", function() {
    var rkJson = require("./mock/layouts/layout4.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson, true);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
  it("CaseDecorate5", function() {
    var rkJson = require("./mock/layouts/layout5.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson, true);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
  it("CaseDecorate6", function() {
    var rkJson = require("./mock/layouts/layout6.json");
    
    var rkJson1 = JSON.parse(JSON.stringify(rkJson))
    //rk to tree
    var treeJson = dataExchange.rk2tree(rkJson, true);
    //tree to rk
    var rkJson2 = dataExchange.tree2rk(treeJson);
    //expect:
    expect(rkJson1.config.layout).toEqual(rkJson2.config.layout);        

  });
});