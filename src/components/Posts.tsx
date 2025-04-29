import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import { Post, pullFromServer, deletePost } from '../state/posts/postsSlice'
import NewPostModal from './NewPostModal'
import UpdatePostModal from './UpdatePostModal'

const Posts = () => {
    const posts = useSelector((state: RootState) => state.posts.posts)
    const username = useSelector((state: RootState) => state.user.name)
    const dispatch = useDispatch<AppDispatch>()
    const [clickedPost, setClickedPost] = useState({} as Post)

    const [showNewModal, setShowNewModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    useEffect(() => {
        dispatch(pullFromServer())
    },[])

    const handleNewPost = () => {
        setShowNewModal(true)
    }

    const handleDeletePost = (id: string) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            dispatch(deletePost(id))
        }
    }

    return (
        <div>
        <div>{posts.map((post, index)=>(
            <div key={index} className="post">
                <div>{post.username}</div>
                <div>{post.title}</div>
                <div>{post.content}</div>
                <div>{post.id}</div>
                <button onClick={() => {
                    setClickedPost(post)
                    setShowUpdateModal(true)
                }}>Update</button>
                {post.username === username && <button  onClick={() => {
                    handleDeletePost(post.id ||"")
                }}>Delete</button>}
            </div>
        ))}</div>
        <button onClick={handleNewPost}>New Post</button>

        <NewPostModal 
          show={showNewModal}
          user={username}
          onClose={() => setShowNewModal(false)}
        />
        <UpdatePostModal
          show={showUpdateModal}
          post={clickedPost}
          onClose={() => setShowUpdateModal(false)}
        />
        </div>
    )
}

export default Posts