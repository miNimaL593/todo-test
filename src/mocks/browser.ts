
import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';
import {startDatabaseMigration} from "./migration.ts";


setTimeout(startDatabaseMigration)

export const worker = setupWorker(...handlers);