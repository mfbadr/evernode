'use strict';

var cp = require('child_process'),
    h  = require('../../helpers/helpers'),
    db = h.getDb();

describe('logout', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean_db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      browser.get('/#/login');
      done();
    });
  });

  it('should logout an existing user', function(){
    browser.get('/#/login');
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('bob');
    element(by.css('button[ng-click="submit()"]')).click();
    expect(element(by.css('a[ui-sref="notes.list"]')).isDisplayed()).toBeTruthy();

    element(by.id('avatarlink')).click();

    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('home');
    expect(element(by.css('a[ui-sref="notes.list"]')).isDisplayed()).toBeFalsy();
  });

});
