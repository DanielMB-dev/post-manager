import { PostsController } from '../controllers/postsController.js'
import { validatePostData, validatePostId } from '../middleware/validation.js'

const postsController = new PostsController()

export const getAllPosts = postsController.getAllPosts
export const getPostById = [validatePostId, postsController.getPostById]
export const createPost = [validatePostData, postsController.createPost]
export const updatePost = [validatePostId, validatePostData, postsController.updatePost]
export const deletePost = [validatePostId, postsController.deletePost]