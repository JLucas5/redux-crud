import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import { pullFromServer } from '../state/posts/postsSlice'
import NewPostModal from './NewPostModal'

const Posts = () => {
    const posts = useSelector((state: RootState) => state.posts.posts)
    const username = useSelector((state: RootState) => state.user.name)
    const dispatch = useDispatch<AppDispatch>()

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(pullFromServer())
    },[])

    const handleNewPost = () => {
        setShowModal(true)
    }
    return (
        <div>
        <div>{posts.map((post, index)=>(
            <>
            <div>{post.username}</div>
            <div>{post.title}</div>
            <div>{post.content}</div>
            <div>{post.id}</div>
            </>
        ))}</div>
        <button onClick={handleNewPost}>New Post</button>

        <NewPostModal 
          show={showModal}
          user={username}
          onClose={() => setShowModal(false)}
        />
        </div>
    )
}

export default Posts