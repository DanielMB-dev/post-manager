import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../store"

const selectPostsState = (state: RootState) => state.posts

export const selectPosts = createSelector(
  [selectPostsState],
  (postsState) => postsState.posts
)

export const selectNameFilter = createSelector(
  [selectPostsState],
  (postsState) => postsState.nameFilter
)

export const selectFilteredPosts = createSelector(
  [selectPosts, selectNameFilter],
  (posts, nameFilter) => {
    if (!nameFilter.trim()) {
      return posts
    }
    
    return posts.filter(post => 
      post.name?.toLowerCase().includes(nameFilter.toLowerCase())
    )
  }
)