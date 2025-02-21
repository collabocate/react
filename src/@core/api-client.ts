const API_BASE_URL= process.env.REACT_APP_BACKEND_API_URL;

// Custom fetch API client
export const apiClient = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('collabocate_authToken') : ''; // Get token from localStorage

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
    ...options.headers,
  };

  try {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message ||  `Error ${response.status}: ${response.statusText}`);
  }

  // Type casting to ensure that response data is in the expected format
  return (await response.json()) as T;
} catch (error) {
    console.log(`API Error [${API_BASE_URL}${url}]:`, error);
    throw error;
  }

};
