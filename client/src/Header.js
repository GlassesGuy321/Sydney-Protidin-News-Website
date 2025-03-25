import { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
            credentials: 'include',
        })
        .then(response => response.json())
        .then(userInfo => {
            if (userInfo) {
                setUserInfo(userInfo);
            }
        })
        .catch(error => console.error("Error fetching profile:", error));
    }, [setUserInfo]);

    function logout() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
            credentials:'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    function toggleMenu() {
        // Toggle the active class to show the menu and overlay
        document.querySelector('.overlay').classList.add('active');
        document.querySelector('.slide-menu').classList.add('active');
      }
      
      function closeMenu() {
        // Remove the active class to hide the menu and overlay
        document.querySelector('.overlay').classList.remove('active');
        document.querySelector('.slide-menu').classList.remove('active');
      }
      
      
    const username = userInfo?.username;

    const tags = ["Technology", "Health", "Finance", "Education", "Entertainment"];

    return (
        <header>
            <section className="top">
                <img src="/SPBanner2.png" alt="banner"/>
            </section>
            <section className='bottom'>
                <Link to="/" className="logo">সিডনি প্রতিদিন</Link>
                <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
                </div>
                <nav className="nav-links">
                {username && (
                    <>
                    {tags.map(tag => (
                        <Link key={tag} to={`/${tag}`}>{tag}</Link>
                    ))}
                    <Link to="/create">Create new post</Link>
                    <Link to='/' onClick={logout}>Logout</Link>
                    </>
                )}
                {!username && (
                    <>
                    {tags.map(tag => (
                        <Link key={tag} to={`/${tag}`}>{tag}</Link>
                    ))}
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    </>
                )}
                </nav>
            </section>

            <div className="overlay" onClick={closeMenu}></div>

            <nav className="slide-menu">
                <div className="close-btn" onClick={closeMenu}>&#10005;</div>
                {username && (
                <>
                    {tags.map(tag => (
                    <Link key={tag} to={`/${tag}`} onClick={closeMenu}>{tag}</Link>
                    ))}
                    <Link to="/create" onClick={closeMenu}>Create new post</Link>
                    <Link to='/' onClick={logout}>Logout</Link>
                </>
                )}
                {!username && (
                <>
                    {tags.map(tag => (
                    <Link key={tag} to={`/${tag}`} onClick={closeMenu}>{tag}</Link>
                    ))}
                    <Link to="/login" onClick={closeMenu}>Login</Link>
                    <Link to="/register" onClick={closeMenu}>Register</Link>
                </>
                )}
            </nav>
        </header>
    );
}