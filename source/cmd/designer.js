var $ = require('jquery')
var _ = require('lodash')
var dataExchange = require('../util/dataExchange')

var CurrentFullJson;

module.exports = {
    load: function (arg0, callback){
        if(typeof arg0 === 'string'){
            var layoutId = arg0;
            $.ajax({
              url: "./test/mock/layouts/layout"+layoutId+".json"
            }).done(function(allJson) {
                CurrentFullJson = _.clone(allJson, true);
                callback(allJson);
            });            
        }else{
            var allJson = arg0;
            CurrentFullJson = _.clone(allJson, true);
            callback(allJson);
        }
    },
    deleteNode: function(uuid){

    },
    createNode: function(){
        
    }
}