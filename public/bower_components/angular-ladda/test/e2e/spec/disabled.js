describe('ng-disabled test', function() {
  beforeEach(function () {
    browser.get('/disabled.html');
  });

  it('should compile ng-disabled attribute', function() {
    expect(element(by.id('btn')).getAttribute('disabled')).not.toBe(null);
  });
});
