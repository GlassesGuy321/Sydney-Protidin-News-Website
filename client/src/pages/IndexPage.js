import { useEffect, useState } from "react";
import Post from "../Post";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
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
            {posts.length > 0 && posts.map(post => (
                <Post key={post._id} {...post} />
            ))}
        </>
      );
}