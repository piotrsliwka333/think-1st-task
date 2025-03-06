import { Holiday, HolidayError } from "../types/Holiday";
import { HttpClient } from "./HttpClient";

export class HolidaysAPI {
  static getUrl(): string {
    return `https://api.api-ninjas.com/v1/holidays?country=PL`;
  }

  static getHeaders(): Record<string, string> {
    return { "X-Api-Key": process.env.REACT_APP_API_NINJA_API_URL as string };
  }

  static findMany(): Promise<Holiday[] | HolidayError> {
    return HttpClient.get(this.getUrl(), this.getHeaders()).then((response) =>
      HttpClient.mapResponse<Holiday[] | HolidayError>(response)
    );
  }
}
