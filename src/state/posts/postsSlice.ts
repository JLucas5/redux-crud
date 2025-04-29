import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Post {
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

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(addPost.fulfilled, (state: PostsState, action: PayloadAction<PostsState>) => {
                console.log("addPost fulfilled")
                state.posts = action.payload.posts
            })
            .addCase(deletePost.fulfilled, (state: PostsState, action: PayloadAction<PostsState>) => {
                console.log("deletePost fulfilled")
                state.posts = action.payload.posts
            })
            .addCase(updatePost.fulfilled, (state: PostsState, action: PayloadAction<PostsState>) => {
                console.log("updatePost fulfilled")
                state.posts = action.payload.posts
            })
            .addCase(pullFromServer.fulfilled, (state: PostsState, action: PayloadAction<PostsState>) => {
                console.log("pullFromServer fulfilled")
                state.posts = action.payload.posts
            })
    }
})

//These following functions are only simulating a backend API call
// and are instead working with LocalStorage
export const addPost = createAsyncThunk(
    "posts/addPost",
    async (post: Post) => {
        //Fake API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        const storedPosts = JSON.parse(localStorage.getItem("posts")||"{}") as PostsState
        if(!storedPosts.posts){
            storedPosts.posts = []
        }
        storedPosts.posts.push({ ...post, id: generateUniqueId()})
        
        localStorage.setItem("posts", JSON.stringify(storedPosts))
        //End of fake API call
        return storedPosts
    }
)   

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (id:string) => {
        //Fake API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const storedPosts = JSON.parse(localStorage.getItem("posts")||"''") as PostsState
        const filteredPosts = storedPosts.posts.filter((p: Post) => p.id !== id)
        
        localStorage.setItem("posts", JSON.stringify(filteredPosts))
        //End of fake API call
        return filteredPosts
    }
)   

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (post: Post) => {
        //Fake API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const storedPosts = JSON.parse(localStorage.getItem("posts")||"''") as PostsState
        const updatedPosts = storedPosts.posts.map(datedPost => datedPost.id === post.id ? {...datedPost,...post} : datedPost)

        localStorage.setItem("posts", JSON.stringify(updatedPosts))
        //End of fake API call
        return updatedPosts
    }
)

export const pullFromServer = createAsyncThunk(
    "posts/pullFromServer",
    async () => {
        //Fake API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const storedPosts = JSON.parse(localStorage.getItem("posts")||`{posts:[]}`) as PostsState
        //End of fake API call
        return storedPosts
    }
)



export const { } = postsSlice.actions


export default postsSlice.reducer



// This function generates a unique ID based on the current timestamp and a random string
//It will be replaced by a proper UUID generator library and properly imported. Eventually...
function generateUniqueId(): string {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 15);
    return timestamp + randomString;
  }