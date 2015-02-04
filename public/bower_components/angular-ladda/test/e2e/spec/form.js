describe('duplicate compile test', function() {
  beforeEach(function () {
    browser.get('/form.html');
  });

  it('should msg element is only one', function() {
    expect(element.all(by.className('help-block')).count()).toEqual(1);
  });
});
