import type {
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { InferRequestType, InferResponseType } from 'hono';
import type { SuccessStatusCode } from 'hono/utils/http-status';
import type { ApiError } from './error';
import type { HonoClientEndpoint } from './hono';
import type { FilterEmptyObject, SafeOmit } from './types';

import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';

import { generateQueryKey } from './queryKey';
import { safeFetch } from './safeFetch';

export function apiQuery<
  Endpoint extends HonoClientEndpoint,
  Args extends FilterEmptyObject<InferRequestType<Endpoint>>,
  SuccessResponse extends InferResponseType<Endpoint, SuccessStatusCode>,
  Select = SuccessResponse,
>(
  router: { $url: (args: Args) => URL; $get: Endpoint },
  args: Args,
  options: SafeOmit<
    UseQueryOptions<SuccessResponse, ApiError, Select>,
    'queryKey' | 'queryFn'
  > = {},
) {
  const queryKey = generateQueryKey(router.$url, args);

  return queryOptions<SuccessResponse, ApiError, Select>({
    queryKey,
    async queryFn({ signal }) {
      return await safeFetch(router.$get, args, { init: { signal } });
    },
    ...options,
  });
}

export function useApiQuery<
  Endpoint extends HonoClientEndpoint,
  Args extends FilterEmptyObject<InferRequestType<Endpoint>>,
  SuccessResponse extends InferResponseType<Endpoint, SuccessStatusCode>,
  Select = SuccessResponse,
>(
  router: { $url: (args: Args) => URL; $get: HonoClientEndpoint },
  args: Args,
  options: SafeOmit<
    UseQueryOptions<SuccessResponse, ApiError, Select>,
    'queryKey' | 'queryFn'
  > = {},
) {
  return useQuery(apiQuery(router, args, options));
}

export function useApiMutation<
  Endpoint extends HonoClientEndpoint,
  Args extends FilterEmptyObject<InferRequestType<Endpoint>>,
  SuccessResponse extends InferResponseType<Endpoint, SuccessStatusCode>,
>(
  endpoint: Endpoint,
  options: SafeOmit<
    UseMutationOptions<SuccessResponse, ApiError, Args>,
    'mutationFn'
  > = {},
) {
  return useMutation<SuccessResponse, ApiError, Args>({
    async mutationFn(args) {
      return await safeFetch(endpoint, args);
    },
    ...options,
  });
}
