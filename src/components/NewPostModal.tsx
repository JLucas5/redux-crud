import {useRef, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { Post } from '../state/posts/postsSlice';
import { addPost } from '../state/posts/postsSlice';

type NewPostModalProps = {
    show: boolean;
    user: string;
    onClose: () => void;
}

const NewPostModal = ({show,user, onClose}:NewPostModalProps) => {

    const dispatch = useDispatch<AppDispatch>()
    
    const [post, setPost] = useState({username:'', title:'', content:'', id:''} as Post)

    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        setPost({...post, username:user})
        if (show) {
          ref.current?.showModal();
        } else {
          ref.current?.close();
        }
    }, [show, user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPost({...post, [name]: value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await dispatch(addPost(post))
        onClose()
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
                        <h2>New Post</h2>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input value={post.title} onChange={handleChange} type="text" id="title" name="title" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea value={post.content} onChange={handleChange} id="content" name="content" required></textarea>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                
                </div>
            </div>
        </dialog>
  )
}

export default NewPostModal