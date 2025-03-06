import {
  WorkoutPayload,
  WorkoutResponse,
  WorkoutResponseError,
} from "../types/Workout";
import { HttpClient } from "./HttpClient";

export class WorkoutsAPI {
  static getUrl(): string {
    return `https://httpbin.org/post`;
  }

  static create(
    payload: WorkoutPayload
  ): Promise<WorkoutResponse | WorkoutResponseError> {
    return HttpClient.post(this.getUrl(), payload).then((response) =>
      HttpClient.mapResponse<WorkoutResponse | WorkoutResponseError>(response)
    );
  }
}
