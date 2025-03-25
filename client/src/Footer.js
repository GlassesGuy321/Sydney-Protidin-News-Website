import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
   const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/post`).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            })
        })
    }, [])
    return (
        <footer>
            <div className="footer-section">
                <h3>
                    <img src="/logo192.png" width={"32px"} height={"32px"}/>
                    About us
                </h3>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>
            <div className="footer-section">
                <h3>Current News</h3>
                <ul className="current-news-list">
                    {posts.length > 0 && posts.slice(0,3).map(post => (
                        <li key={`${post._id}`}>
                            <Link to={`/post/${post._id}`}>{post.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="footer-section">
                <h3>Contact us</h3>
                <div className="contact-icons">
                    <a target="_blank" href="https://www.facebook.com/sydneyprotidin" class="fa fa-facebook"></a>
                    <a target="_blank" href="mailto:someone@example.com" class="fa fa-google"></a>
                    <a target="_blank" href="#" class="fa fa-youtube"></a>
                </div>
            </div>
        </footer>
    )
}
