import { BaseServerApi } from "./baseServerApi";

class ApiServer extends BaseServerApi {
  private static instance: ApiServer;

  private constructor() {
    super(process.env.NEXT_PUBLIC_API_URL!);
  }

  static getInstance() {
    if (!ApiServer.instance) {
      ApiServer.instance = new ApiServer();
    }
    return ApiServer.instance;
  }
}

export const apiServer = ApiServer.getInstance();
