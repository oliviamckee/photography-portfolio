import React from 'react';
import { Link } from 'react-router-dom';

const Images = ({ images }) => {
    if (!images.length) {
        return <h3>No Images Yet</h3>;
    }

    return (
        <div className='d-flex'>
            {images &&
                images.map(image => (
                    <div key={image._id} className="imageCard">
                        <p>
                            <Link to={`/profile/${image.username}`}
                                className="usernameLink mx-1">
                                {image.username}
                            </Link>
                            posted on {image.createdAt}
                        </p>
                        <Link to={`/image/${image._id}`}>
                            <img alt={image.alt} src={image.url}></img>
                        </Link>

                    </div>
                ))}
        </div>
    );

};

export default Images;