import { createResponse } from '../utils/responseHelper.js'

export const errorHandler = (err, req, res, next) => {
  console.error('Error stack:', err.stack)

  if (err.name === 'ValidationError') {
    return createResponse.badRequest(res, err.message)
  }

  if (err.name === 'CastError') {
    return createResponse.badRequest(res, 'Invalid ID format')
  }

  if (err.code === 'P2025') {
    return createResponse.notFound(res, 'Record not found')
  }

  if (err.code === 'P2002') {
    return createResponse.badRequest(res, 'Duplicate entry')
  }

  return createResponse.error(res, 'Internal server error')
}

export const notFoundHandler = (req, res) => {
  return createResponse.notFound(res, `Route ${req.method} ${req.path} not found`)
}