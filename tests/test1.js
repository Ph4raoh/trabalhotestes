describe("Solicitar Segunda Chamada", function () {
  before((browser) => browser.url("http://localhost:3005/"));

  test("Caso de Teste 1(Fluxo Principal)", function (browser) {
    browser
      .waitForElementVisible("body")
      //.assert.titleContains("Ecosia")
      .assert.visible("input[id=matricula]")
      .setValue("input[id=matricula]", "123456")
      .assert.visible("input[id=senha]")
      .setValue("input[id=senha]", "asdfghjkll")
      .assert.visible("input[id=enviar]")
      .click("input[id=enviar]")
      .waitForElementVisible("body")
      .assert.visible("button[id=pirchlep]")
      .click("button[id=pirchlep]")
      .waitForElementVisible("body")
      .assert.visible("input[id=motivo]")
      .setValue("input[id=motivo]", "Estava doente!")
      .assert.visible("input[id=enviar]")
      .click("input[id=enviar]");
  });

  after((browser) => browser.end());
});
