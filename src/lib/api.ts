// API client for Study Spaces app
// Direct API calls to backend (Neon + Clerk)

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Types
import type { StudySpace } from '@/types/StudySpace';

export interface Review {
  id: string;
  space_id: string;
  user_id: string;
  author: string;
  author_name?: string;
  avatar_url?: string;
  rating: number;
  content?: string;
  comment?: string;
  photos?: string[];
  helpful?: number;
  created_at: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export interface Favorite {
  id: string;
  user_id: string;
  space_id: string;
  study_spaces?: StudySpace;
  created_at: string;
}

export interface Submission {
  id: string;
  user_id: string;
  name: string;
  building: string;
  campus: string;
  description?: string;
  noise_level?: string;
  privacy_level?: string;
  amenities?: string[];
  status: string;
  created_at: string;
  updated_at?: string;
  submitter_name?: string;
  submitter_email?: string;
}

// Helper function for API calls with optional Clerk token
async function apiCall<T>(endpoint: string, options?: RequestInit & { token?: string }): Promise<T> {
  const { token, ...fetchOptions } = options || {};
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };
  
  // Add Authorization header if token is provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Only log in development
  if (import.meta.env.DEV) {
    console.log('🔵 API Call:', {
      method: fetchOptions.method || 'GET',
      url,
      hasToken: !!token,
    });
  }
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText || `HTTP ${response.status} ${response.statusText}` };
      }
      
      if (import.meta.env.DEV) {
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
      }
      
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error: any) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      if (import.meta.env.DEV) {
        console.error('Network Error:', { url, message: error.message });
      }
      throw new Error(`无法连接到后端服务器。请确保后端服务器正在运行在 ${API_BASE_URL}。错误: ${error.message}`);
    }
    throw error;
  }
}

// Reviews API
export const reviewsApi = {
  getBySpaceId: async (spaceId: string, token?: string): Promise<Review[]> => {
    return apiCall<Review[]>(`/api/areas/${spaceId}/reviews`, { token });
  },

  uploadPhotos: async (files: File[], token?: string): Promise<{ photoUrls: string[] }> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('photos', file);
    });

    const url = `${API_BASE_URL}/api/reviews/upload-photos`;
    const headers: Record<string, string> = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  },

  create: async (spaceId: string, data: { rating: number; content?: string; comment?: string; photos?: string[] }, token?: string): Promise<Review> => {
    return apiCall<Review>(`/api/areas/${spaceId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    });
  },

  markHelpful: async (reviewId: string, token?: string): Promise<{ helpful: number }> => {
    return apiCall<{ helpful: number }>(`/api/reviews/${reviewId}/helpful`, {
      method: 'PUT',
      token,
    });
  },

  delete: async (reviewId: string, token?: string): Promise<void> => {
    await apiCall(`/api/reviews/${reviewId}`, {
      method: 'DELETE',
      token,
    });
  },
};

// Favorites API
export const favoritesApi = {
  getUserFavorites: async (userId: string, token?: string): Promise<Favorite[]> => {
    return apiCall<Favorite[]>(`/api/users/${userId}/favorites`, { token });
  },

  add: async (userId: string, spaceId: string, token?: string): Promise<Favorite> => {
    return apiCall<Favorite>(`/api/users/${userId}/favorites`, {
      method: 'POST',
      body: JSON.stringify({ spaceId }),
      token,
    });
  },

  remove: async (userId: string, spaceId: string, token?: string): Promise<void> => {
    await apiCall(`/api/users/${userId}/favorites/${spaceId}`, {
      method: 'DELETE',
      token,
    });
  },

  check: async (userId: string, spaceId: string, token?: string): Promise<boolean> => {
    try {
      const favorites = await favoritesApi.getUserFavorites(userId, token);
      return favorites.some((fav) => {
        const id = (fav as any).study_spaces?.id || fav.space_id;
        return id === spaceId;
      });
    } catch {
      return false;
    }
  },
};

// Submissions API
export const submissionsApi = {
  getAll: async (status?: string, token?: string): Promise<Submission[]> => {
    const url = status ? `/api/submissions?status=${status}` : '/api/submissions';
    return apiCall<Submission[]>(url, { token });
  },

  getById: async (id: string, token?: string): Promise<Submission> => {
    return apiCall<Submission>(`/api/submissions/${id}`, { token });
  },

  create: async (data: {
    user_id: string;
    name: string;
    building: string;
    campus: string;
    description?: string;
    noise_level?: string;
    privacy_level?: string;
    amenities?: string[];
    photos?: string[];
  }, token?: string): Promise<Submission> => {
    return apiCall<Submission>('/api/submissions', {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    });
  },

  updateStatus: async (id: string, status: 'pending' | 'approved' | 'rejected', token?: string): Promise<Submission> => {
    return apiCall<Submission>(`/api/submissions/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
      token,
    });
  },
};

