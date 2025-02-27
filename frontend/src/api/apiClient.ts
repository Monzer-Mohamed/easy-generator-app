
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000/auth";

export const apiClient = {
  fetch: async (operation: string, method: string, data: any, authorizationToken: string = '') => {
    return await fetch(`${API_BASE_URL + operation}`, {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...(authorizationToken && { Authorization: `Bearer ${authorizationToken}` }),
      }
    }).then((response) => {
      return response.json();
    }).catch((error) => { throw error; });
  }
};
