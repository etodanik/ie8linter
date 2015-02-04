describe('config test', function() {
  beforeEach(function () {
    browser.get('/config.html');
  });

  it('change default style to expand-left', function() {
    expect(element(by.id('btn')).getAttribute('data-style')).toEqual('expand-left');
  });
});
