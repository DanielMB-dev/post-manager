import express from 'express'
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from './routes/posts.js'

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/posts', getAllPosts)
app.get('/posts/:id', getPostById)
app.post('/posts', createPost)
app.put('/posts/:id', updatePost)
app.delete('/posts/:id', deletePost)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
