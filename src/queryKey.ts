import type { FilterEmptyObject } from './types';

export function generateQueryKey<Endpoint extends (args: any) => URL>(
  endpoint: Endpoint,
  args: Endpoint extends (args: infer A) => URL ? FilterEmptyObject<A> : never,
) {
  const url = endpoint(args);
  const keys = url.pathname.split('/');
  return ['api', 'get', ...keys];
}
