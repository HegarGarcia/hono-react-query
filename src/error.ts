export class ApiError extends Error {
  constructor(
    public reason: 'network-error' | 'unsuccessful-response' | 'failed-parsing',
    public response: Response | undefined,
  ) {
    super(reason);
  }
}
