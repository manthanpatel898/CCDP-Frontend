import axios from "axios";
import { makeRequest } from "../api-config/api-config";
import { auth } from "../utils/api-list";


export async function adminLogin(payload:any) {
  try {
    const response = await makeRequest('post', auth.ADMIN_LOGIN,payload);
    debugger
    if (response && response.status === 201) {
      return response.data;
    } else {
      throw response;
    }
  } catch (e) {
    throw e;
  }
}
