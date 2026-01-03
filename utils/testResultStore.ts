
export type TestResult = {
  title: string;
  status: 'Pass' | 'Fail';
};

export const testResults: TestResult[] = [];

export function addTestResult(result: TestResult) {
  testResults.push(result);
}
