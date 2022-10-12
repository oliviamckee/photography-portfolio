import React from 'react';

const Images = ({ image, toggleModal, i }) => {
    return (
        <div className='imageBackground m-2 d-flex align-items-center justify-content-center'>
            <img key={image._id}
                className=".img-fluid imageCard"
                alt={image.title}
                src={image.url}
                onClick={() => toggleModal(image, i)}></img>
        </div>
    );
};

export default Images;