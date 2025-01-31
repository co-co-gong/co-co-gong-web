import { BaseServerApi } from "./baseServerApi";

class RouteHandlerApi extends BaseServerApi {
  private static instance: RouteHandlerApi;

  private constructor() {
    super(process.env.NEXT_PUBLIC_BASE_API_URL!);
  }

  static getInstance() {
    if (!RouteHandlerApi.instance) {
      RouteHandlerApi.instance = new RouteHandlerApi();
    }
    return RouteHandlerApi.instance;
  }
}

export const routeHandlerApi = RouteHandlerApi.getInstance();
