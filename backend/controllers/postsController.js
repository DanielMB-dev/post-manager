import { PostsService } from '../services/postsService.js'
import { createResponse } from '../utils/responseHelper.js'

export class PostsController {
  constructor() {
    this.postsService = new PostsService()
  }

  getAllPosts = async (req, res) => {
    try {
      const posts = await this.postsService.getAllPosts()
      return createResponse.success(res, posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
      return createResponse.error(res, 'Failed to fetch posts')
    }
  }

  getPostById = async (req, res) => {
    try {
      const { id } = req.params
      const post = await this.postsService.getPostById(id)
      return createResponse.success(res, post)
    } catch (error) {
      console.error('Error fetching post:', error)
      if (error.message === 'Post not found') {
        return createResponse.notFound(res, 'Post not found')
      }
      return createResponse.error(res, 'Failed to fetch post')
    }
  }

  createPost = async (req, res) => {
    try {
      const { name, description } = req.body
      const post = await this.postsService.createPost({ name, description })
      return createResponse.created(res, post)
    } catch (error) {
      console.error('Error creating post:', error)
      return createResponse.error(res, 'Failed to create post')
    }
  }

  updatePost = async (req, res) => {
    try {
      const { id } = req.params
      const { name, description } = req.body
      const post = await this.postsService.updatePost(id, { name, description })
      return createResponse.success(res, post)
    } catch (error) {
      console.error('Error updating post:', error)
      if (error.message === 'Post not found') {
        return createResponse.notFound(res, 'Post not found')
      }
      return createResponse.error(res, 'Failed to update post')
    }
  }

  deletePost = async (req, res) => {
    try {
      const { id } = req.params
      const deletedPost = await this.postsService.deletePost(id)
      return createResponse.success(res, deletedPost)
    } catch (error) {
      console.error('Error deleting post:', error)
      if (error.message === 'Post not found') {
        return createResponse.notFound(res, 'Post not found')
      }
      return createResponse.error(res, 'Failed to delete post')
    }
  }
}