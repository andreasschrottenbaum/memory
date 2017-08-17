import { Memory2Page } from './app.po';

describe('memory2 App', () => {
  let page: Memory2Page;

  beforeEach(() => {
    page = new Memory2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
