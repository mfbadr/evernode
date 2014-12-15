/* jshint expr:true */

'use strict';

var expect       = require('chai').expect,
    User         = require('../../server/models/user'),
    cp           = require('child_process'),
    Lab          = require('lab'),
    lab          = exports.lab = Lab.script(),
    describe     = lab.describe,
    helpers       = require('../helpers/helpers'),
    db            = helpers.getDb(),
    //before       = lab.before,
    beforeEach   = lab.beforeEach,
    it           = lab.it;


describe('User', function(){
  //before(function(done){
  //});

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean_db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      //console.log('stdout' ,stdout);
      //console.log('stderr', stderr);
      done();
    });
  });

  describe('constructor', function(){
    it('should create a User object', function(done){
      var user = new User({username:'bob'});
      expect(user).to.be.instanceof(User);
      expect(user.username).to.equal('bob');
      done();
    });
  });
  describe('.register', function(){
    it('should register a new user', function(done){
      User.register({username:'joe', password:'bob', avatar:'http://png-1.findicons.com/files/icons/1072/face_avatars/300/i04.png'}, function(err){
        expect(err).to.be.null;
        done();
      });
    });
    it('should NOT register a new user - duplicate username', function(done){
      User.register({username:'bob', password:'bob', avatar:'http://png-1.findicons.com/files/icons/1072/face_avatars/300/i04.png'}, function(err){
        expect(err).to.be.ok;
        done();
      });
    });
  });
  describe('.login', function(){
    it('should login a new user', function(done){
      User.login({username:'bob', password:'bob'}, function(user){
        expect(user.username).to.equal('bob');
        done();
      });
    });
    it('should NOT login - bad password', function(done){
      User.login({username:'bob', password:'notbob'}, function(user){
        expect(user).to.be.undefined;
        done();
      });
    });
    it('should NOT login - bad username', function(done){
      User.login({username:'bob2', password:'bob'}, function(user){
        expect(user).to.be.undefined;
        done();
      });
    });
  });
});

