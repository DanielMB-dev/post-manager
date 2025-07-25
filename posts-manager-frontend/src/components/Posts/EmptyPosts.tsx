

export const EmptyPostsList = () => {

    return (
        <div className="posts-empty-state">
            <div className="posts-empty-icon">📝</div>
            <p className="posts-empty-title">No hay posts disponibles</p>
            <p className="posts-empty-subtitle">
                Crea tu primer post usando el formulario
            </p>
        </div>
    )
}

export default EmptyPostsList