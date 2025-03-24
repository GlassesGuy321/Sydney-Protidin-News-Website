import { useEffect, useState } from "react";
import Post from "../Post";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Card from "../Card";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    const tags = ['Technology', 'Health', 'Finance', 'Education', 'Entertainment'];
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/post`).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, [])

    return (
        <>
            <div className="top-section">
                <div className="left-caption">
                    Top Stories
                </div>
                <Marquee
                    className="top-news"
                    pauseOnHover='true'
                    speed={100}
                >
                    {posts.length > 0 && posts.map(post => (
                        <Link key={post._id} to={`/post/${post._id}`}> {post.title} </Link>
                    ))}
                </Marquee>
            </div>
            
            <div className="tag-headline">
                <h2> Hot right now </h2>
            </div>

            {posts.length > 0 && posts
                .slice(0, 1) 
                .map(post => (
                    <Card key={post._id} {...post} isLatest={true} />
                ))
            }

            <div className="latest-tags">
                {tags.map(tag => (
                    <div className="tag-container" key={tag}>
                        <div className="tag-headline">
                            <Link to={`/${tag}`}>
                                <h2>{tag}</h2>    
                            </Link>
                        </div>
                        {posts.filter(post => post.tags.includes(tag)).length > 0 ? (
                            posts
                                .filter(post => post.tags.includes(tag)) 
                                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
                                .slice(0, 3)
                                .map(post => (
                                    <Card key={post._id} {...post} />
                                ))
                        ) : (
                            <p>No posts found for this tag.</p>
                        )}
                    </div>
                ))}
            </div>


            <div className="tag-headline">
                <h2> All News </h2>
            </div>

            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post} />
            ))}
        </>
      );
}