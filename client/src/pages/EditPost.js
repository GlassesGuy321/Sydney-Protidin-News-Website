import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
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

export default function EditPost() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [files, setFiles] = useState([]);
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}/post/`+id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title || '');
                    setSummary(postInfo.summary || '');
                    setImageLink(postInfo.imageLink || '');
                    setContent(postInfo.content || '');
                })
            })
    },[id])

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('imageLink', imageLink);
        data.set('content', content);
        data.set('id', id)
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch(`${process.env.BACKEND_URL}/post`, {
            method: 'PUT',
            body: data,
            credentials: 'include',
          });
          if (response.ok) {
            setRedirect(true);
          }
    }

    if (redirect) {
        return <Navigate to={'/post/'+id} />
    }

    return (
        <form onSubmit={updatePost}>
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
                value={content} 
                onChange={newValue => setContent(newValue)}
                modules={modules} 
                formats={formats}/>
            <button className='create-post'>Update Post</button>
        </form>
    )
}