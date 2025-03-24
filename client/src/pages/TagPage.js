import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../Post";

export default function TagPage() {
    const [posts, setPosts] = useState([]);
    const { tag } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/post`)
            .then(response => response.json())
            .then(posts => setPosts(posts));
    }, []);

    const filteredPosts = tag
        ? posts.filter(post => post.tags.includes(tag))
        : posts;

    return (
        <>
            <div className="tag-headline">
                <h2>{tag}</h2>    
            </div>            
            {filteredPosts.length > 0 ? (
                filteredPosts.map(post => <Post key={post._id} {...post} />)
            ) : (
                <p>No posts found for this tag.</p>
            )}
        </>
    );
}
