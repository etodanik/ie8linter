describe('Double curly binding test', function() {
  beforeEach(function () {
    browser.get('/binding.html');
  });

  it('should compile binding', function() {
    expect(element(by.css('#loader1 .ladda-spinner div')).isPresent()).toBe(true);
  });
});
