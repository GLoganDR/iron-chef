'use strict';

var Mongo = require('mongodb');

function Recipe(o){
  strip(o);
  this.name = o.name || 'Generic Recipe';
  this.photo = o.photo || 'http://www.joyfulbelly.com/Ayurveda/images/recipe_book.gif';
  this.ingredients = o.ingredients || 'Food, Water, Bacon';
  this.ingredients = this.ingredients.split(',').map(function(i){return i.trim();});
  this.directions = o.directions || 'Clean Kitchen, Get Food, Cook, Eat';
  this.directions = this.directions.split(',').map(function(i){return i.trim();});
  this.date = new Date();
  this.category = o.category;
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.create = function(o, cb){
  var r = new Recipe(o);
  Recipe.collection.save(r, cb);
};

Recipe.all = function(cb){ //add sort here//
  Recipe.collection.find().sort({date:-1}).toArray(cb);
};

Recipe.destroy = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Recipe.collection.remove({_id:_id}, cb);
};

module.exports = Recipe;

// Private Functions //
function strip(o){
  //stripping leading and following spaces from all properties inside of object that are strings//
  var properties = Object.keys(o);
  properties.forEach(function(property){
    if(typeof o[property] === 'string'){
      o[property] = o[property].trim();
    }
  });
}
