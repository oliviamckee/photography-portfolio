import React from 'react';

const Images = ({ image, toggleModal, i }) => {
    return (
        <img key={image._id}
            className=".img-fluid m-2 imageCard"
            alt={image.title}
            src={image.url}
            onClick={() => toggleModal(image, i)}></img>
    );
};

export default Images;