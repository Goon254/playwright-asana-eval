import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(baseUrl: string): Promise<void> {
    await this.page.goto(baseUrl);
    await expect(this.page.getByRole('heading', { name: 'Project Board Login' })).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await expect(this.page.getByRole('heading', { name: 'Project Board Login' })).toBeHidden({
      timeout: 15_000,
    });
  }
}
