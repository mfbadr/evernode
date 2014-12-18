'use strict';

var cp   = require('child_process'),
    h    = require('../../helpers/helpers'),
    path = require('path'),
    db   = h.getDb();

describe('notes list', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean_db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      login();
      done();
    });
  });

  it('should get the notes page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('notes');
  });

  it('should create a note', function(){
    var image = path.resolve(__dirname, '../../fixures/avatar.png');
    console.log(image);
    element(by.css('input[type="file"]')).sendKeys(image);

    // h.debug('red');
    element(by.model('note.title')).sendKeys('note title');
    element(by.model('note.body')).sendKeys('note body');
    element(by.model('note.tags')).sendKeys('a,b,c');
    // h.debug('blue');
    element(by.css('button[ng-click="create(note)"]')).click();

    expect(element(by.model('note.title')).getAttribute('value')).toEqual('');
    expect(element(by.model('note.body')).getAttribute('value')).toEqual('');
    expect(element(by.model('note.tags')).getAttribute('value')).toEqual('');
  });

});

function login(){
  browser.get('/#/login');
  element(by.model('user.username')).sendKeys('bob');
  element(by.model('user.password')).sendKeys('bob');
  element(by.css('button[ng-click="submit()"]')).click();
  browser.get('/#/notes');
}
