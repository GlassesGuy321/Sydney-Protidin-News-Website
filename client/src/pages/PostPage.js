import { format } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { marked } from 'marked';
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";

export default function PostPage() {
    const [postInfo,setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                });
            });
    }, [id]);

    if (!postInfo) return '';
    
    function formatMarkdown(content) {
        return DOMPurify.sanitize(marked(content, { gfm: true, breaks: true }));
    }

    return (
        <>
            <Helmet>
                <meta property="og:title" content={`${postInfo.title}`} />
                <meta property="og:description" content="Check out the latest news and articles!" />
                <meta property="og:image" content={`${postInfo.imageLink}`} />
                <link rel="image_src" href={`${postInfo.imageLink}`} />
                <meta property="og:image:width" content="600" />
                <meta property="og:image:height" content="400" />
                <meta property="og:url" content={`https://sydney-protidin.onrender.com/post/${postInfo._id}`} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={`${postInfo.imageLink}`} />
            </Helmet>
            <div className="post-page">
                <div className='tags-list'>
                    {postInfo.tags.length > 0 && postInfo.tags.map(tag => (
                        <Link key={tag} to={`/${tag}`}>{tag}</Link>
                    ))}
                </div>
                <h1>{postInfo.title}</h1>
                <div className="credentials">
                    <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
                    <p>/</p>
                    <a href="" className="author">{postInfo.author.username}</a>
                </div>
                {userInfo.id === postInfo.author._id && (
                    <div className="edit-row">
                        <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            Edit this post
                        </Link>
                    </div>
                )}
                <div className="image">
                    <img src={postInfo.imageLink} alt={postInfo.title}/>
                </div>
                <div className="content" dangerouslySetInnerHTML={{__html:formatMarkdown(postInfo.content)}} />
            </div>
        </>
    )
}