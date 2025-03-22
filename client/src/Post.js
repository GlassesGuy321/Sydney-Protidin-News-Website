import {format} from 'date-fns';

export default function Post({title, summary, imageLink, cover, content, createdAt, author}) {
    return (
        <section className="post">
        <div className="preview">
          <img src={imageLink} alt="Banner" />
        </div>
        <div className="texts">
          <h2> {title} </h2>
          <p className="info">
            <a href="" className="author">{author.username}</a>
            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </section>
    );
}