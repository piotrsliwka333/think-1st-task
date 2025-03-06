export interface WorkoutPayload {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  photoUrl: string;
  date: Date;
}

export interface WorkoutResponse extends WorkoutPayload {
  id: string;
}

export interface WorkoutResponseError {
  error: { message: string };
}
