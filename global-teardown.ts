import { testResults } from './utils/testResultStore.js';
import { updateSheet } from './sheetUpdate.js';

export default async function globalTeardown() {
  if (testResults.length === 0) {
    console.warn('No test results to update.');
    return;
  }


}
