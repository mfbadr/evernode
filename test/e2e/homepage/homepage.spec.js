'use strict';

describe('homepage', function(){
  it('should get the homepage', function(){
    browser.get('/');
    expect(browser.getTitle()).toEqual('NoteTaker');
  });
});
