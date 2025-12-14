import { calculateNetFromGross } from './gross-to-net';
import type { SalaryInput, SalaryResult } from '@/types/salary';

/**
 * Reverse calculation using Binary Search
 */
export function calculateGrossFromNet(input: SalaryInput): SalaryResult {
  const targetNet = input.salary;
  const tolerance = 1000; // 1,000 VND tolerance
  const maxIterations = 50;

  let lowerBound = targetNet;
  let upperBound = targetNet * 2;

  let iteration = 0;
  let result: SalaryResult | null = null;

  while (iteration < maxIterations) {
    const midGross = Math.round((lowerBound + upperBound) / 2);

    const testResult = calculateNetFromGross({
      ...input,
      salary: midGross,
    });

    const difference = testResult.net - targetNet;

    if (Math.abs(difference) <= tolerance) {
      result = testResult;
      break;
    }

    if (difference > 0) {
      upperBound = midGross;
    } else {
      lowerBound = midGross;
    }

    iteration++;
  }

  if (!result) {
    result = calculateNetFromGross({
      ...input,
      salary: upperBound,
    });
  }

  return result;
}
