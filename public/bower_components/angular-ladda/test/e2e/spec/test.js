describe('default test', function() {
  beforeEach(function () {
    browser.get('/test.html');
  });

  it('should compile inner text', function() {
    expect(element(by.id('btn')).getText()).toEqual('ladda button');
  });

  it('should exist ladda-label span tag', function() {
    expect(element(by.css('#btn .ladda-label')).isPresent()).toBe(true);
  });

  it('should exist ladda-spinner span tag', function() {
    expect(element(by.css('#btn .ladda-spinner')).isPresent()).toBe(true);
  });

  it('should exist spinner when ladda is true', function() {
    element(by.id('btn')).click();
    browser.sleep(500);
    expect(element(by.css('#btn .ladda-spinner div')).isPresent()).toBe(true);
  });
});
