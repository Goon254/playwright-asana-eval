import { expect, Locator, Page } from '@playwright/test';
import type { BoardName, CardTag, ColumnName } from '../types/board';

export class BoardPage {
  constructor(private readonly page: Page) {}

  async openBoard(boardName: BoardName): Promise<void> {
    const entry = this.page.getByRole('button', { name: boardName });
    await expect(entry).toBeVisible();
    await entry.click();
  }

  private columnHeadingPattern(columnName: ColumnName): RegExp {
    const escaped = columnName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^${escaped}\\b`);
  }

  /** Column container: board uses divs; headings are e.g. "To Do (2)", not exact "To Do". */
  private column(columnName: ColumnName): Locator {
    const heading = this.page
      .locator('main')
      .getByRole('heading', { name: this.columnHeadingPattern(columnName) });
    return heading.locator('..');
  }

  private cardInColumn(columnName: ColumnName, taskName: string): Locator {
    const col = this.column(columnName);
    return col.getByRole('heading', { level: 3, name: taskName, exact: true }).locator('..');
  }

  async expectTaskInColumn(columnName: ColumnName, taskName: string): Promise<Locator> {
    const card = this.cardInColumn(columnName, taskName);
    await expect(card).toBeVisible();
    await expect(card.getByRole('heading', { level: 3, name: taskName, exact: true })).toBeVisible();
    return card;
  }

  async expectCardTags(card: Locator, tags: CardTag[]): Promise<void> {
    for (const tag of tags) {
      await expect(card.getByText(tag, { exact: true })).toBeVisible();
    }
  }

  async verifyTask(columnName: ColumnName, taskName: string, tags: CardTag[]): Promise<void> {
    const card = await this.expectTaskInColumn(columnName, taskName);
    await this.expectCardTags(card, tags);
  }
}
