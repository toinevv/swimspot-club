
import { QueryFunction } from '@tanstack/react-query';

/**
 * Utility to create properly typed query functions for React Query
 * that extract arguments from the queryKey
 */
export function createQueryFn<TArgs extends readonly unknown[], TReturn>(
  apiFunction: (...args: TArgs) => Promise<TReturn>
): QueryFunction<TReturn, readonly [string, ...TArgs]> {
  return ({ queryKey }) => {
    const [, ...args] = queryKey;
    return apiFunction(...(args as TArgs));
  };
}

/**
 * Utility for query functions that take no arguments
 */
export function createSimpleQueryFn<TReturn>(
  apiFunction: () => Promise<TReturn>
): QueryFunction<TReturn, readonly [string]> {
  return () => apiFunction();
}

/**
 * Utility for query functions with optional arguments
 */
export function createOptionalQueryFn<TArg, TReturn>(
  apiFunction: (arg?: TArg) => Promise<TReturn>
): QueryFunction<TReturn, readonly [string] | readonly [string, TArg]> {
  return ({ queryKey }) => {
    const [, arg] = queryKey;
    return apiFunction(arg);
  };
}
