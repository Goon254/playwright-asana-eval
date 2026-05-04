export type BoardName = 'Web Application' | 'Mobile Application';
export type ColumnName = 'To Do' | 'In Progress' | 'Done';
export type CardTag = 'Feature' | 'Bug' | 'Design' | 'High Priority';

export interface Credentials {
  username: string;
  password: string;
}

export interface RuntimeConfig {
  baseUrl: string;
  credentials: Credentials;
}

export interface BoardScenario {
  id: string;
  app: BoardName;
  task: string;
  column: ColumnName;
  tags: CardTag[];
}
