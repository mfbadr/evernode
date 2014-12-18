'use strict';

var cp = require('child_process'),
    h  = require('../../helpers/helpers'),
    db = h.getDb();

describe('register', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean_db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  it('should get register page', function(){
    browser.get('/#/register');
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('register');
  });
});
