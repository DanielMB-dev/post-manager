export const createResponse = {
  success: (res, data, statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      data
    })
  },

  error: (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      error: message
    })
  },

  notFound: (res, message = 'Resource not found') => {
    return res.status(404).json({
      success: false,
      error: message
    })
  },

  badRequest: (res, message = 'Bad request') => {
    return res.status(400).json({
      success: false,
      error: message
    })
  },

  created: (res, data) => {
    return res.status(201).json({
      success: true,
      data
    })
  }
}