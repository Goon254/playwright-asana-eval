import config from '../data/config.json';
import scenarios from '../data/test-cases.json';
import type { BoardScenario, RuntimeConfig } from '../types/board';

export const runtimeConfig = config as RuntimeConfig;
export const boardScenarios = scenarios as BoardScenario[];
