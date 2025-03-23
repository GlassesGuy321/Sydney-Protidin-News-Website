import { useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
    const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        console.log(`${process.env.REACT_APP_BACKEND_URL}/post`)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`, {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, [setUserInfo]);

    function logout() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
            credentials:'include',
            method: 'POST',
        });
        setUserInfo(null);
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">সিডনি প্রতিদিন</Link>
            <nav>
                {username && (
                    <>
                        <span> <i>Hello, {username}</i> </span>
                        <Link to="/create">Create new post</Link>
                        <Link to ='/' onClick={logout}>Logout</Link>
                    </>
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}