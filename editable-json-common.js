Meteor.methods({
  
  editableJSON_update: function (collectionName, _id, action) {

    check(collectionName, String);
	check(_id, String);
	check(action, Object);
    
    var Collection = Mongo.Collection.get(collectionName);
    var updated = 0;
    
    try {
    
      if (!!Package['aldeed:simple-schema'] && !!Package['aldeed:collection2'] && _.isFunction(Collection.simpleSchema) && Collection._c2) {
        
        updated = Collection.update(_id, action, {
          filter: false,
          autoConvert: false,
          removeEmptyStrings: false,
          validate: false
        });
      
      }
      
      else {
      
        updated = Collection.update(_id, action);
    
      }
      
    }
    
    catch (err) {
      if (!(Meteor.isClient && action.$set && _.keys(action.$set)[0].indexOf('newField') > -1)) {
        throw new Meteor.Error(err);
      }
    }
	
    return updated;
      
  }
  
});