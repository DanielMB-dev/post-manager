
/* Redux */
import { createPost, updatePost } from "../../../../store/postsSlice"
import { useAppDispatch } from "../../../../hooks/redux"
/* Service */
import type { CreatePostData } from "../../../../services/api";


interface CreateEditFormProps {
    editingPost: string | null;
    formData: CreatePostData
    setEditingPost: (data: string | null) => void
    setFormData: (data: CreatePostData) => void
    showForm: boolean
    setShowForm: (value: boolean) => void
}

export const CreateEditForm = ({ editingPost, formData, setEditingPost, setFormData, showForm, setShowForm }: CreateEditFormProps) => {
    const dispatch = useAppDispatch()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (editingPost) {
            await dispatch(updatePost({ id: editingPost, postData: formData }))
            setEditingPost(null)
        } else {
            await dispatch(createPost(formData))
        }

        setFormData({ name: '', description: '' })
        setShowForm(false)
    }

    const resetForm = () => {
        setFormData({ name: '', description: '' })
        setEditingPost(null)
        setShowForm(false)
    }

    return (
        <div>
            <button
                onClick={() => setShowForm(!showForm)}
                className={`form-toggle-btn ${showForm ? 'form-toggle-btn-cancel' : 'form-toggle-btn-create'}`}
            >
                {showForm ? '✕ Cancelar' : '➕ Crear Nuevo Post'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-gradient-bar"></div>

                    <h3 className="form-title">
                        {editingPost ? '✏️ Editar Post' : '📝 Crear Nuevo Post'}
                    </h3>

                    <div className="form-field">
                        <label className="form-label">
                            Nombre del Post
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            placeholder="Ingresa el nombre del post..."
                            className="form-input"
                        />
                    </div>

                    <div className="form-field form-field-textarea">
                        <label className="form-label">
                            Descripción
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            rows={4}
                            placeholder="Describe tu post..."
                            className="form-input form-textarea"
                        />
                    </div>

                    <div className="form-actions">
                        <button 
                            type="button" 
                            onClick={resetForm} 
                            className="form-btn form-btn-cancel"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="form-btn form-btn-submit"
                        >
                            {editingPost ? '✏️ Actualizar' : '➕ Crear Post'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )


}

export default CreateEditForm

