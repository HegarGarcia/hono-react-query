import type { ClientRequestOptions } from 'hono';
import type { ClientResponse } from 'hono/client';
import type { StatusCode } from 'hono/utils/http-status';

export type HonoClientEndpoint = (
  args: any,
  options?: ClientRequestOptions,
) => Promise<ClientResponse<any, StatusCode, 'json'>>;
