import { prisma } from '../config/database.js'
import { Post } from '../models/Post.js'

export class PostsRepository {
  async findAll() {
    const posts = await prisma.posts.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return posts.map(post => new Post(post))
  }

  async findById(id) {
    const post = await prisma.posts.findUnique({
      where: { id }
    })
    return post ? new Post(post) : null
  }

  async create(data) {
    const post = await prisma.posts.create({
      data
    })
    return new Post(post)
  }

  async update(id, data) {
    try {
      const post = await prisma.posts.update({
        where: { id },
        data
      })
      return new Post(post)
    } catch (error) {
      if (error.code === 'P2025') {
        return null
      }
      throw error
    }
  }

  async delete(id) {
    try {
      const post = await prisma.posts.delete({
        where: { id }
      })
      return new Post(post)
    } catch (error) {
      if (error.code === 'P2025') {
        return null
      }
      throw error
    }
  }
}