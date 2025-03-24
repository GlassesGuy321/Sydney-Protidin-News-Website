import {format} from 'date-fns';
import {Link} from 'react-router-dom'

export default function Card({_id, title, tags, imageLink, createdAt, author, isLatest }) {
    return (
        <div className="card-preview" 
            style={{
                backgroundImage: `url(${imageLink})`,
                width: '100%'
            }}>
            <Link to={`/post/${_id}`} className="card-link">
                <div className="card-overlay"></div>
                <div className="texts-on-image">
                    <div className='tags-list'>
                        {tags.length > 0 && tags.map(tag => (
                            <Link key={tag} to={`/${tag}`}>{tag}</Link>
                        ))}
                    </div>
                    <Link to={`/post/${_id}`}> 
                        <h2> {title} </h2>
                    </Link>
                    <p className="info">
                        <a href="" className="author">{author.username}</a>
                        <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
                    </p>
                </div>
            </Link>
        </div>
    );
}