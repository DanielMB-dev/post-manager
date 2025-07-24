import { createResponse } from '../utils/responseHelper.js'
import { Post } from '../models/Post.js'

export const validatePostData = (req, res, next) => {
  const { name, description } = req.body
  
  const validation = Post.validateCreateData({ name, description })
  
  if (!validation.isValid) {
    return createResponse.badRequest(res, validation.errors.join(', '))
  }

  req.body.name = name.trim()
  req.body.description = description.trim()

  next()
}

export const validatePostId = (req, res, next) => {
  const { id } = req.params

  if (!id || typeof id !== 'string' || id.trim().length === 0) {
    return createResponse.badRequest(res, 'Valid post ID is required')
  }

  next()
}