/* Hooks */
import { useEffect } from "react"
import { useSelector } from "react-redux"
/* Redux */
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { fetchPosts, deletePost, clearError } from "../store/postsSlice"
import { selectFilteredPosts } from "../store/selectors/filterSelector"
/*  Service */
import type { CreatePostData } from "../services/api"


/* Components */
import { Filter, Post } from "."

// Variable global para evitar doble fetch en desarrollo
let hasInitialFetch = false

interface PostsProps {
    setEditingPost: React.Dispatch<React.SetStateAction<string | null>>
    setFormData: (data: CreatePostData) => void
    setShowForm: (value: boolean) => void
    scrollToForm: () => void
}

export const Posts = ({ setEditingPost, setFormData, setShowForm, scrollToForm }: PostsProps) => {
    const dispatch = useAppDispatch()
    const filteredPosts = useSelector(selectFilteredPosts)
    const { loading, error, } = useAppSelector((state) => state.posts)


    useEffect(() => {
        if (!hasInitialFetch && !loading) {
            hasInitialFetch = true
            dispatch(fetchPosts())
        }
    }, [dispatch, loading])

    useEffect(() => {
        if (error) {
            alert(error)
            dispatch(clearError())
        }
    }, [error, dispatch])

    useEffect(() => {

    }, [filteredPosts.length])

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de eliminar este post?')) {
            await dispatch(deletePost(id))
        }
    }
    const handleEdit = (post: any) => {
        setFormData({
            name: post.name,
            description: post.description
        })
        setEditingPost(post.id)
        setShowForm(true)
        scrollToForm()
    }


    if (loading) {
        return (
            <div className="posts-loading">
                <div className="posts-loading-content">
                    <div className="posts-loading-spinner"></div>
                    Cargando posts...
                </div>
            </div>
        )
    }

    return (
        <>
            <Filter />
            <div style={{ marginTop: '1.5rem' }}>
                <h2 className="posts-header">
                    📋 Lista de Posts
                    <span className="posts-count-badge">
                        {filteredPosts.length}
                    </span>
                </h2>

                {filteredPosts.length === 0 ? (
                    <div className="posts-empty-state">
                        <div className="posts-empty-icon">📝</div>
                        <p className="posts-empty-title">No hay posts disponibles</p>
                        <p className="posts-empty-subtitle">
                            Crea tu primer post usando el formulario
                        </p>
                    </div>
                ) : (
                    <div className="posts-list">
                        {filteredPosts.map((post, index) => (
                            <Post key={post.id} handleDelete={handleDelete} handleEdit={handleEdit} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default Posts