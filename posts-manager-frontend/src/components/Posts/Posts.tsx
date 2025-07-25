/* Hooks */
import { useEffect } from "react"
import { useSelector } from "react-redux"
/* Redux */
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts"
import { fetchPosts, deletePost, clearError } from "../../store/postsSlice.ts"
import { selectFilteredPosts } from "../../store/selectors/filterSelector.ts"
/*  Service */
import type { CreatePostData } from "../../services/api.ts"


/* Components */

import { Loading } from "../ui/index.ts"
import { EmptyPostsList, Post, PostsHeader } from "./index.ts"
import { Filter } from "../Form/index.ts"






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
            <Loading message={'Cargando posts...'} />
        )
    }

    return (
        <>
            <Filter />
            <div style={{ marginTop: '1.5rem' }}>
                <PostsHeader postsCounter={filteredPosts.length} title={"📋 Lista de Posts"} />

                {filteredPosts.length === 0 ? (
                    <EmptyPostsList />
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