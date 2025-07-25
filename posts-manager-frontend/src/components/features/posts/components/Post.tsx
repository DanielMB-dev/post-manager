/* Types */
import type { Post as PostType } from "../../../../services/api"

interface PostProps {
    post: PostType
    handleEdit: (post: PostType)=> void
    handleDelete: (id: string)=> void
}

export const Post = ({ post, handleDelete, handleEdit }: PostProps) => {

    return (
        <div key={post.id} className="post-row">
            <div className="post-gradient-bar"></div>
            
            <div className="post-content">
                <div className="post-main-content">
                    <div className="post-text-content">
                        <h3 className="post-title">{post.name}</h3>
                        
                        <p className="post-description">{post.description}</p>
                        
                        <div className="post-date">
                            Creado: {new Date(post.createdAt).toLocaleDateString()}
                            {post.updatedAt && post.updatedAt !== post.createdAt && (
                                <> | Actualizado: {new Date(post.updatedAt).toLocaleDateString()}</>
                            )}
                        </div>
                    </div>
                    
                    <div className="post-actions">
                        <button
                            onClick={() => handleEdit(post)}
                            className="post-btn post-btn-edit"
                        >
                            ✏️ Editar
                        </button>
                        <button
                            onClick={() => handleDelete(post.id)}
                            className="post-btn post-btn-delete"
                        >
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post