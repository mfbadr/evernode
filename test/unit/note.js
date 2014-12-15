/* jshint expr:true */

'use strict';

var expect       = require('chai').expect,
    Note         = require('../../server/models/note'),
    cp           = require('child_process'),
    Lab          = require('lab'),
    lab          = exports.lab = Lab.script(),
    describe     = lab.describe,
    helpers       = require('../helpers/helpers'),
    db            = helpers.getDb(),
    //before       = lab.before,
    beforeEach   = lab.beforeEach,
    it           = lab.it;


describe('Note', function(){
  //before(function(done){
  //});

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean_db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a Note object', function(done){
      var note = new Note();
      expect(note).to.be.instanceof(Note);
      done();
    });
  });

});

