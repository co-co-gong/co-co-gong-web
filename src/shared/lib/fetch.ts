interface FetchResponse {
  status: number;
}

export function isFetchSuccess(response: FetchResponse) {
  return response.status >= 200 && response.status < 300;
}

export function isFetchError(response: FetchResponse) {
  return !(response.status >= 200 && response.status < 300);
}
