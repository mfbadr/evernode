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


describe('Users', function(){
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
        done();
      });
    });
  });

  describe('post /register', function(){
    it('should register a new user', function(done){
      var options = {
        method: 'post',
        url: '/register',
        payload: {
          username: 'sam',
          password: '123',
          avatar: 'http://png-1.findicons.com/files/icons/1072/face_avatars/300/i04.png'
        }
      };
      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe('post /login', function(){
    it('should login a user', function(done){
      var options = {
        method: 'post',
        url: '/login',
        payload: {
          username: 'bob',
          password: 'bob'
        }
      };
      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.username).to.equal('bob');
        done();
      });
    });
  });

  describe('delete /logout', function(){
    it('should logout a user', function(done){
      var options = {
        method: 'delete',
        url: '/logout',
        headers:{
          cookie:cookie
        }
      };
      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe('get /status', function(){
    it('should return a user', function(done){
      var options = {
        method: 'get',
        url: '/status',
        headers:{
          cookie:cookie
        }
      };
      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.username).to.equal('bob');
        done();
      });
    });
  });

});
