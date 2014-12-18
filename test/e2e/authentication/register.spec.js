'use strict';

var cp = require('child_process'),
    h  = require('../../helpers/helpers'),
    db = h.getDb();

describe('register', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean_db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      browser.get('/#/register');
      done();
    });
  });

  it('should get register page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('register');
  });

  it('should register a new user', function(){
    element(by.model('user.username')).sendKeys('sam' + h.random(5000));
    element(by.model('user.password')).sendKeys('456');
    element(by.model('user.avatar')).sendKeys('http://png-1.findicons.com/files/icons/1072/face_avatars/300/i04.png');
    element(by.css('button[ng-click="submit()"]')).click();


    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');

  });
});
