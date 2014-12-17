/* jshint expr:true */

'use strict';

var expect       = require('chai').expect,
    //User         = require('../../server/models/user'),
    cp           = require('child_process'),
    server       = require('../../server/index'),
    Lab          = require('lab'),
    lab          = exports.lab = Lab.script(),
    describe     = lab.describe,
    helpers       = require('../helpers/helpers'),
    db            = helpers.getDb(),
    //before       = lab.before,
    beforeEach   = lab.beforeEach,
    it           = lab.it;


describe('Notes', function(){
  var cookie;
  //before(function(done){
  //});

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean_db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      //console.log('stdout' ,stdout);
      //console.log('stderr', stderr);

      var options = {
        method: 'post',
        url: '/login',
        payload: {
          username: 'bob',
          password: 'bob'
        }
      };
      server.inject(options, function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        //
            var options = {
              method: 'post',
              url: '/notes',
              payload: {
                title: 'note1',
                body: 'here is the note body',
                tags: 'a,b,c'
              },
              headers:{
                cookie:cookie
              }
            };
            server.inject(options, function(response){
              expect(response.result.noteId).to.be.ok;
              expect(response.statusCode).to.equal(200);
              done();
            });
        //
      });
    });
  });

  describe('post /notes', function(){
    it('should make a new note', function(done){
      var options = {
        method: 'post',
        url: '/notes',
        payload: {
          title: 'note1',
          body: 'here is the note body',
          tags: 'a,b,c'
        },
        headers:{
          cookie:cookie
        }
      };
      server.inject(options, function(response){
        expect(response.result.noteId).to.be.ok;
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  //get notes
  describe('get /notes', function(){
    it('should return all notes for the user', function(done){
      var options = {
        method: 'get',
        url: '/notes',
        headers:{
          cookie:cookie
        }
      };
      server.inject(options, function(response){
        console.log(response);
        expect(response.result.notes).to.be.ok;
        expect(response.result.notes).to.have.length(1);
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  //get notes/noteid
  /*
  describe('get /notes/{noteid}', function(){
    it('should return a single populated note', function(done){
      var options = {
        method: 'get',
        url: '/notes/1',
        headers:{
          cookie:cookie
        }
      };
      server.inject(options, function(response){
        console.log(response.result);
        expect(response.result).to.be.ok;
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  */

  //post notes id upload
  //post notes/noteid/upload mobile
  //delete notes/noteid
  //get notes/count
});
