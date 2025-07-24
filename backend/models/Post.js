export class Post {
  constructor({ id, name, description, createdAt, updatedAt }) {
    this.id = id
    this.name = name
    this.description = description
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static validateCreateData({ name, description }) {
    const errors = []
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string')
    }
    
    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      errors.push('Description is required and must be a non-empty string')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  static validateUpdateData({ name, description }) {
    return this.validateCreateData({ name, description })
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}