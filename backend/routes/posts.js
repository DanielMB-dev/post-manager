import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient()

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' })
  }
}

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params
    const post = await prisma.posts.findUnique({
      where: { id }
    })
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    
    res.json(post)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' })
  }
}

export const createPost = async (req, res) => {
  try {
    const { name, description } = req.body
    
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' })
    }
    
    const post = await prisma.posts.create({
      data: { name, description }
    })
    
    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' })
  }
}

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description } = req.body
    
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' })
    }
    
    const post = await prisma.posts.update({
      where: { id },
      data: { name, description }
    })
    
    res.json(post)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.status(500).json({ error: 'Failed to update post' })
  }
}

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    
    await prisma.posts.delete({
      where: { id }
    })
    
    res.status(204).send()
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Post not found' })
    }
    res.status(500).json({ error: 'Failed to delete post' })
  }
}