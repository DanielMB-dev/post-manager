import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { apiService, type Post, type CreatePostData, type UpdatePostData } from '../services/api'

export interface PostsState {
  posts: Post[]
  loading: boolean
  error: string | null
  selectedPost: Post | null
  isInitialized: boolean
  nameFilter: string
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  selectedPost: null,
  isInitialized: false,
  nameFilter: ""
}

// Async thunks
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    const response = await apiService.getAllPosts()
    if (!response.success) {
      return rejectWithValue(response.error)
    }
    return response.data
  }
)

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id: string, { rejectWithValue }) => {
    const response = await apiService.getPostById(id)
    if (!response.success) {
      return rejectWithValue(response.error)
    }
    return response.data
  }
)

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: CreatePostData, { rejectWithValue }) => {
    const response = await apiService.createPost(postData)
    if (!response.success) {
      return rejectWithValue(response.error)
    }
    return response.data
  }
)

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, postData }: { id: string; postData: UpdatePostData }, { rejectWithValue }) => {
    const response = await apiService.updatePost(id, postData)
    if (!response.success) {
      return rejectWithValue(response.error)
    }
    return response.data
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: string, { rejectWithValue }) => {
    const response = await apiService.deletePost(id)
    if (!response.success) {
      return rejectWithValue(response.error)
    }
    return id
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload
    },
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.nameFilter = action.payload
    },
    clearNameFilter: (state) => {
      state.nameFilter = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload || []
        state.isInitialized = true
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Fetch post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedPost = action.payload || null
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          state.posts.unshift(action.payload)
        }
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          const index = state.posts.findIndex(post => post.id === action.payload!.id)
          if (index !== -1) {
            state.posts[index] = action.payload
          }
          if (state.selectedPost?.id === action.payload.id) {
            state.selectedPost = action.payload
          }
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false
        state.posts = state.posts.filter(post => post.id !== action.payload)
        if (state.selectedPost?.id === action.payload) {
          state.selectedPost = null
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, setSelectedPost, setNameFilter, clearNameFilter } = postsSlice.actions
export default postsSlice.reducer