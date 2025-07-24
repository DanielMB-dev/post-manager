import express from 'express'
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from './routes/posts.js'
import cors from 'cors'

const app = express()
const port = 3000

app.use(express.json())

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get('/posts', getAllPosts)
app.get('/posts/:id', getPostById)
app.post('/posts', createPost)
app.put('/posts/:id', updatePost)
app.delete('/posts/:id', deletePost)

app.listen(port, () => {
  console.log(`Posts manager app listening on port ${port}`)
})
