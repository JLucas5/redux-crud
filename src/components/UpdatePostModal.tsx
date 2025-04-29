import {useRef, useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../state/store';
import { Post, updatePost } from '../state/posts/postsSlice';

type UpdatePostModalProps = {
    show: boolean;
    post: Post;
    onClose: () => void;
}

const UpdatePostModal = ({show, post, onClose}:UpdatePostModalProps) => {

    const dispatch = useDispatch<AppDispatch>()
    
    const [updatedPost, setUpdatedPost] = useState({username:'', title:'', content:'', id:''} as Post)

    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        setUpdatedPost({...updatedPost, ...post})
        if (show) {
          ref.current?.showModal();
        } else {
          ref.current?.close();
        }
    }, [show, post]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedPost({...updatedPost, [name]: value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updatePost(updatedPost))
        onClose()
        setUpdatedPost({username:'', title:'', content:'', id:''})
    }

    return (
        <dialog
        ref={ref}
        onCancel={onClose}>
            <div className='modal-overlay'>
                <div className="modal-content">
                    <span onClick={onClose} className="close-button">
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                    <form onSubmit={handleSubmit}>
                        <h2>Update Post</h2>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input value={updatedPost.title} onChange={handleChange} type="text" id="title" name="title" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea value={updatedPost.content} onChange={handleChange} id="content" name="content" required></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                
                </div>
            </div>
        </dialog>
  )
}

export default UpdatePostModal