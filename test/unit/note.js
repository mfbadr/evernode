/* jshint expr:true */

'use strict';

var expect       = require('chai').expect,
    Note         = require('../../server/models/note'),
    cp           = require('child_process'),
    Lab          = require('lab'),
    lab          = exports.lab = Lab.script(),
    describe     = lab.describe,
    helpers      = require('../helpers/helpers'),
    db           = helpers.getDb(),
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
  describe('.create', function(){
    it('should create a new note and save to db', function(done){
      var u = {id: 1},
          n = {title: 'here is a note', body: 'note body', tags: 'a,b,c'};
      Note.create(u, n, function(err, noteId){
        expect(err).to.not.be.ok;
        expect(noteId).to.be.ok;
        done();
      });
    });
  });
  describe('.count', function(){
    it('should count the notes belonging to a certain user', function(done){
      var u = {id: 1};
      Note.count(u, function(err, count){
        expect(err).to.not.be.ok;
        expect(count).to.equal('1');
        done();
      });
    });
  });

});

