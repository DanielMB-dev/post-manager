import { PostsRepository } from '../repositories/postsRepository.js'
import { Post } from '../models/Post.js'

export class PostsService {
  constructor() {
    this.postsRepository = new PostsRepository()
  }

  async getAllPosts() {
    return await this.postsRepository.findAll()
  }

  async getPostById(id) {
    const post = await this.postsRepository.findById(id)
    if (!post) {
      throw new Error('Post not found')
    }
    return post
  }

  async createPost(data) {
    const cleanData = {
      name: data.name.trim(),
      description: data.description.trim()
    }

    return await this.postsRepository.create(cleanData)
  }

  async updatePost(id, data) {
    const cleanData = {
      name: data.name.trim(),
      description: data.description.trim()
    }

    const updatedPost = await this.postsRepository.update(id, cleanData)
    if (!updatedPost) {
      throw new Error('Post not found')
    }

    return updatedPost
  }

  async deletePost(id) {
    const deletedPost = await this.postsRepository.delete(id)
    if (!deletedPost) {
      throw new Error('Post not found')
    }
    return deletedPost
  }
}