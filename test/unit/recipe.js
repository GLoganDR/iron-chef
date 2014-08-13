/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Recipe    = require('../../app/models/recipe'),
    dbConnect = require('../../app/lib/mongodb'),
    Mongo     = require('mongodb'),
    cp        = require('child_process'),
    db        = 'template-test';

describe('Recipe', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Recipe object', function(){
      var o = {name:'Carrots', photo:'carrots.jpg', ingredients:'carrots,water,pepper', directions:'1. Dice Carrots 2. Put in boiling water 3. Add pepper'},
          r = new Recipe(o);
      expect(r).to.be.instanceof(Recipe);
      expect(r.name).to.equal('Carrots');
      expect(r.photo).to.equal('carrots.jpg');
    });
  });

  describe('.create', function(){
    it('should save a new Recipe', function(done){
      Recipe.create({name:'Carrots', photo:'carrots.jpg', ingredients:'carrots,water,pepper', directions:'1. Dice Carrots 2. Put in boiling water 3. Add pepper'}, function(err, recipe){
        expect(recipe._id).to.be.instanceof(Mongo.ObjectID);
        expect(recipe).to.be.instanceof(Recipe);
        expect(recipe.name).to.equal('Carrots');
        expect(recipe.photo).to.equal('carrots.jpg');
        expect(recipe.ingredients).to.have.length(3);
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all recipes', function(done){
      Recipe.all(function(err, recipes){
        expect(recipes).to.have.length(2);
        done();
      });
    });
  });
});
