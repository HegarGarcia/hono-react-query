import type { ClientRequestOptions } from 'hono';
import type {
  ClientResponse,
  InferRequestType,
  InferResponseType,
} from 'hono/client';
import type { StatusCode, SuccessStatusCode } from 'hono/utils/http-status';
import type { HonoClientEndpoint } from './hono';
import type { FilterEmptyObject } from './types';

import { ApiError } from './error';

export async function safeFetch<
  Endpoint extends HonoClientEndpoint,
  SuccessResponse = InferResponseType<Endpoint, SuccessStatusCode>,
>(
  endpoint: Endpoint,
  args: FilterEmptyObject<InferRequestType<Endpoint>>,
  options?: ClientRequestOptions,
) {
  let response: ClientResponse<SuccessResponse, StatusCode, 'json'>;

  try {
    response = (await endpoint(args, options)) as ClientResponse<
      SuccessResponse,
      StatusCode,
      'json'
    >;
  } catch {
    throw new ApiError('network-error', undefined);
  }

  if (!response.ok) {
    throw new ApiError('unsuccessful-response', response);
  }

  try {
    return await response.json();
  } catch {
    throw new ApiError('unsuccessful-response', response);
  }
}
