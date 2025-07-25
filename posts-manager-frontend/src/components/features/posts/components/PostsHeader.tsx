
export const PostsHeader = ({postsCounter, title}: {postsCounter: number, title: string}) => {

    return (
        <h2 className="posts-header">
            {title}
            <span className="posts-count-badge">
                {postsCounter}
            </span>
        </h2>
    )
}

export default PostsHeader