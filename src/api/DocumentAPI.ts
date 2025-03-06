import { DocumentResponse, DocumentResponseError } from "../types/Document";
import { HttpClient } from "./HttpClient";

export class DocumentAPI {
  static getUrl(): string {
    return `https://api.cloudinary.com/v1_1/darkymx3t/image/upload`;
  }

  static upload(
    payload: File
  ): Promise<DocumentResponse | DocumentResponseError> {
    const formData = new FormData();

    formData.append("file", payload);
    formData.append("upload_preset", "think-1st");
    formData.append(
      "api_key",
      process.env.REACT_APP_CLOUDINARY_API_KEY as string
    );

    return HttpClient.postFormData(this.getUrl(), formData).then((response) =>
      HttpClient.mapResponse<DocumentResponse>(response)
    );
  }
}
