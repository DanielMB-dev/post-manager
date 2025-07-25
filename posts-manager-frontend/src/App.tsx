import { useState, useRef } from 'react'

import './App.css'

import type { CreatePostData } from './services/api'
import { CreateEditForm } from './components/features/forms/components'
import { Posts } from './components/features/posts/components'


function App() {
  const [formData, setFormData] = useState<CreatePostData>({
    name: '',
    description: ''
  })

  const [editingPost, setEditingPost] = useState<string | null>(null)
  const [showForm, setShowForm] = useState<boolean>(false)
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {

    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })

        const firstInput = formRef.current.querySelector('input[type="text"]') as HTMLInputElement
        if (firstInput) {
          firstInput.focus()
        }
      }
    }, 100)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Posts Manager</h1>
      </header>

      <main className="main-content">
        <section className="posts-section">
          <Posts setShowForm={setShowForm} setFormData={setFormData} setEditingPost={setEditingPost} scrollToForm={scrollToForm} />
        </section>

        <section className="form-section" ref={formRef}>
          <CreateEditForm formData={formData} setFormData={setFormData} editingPost={editingPost} setEditingPost={setEditingPost} setShowForm={setShowForm} showForm={showForm} />
        </section>
      </main>
    </div>
  )
}

export default App
