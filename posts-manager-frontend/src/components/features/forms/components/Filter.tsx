/* Redux */
import { useSelector } from "react-redux"
import { setNameFilter, clearNameFilter } from "../../../../store/postsSlice"
import { useAppDispatch } from "../../../../hooks/redux"
import { selectNameFilter } from "../../../../store/selectors/filterSelector"

export const Filter = () => {
    const nameFilter = useSelector(selectNameFilter)
    const dispatch = useAppDispatch()
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setNameFilter(event.target.value))
    }

    const handleClearFilter = () => {
        dispatch(clearNameFilter())
    }

    return (
        <div className="filter-container">
            <div className="filter-input-wrapper">
                <div className="filter-search-icon">
                    🔍
                </div>
                <input
                    type="text"
                    placeholder="Buscar posts por nombre..."
                    value={nameFilter}
                    onChange={handleFilterChange}
                    className="filter-input"
                />
            </div>
            {nameFilter && (
                <button
                    onClick={handleClearFilter}
                    className="filter-clear-btn"
                >
                    ✕ Limpiar
                </button>
            )}
        </div>
    )

}

export default Filter