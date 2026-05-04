import { test } from '@playwright/test';
import { BoardPage } from '../pages/BoardPage';
import { LoginPage } from '../pages/LoginPage';
import { boardScenarios, runtimeConfig } from '../utils/dataLoader';

test.describe('Project board validation', () => {
  for (const scenario of boardScenarios) {
    test(`${scenario.id} - ${scenario.app} - ${scenario.task}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const boardPage = new BoardPage(page);

      await test.step('Login', async () => {
        await loginPage.goto(runtimeConfig.baseUrl);
        await loginPage.login(
          runtimeConfig.credentials.username,
          runtimeConfig.credentials.password,
        );
      });

      await test.step('Open board and verify card', async () => {
        await boardPage.openBoard(scenario.app);
        await boardPage.verifyTask(scenario.column, scenario.task, scenario.tags);
      });
    });
  }
});
