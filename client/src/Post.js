import {format} from 'date-fns';
import {Link} from 'react-router-dom'

export default function Post({_id, title, summary, imageLink, cover, content, createdAt, author}) {
    return (
      <section className="post">
        <div className="preview">
          <Link to={`/post/${_id}`}> 
            <img src={imageLink} alt="Banner" />
          </Link>
        </div>
        <div className="texts">
          <Link to={`/post/${_id}`}> 
            <h2> {title} </h2>
          </Link>
          <p className="info">
            <a href="" className="author">{author.username}</a>
            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </section>
    );
}