import { format } from "date-fns";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function PostPage() {
    const [postInfo,setPostInfo] = useState(null);
    const {id} = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                setPostInfo(postInfo);
                });
            });
    }, []);

    if (!postInfo) return 'bruh';
    
    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <div className="credentials">
                <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
                <p>/</p>
                <a href="" className="author">{postInfo.author.username}</a>
            </div>
            <div className="image">
                <img src={postInfo.imageLink} alt={postInfo.title}/>
            </div>
            <div>{postInfo.summary}</div>
            <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div>
    )
}