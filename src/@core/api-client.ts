const API_BASE_URL= process.env.REACT_APP_BACKEND_API_URL;

// Custom fetch API client
export const apiClient = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : ''; // Get token from localStorage

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
    ...options.headers,
  };

  try {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    // 🔥 throw structured error instead of plain Error
    throw {
      status: response.status,
      message: data?.error?.message || response.statusText,
      raw: data
    };
  }

  // Type casting to ensure that response data is in the expected format
  return data as T;
} catch (error) {
    console.log(`API Error [${API_BASE_URL}${endpoint}]:`, error);
    throw error;
  }

};
