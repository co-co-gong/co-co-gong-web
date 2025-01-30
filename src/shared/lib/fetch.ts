export function isFetchSuccess(response: Response) {
  return response.status >= 200 && response.status < 300;
}

export function isFetchError(response: Response) {
  return !(response.status >= 200 && response.status < 300);
}
