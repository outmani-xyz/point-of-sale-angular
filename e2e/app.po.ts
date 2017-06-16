import { browser, element, by } from 'protractor';

export class NgPosPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('pos-root h1')).getText();
  }
}
