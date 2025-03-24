import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor'

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const tags = ['Technology', 'Health', 'Finance', 'Education', 'Entertainment'];
    const [summary, setSummary] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);

    function handleTagChange(ev) {
        const { value, checked } = ev.target;
        setSelectedTags(prev => 
            checked ? [...prev, value] : prev.filter(tag => tag !== value)
        );
    }

    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('tags', JSON.stringify(selectedTags));
        data.set('summary', summary);
        data.set('imageLink', imageLink);
        data.set('content', content);
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
            <input type="summary" 
                placeholder={'Summary'}
                value={summary} 
                onChange={ev => setSummary(ev.target.value)}/>
            <input type="url" 
                placeholder={'Image Link'}
                value={imageLink} 
                onChange={ev => setImageLink(ev.target.value)}/>
            <MDEditor 
                value={content} 
                height="100%"
                data-color-mode="light"
                onChange={newValue => setContent(newValue)}/>
            <button className='create-post'>Create Post</button>
        </form>
    )
}