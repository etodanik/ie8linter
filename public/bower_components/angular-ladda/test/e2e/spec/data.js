describe('data-ladda case test', function() {
  beforeEach(function () {
    browser.get('/data.html');
  });

  it('should compile inner text', function() {
    expect(element(by.id('btn')).getText()).toEqual('ladda button');
  });
});
