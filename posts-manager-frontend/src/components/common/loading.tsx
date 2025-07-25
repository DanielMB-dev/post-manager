

export const Loading = ({message}: {message: string}) => {

    return (
        <div className="posts-loading">
            <div className="posts-loading-content">
                <div className="posts-loading-spinner"></div>
                {message}
            </div>
        </div>
    )
}

export default Loading