import type { Page } from '@playwright/test';

export class HomePage {
  readonly getStartedLink;

  constructor(private readonly page: Page) {
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }
}