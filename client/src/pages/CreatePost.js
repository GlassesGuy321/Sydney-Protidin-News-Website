import { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
};
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default function CreatePost() {
    const quillRef = useRef();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [files, setFiles] = useState([]);
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('imageLink', imageLink);
        data.set('content', content);
        data.set('file', files[0])
        ev.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/post`, {
            method: 'POST',
            body: data,
            credentials: 'include',
        })

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={createNewPost}>
            <input type="title" 
                placeholder={'Title'} 
                value={title} 
                onChange={ev => setTitle(ev.target.value)}/>
            <input type="summary" 
                placeholder={'Summary'}
                value={summary} 
                onChange={ev => setSummary(ev.target.value)}/>
            <input type="url" 
                placeholder={'Image Link'}
                value={imageLink} 
                onChange={ev => setImageLink(ev.target.value)}/>
            <input type='file' 
                onChange={ev => setFiles(ev.target.files)}/>
            <ReactQuill 
                ref={quillRef}
                value={content} 
                onChange={newValue => setContent(newValue)}
                modules={modules} 
                formats={formats}/>
            <button className='create-post'>Create Post</button>
        </form>
    )
}