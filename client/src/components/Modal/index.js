import React from 'react';
import { Link } from "react-router-dom";

function Modal({ onClose, currentPhoto }) {
    const { title, createdAt, url, _id } = currentPhoto;

    const deleteSubmit = async (event) => {
        console.log("delete button clicked");
    };

    return (
        <div className="modalBackdrop" onClick={onClose}>
            <div className="modalContainer p-2 d-flex flex-column">
                <div className='d-flex flex-wrap justify-content-between align-items-center'>
                    <h4>{title}</h4>
                    <div className='d-flex align-items-center'>
                        <p className='mt-2'>posted on {createdAt}</p>
                        <button onClick={onClose} className="button1">
                            Close
                        </button>
                    </div>
                </div>
                <img className="modalImage img-fluid pb-2 px-2" src={url} alt={title} />
                <div>
                    <Link className='button1 p-2' to={`/edit/${_id}`}>Edit</Link>
                    <button className='button1' onClick={deleteSubmit}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;