import axios from "axios";
import { makeRequest } from "../api-config/api-config";
import { patient } from "../utils/api-list";

export async function addPatient(payload: any) {
  try {
    const response = await makeRequest('post', patient.PATIENT_ON_BOARD, payload);
    debugger
    if (response && response.statusCode === 201) {
      return response;
    } else {
      throw response;
    }
  } catch (e) {
    throw e;
  }
}
export async function patientList(payload: any, page: number, limit: number, sortOrder: string, sortBy?: string) {
  try {
    // Use the full URL in the URL constructor
    const url = new URL('http://localhost:3001/patients'); // Assuming the base URL is localhost:3001

    // Set up dynamic query parameters
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('sortOrder', sortOrder);
    if (sortBy) {
      url.searchParams.append('sortBy', sortBy);
    }

    const response = await makeRequest('get', url.toString(), payload);

    if (response && response.statusCode === 200) {
      return response;
    } else {
      throw response;
    }
  } catch (e) {
    throw e;
  }
}