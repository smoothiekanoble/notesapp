const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const fetchApi = async (path, options = {}) => {
  const url = `${API_BASE_URL}${path}`;
  
  const response = await fetch(url, options);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: `HTTP error! status: ${response.status}` };
    }
    throw new Error(errorData.msg || errorData.message || 'An error occurred');
  }

  // Handle cases where response might be empty
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return response.text();
};
