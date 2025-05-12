import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import { Post, pullFromServer, deletePost } from '../state/posts/postsSlice'
import NewPostModal from './NewPostModal'
import UpdatePostModal from './UpdatePostModal'
import "./Posts.css"
import { logout } from '../state/user/userSlice'

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

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <>
        <nav className="navbar">
            <button className='new-post-button'onClick={handleNewPost}>New Post</button>
            <button className='logout-button' onClick={handleLogout}> Logout</button>
        </nav>
        <div className="posts-container">
            <div className="posts-list">
                {posts.map((post, index)=>(
                    <div key={index} className="post" >
                        <p className='post-title'>{post.title}</p>  
                        <p className='post-user'>by {post.username}</p>
                        <p className='post-content'>{post.content}</p>
                        <div className="button-div">
                        {post.username === username && <button
                            className='update-button'
                            onClick={() => {
                                setClickedPost(post)
                                setShowUpdateModal(true)
                            }}>Update</button>}
                            
                        {post.username === username && <button
                            className='delete-button'
                            onClick={() => {
                                handleDeletePost(post.id ||"")
                            }}>Delete</button>}
                        </div>
                    </div>
                ))}
            </div>

        </div>
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
        </>
    )
}

export default Posts