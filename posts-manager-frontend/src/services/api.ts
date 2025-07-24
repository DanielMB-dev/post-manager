const API_BASE_URL = 'http://localhost:3000'

export interface Post {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface CreatePostData {
  name: string
  description: string
}

export interface UpdatePostData {
  name: string
  description: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'An error occurred',
        }
      }

      return {
        success: true,
        data: data.data || data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }

  async getAllPosts(): Promise<ApiResponse<Post[]>> {
    return this.makeRequest<Post[]>('/posts')
  }

  async getPostById(id: string): Promise<ApiResponse<Post>> {
    return this.makeRequest<Post>(`/posts/${id}`)
  }

  async createPost(postData: CreatePostData): Promise<ApiResponse<Post>> {
    return this.makeRequest<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    })
  }

  async updatePost(id: string, postData: UpdatePostData): Promise<ApiResponse<Post>> {
    return this.makeRequest<Post>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    })
  }

  async deletePost(id: string): Promise<ApiResponse<Post>> {
    return this.makeRequest<Post>(`/posts/${id}`, {
      method: 'DELETE',
    })
  }
}

export const apiService = new ApiService()