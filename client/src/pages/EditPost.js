import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor'

export default function EditPost() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const tags = ['Technology', 'Health', 'Finance', 'Education', 'Entertainment'];
    const [summary, setSummary] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [files, setFiles] = useState([]);
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/post/`+id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setSummary(postInfo.summary);
                    setImageLink(postInfo.imageLink);
                    setContent(postInfo.content);
                })
            })
    },[id])

    function handleTagChange(ev) {
        const { value, checked } = ev.target;
        setSelectedTags(prev => 
            checked ? [...prev, value] : prev.filter(tag => tag !== value)
        );
    }

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('tags', JSON.stringify(selectedTags));
        data.set('summary', summary);
        data.set('imageLink', imageLink);
        data.set('content', content);
        data.set('id', id)
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/post`, {
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
            <div className='tag-select'>
                {tags.map(tag => (
                    <label key={tag}>
                        {tag}
                        <input
                            type="checkbox"
                            value={tag}
                            checked={selectedTags.includes(tag)}
                            onChange={handleTagChange}
                        />
                    </label>
                ))}
            </div>
            <textarea
                placeholder={'Summary'}
                value={summary} 
                onChange={ev => setSummary(ev.target.value)}
                rows={5}/>
            <input type="url" 
                placeholder={'Image Link'}
                value={imageLink} 
                onChange={ev => setImageLink(ev.target.value)}/>
            <MDEditor 
                value={content} 
                height='100%'
                data-color-mode="light"
                minHeight={50}
                visibleDragbar={false}
                onChange={newValue => setContent(newValue)}/>
            <button className='create-post'>Update Post</button>
        </form>
    )
}