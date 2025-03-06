export class HttpClient {
  static async get(requestUrl: string, options: object = {}) {
    try {
      const response = await fetch(requestUrl, {
        headers: {
          "Content-Type": "application/json",
          ...options,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error as any);
    }
  }

  static async post(requestUrl: string, body: object, options: object = {}) {
    try {
      const response = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options,
        },
        body: JSON.stringify(body),
      });

      return response.json();
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error as any);
    }
  }

  static async postFormData(requestUrl: string, body: FormData) {
    try {
      const response = await fetch(requestUrl, {
        method: "POST",
        body: body,
      });

      return response.json();
    } catch (error) {
      // eslint-disable-next-line
      throw new Error(error as any);
    }
  }

  static mapResponse<T>(response: T): T {
    return response;
  }
}
