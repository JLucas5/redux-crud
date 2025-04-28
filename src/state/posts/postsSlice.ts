import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

interface Post {
    id?: string,
    username: string,
    title: string,
    content: string
}

interface PostsState {
    posts:Post[]
}

const initialState: PostsState = {
    posts: []
}

const postsSlice = {
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(addPost.fulfilled, (state: PostsState, action: PayloadAction<PostsState>) => {
                console.log("fulfilled")
                state.posts = action.payload.posts
            })
            .addCase(deletePost.fulfilled, (state: PostsState, action: PayloadAction<PostsState>) => {
                console.log("fulfilled")
                state.posts = action.payload.posts
            })
            .addCase(updatePost.fulfilled, (state: PostsState, action: PayloadAction<PostsState>) => {
                console.log("fulfilled")
                state.posts = action.payload.posts
            })
    }
}

//These following functions are only simulating a backend API call
// and are instead working with LocalStorage

export const addPost = createAsyncThunk(
    "posts/addPost",
    async (post: Post) => {
        //fake API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        const storedPosts = JSON.parse(localStorage.getItem("posts")||`{posts:[]}`) as PostsState
        storedPosts.posts.push({ id: generateUniqueId(), ...post})
        
        localStorage.setItem("posts", JSON.stringify(storedPosts))
        return storedPosts
    }
)   

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id:string) => {
        //fake API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const storedPosts = JSON.parse(localStorage.getItem("posts")||'""') as PostsState
        const filteredPosts = storedPosts.posts.filter((p: Post) => p.id !== id)
        
        localStorage.setItem("posts", JSON.stringify(filteredPosts))

        return filteredPosts
    }
)   

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (post: Post) => {
        //fake API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const storedPosts = JSON.parse(localStorage.getItem("posts")||'""') as PostsState
        const updatedPosts = storedPosts.posts.map(datedPost => datedPost.id === post.id ? post : datedPost)

        localStorage.setItem("posts", JSON.stringify(updatedPosts))
        return updatedPosts
    }
)

export const { } = postsSlice.reducers



function generateUniqueId(): string {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 15);
    return timestamp + randomString;
  }