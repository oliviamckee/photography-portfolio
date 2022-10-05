import React from 'react';
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_IMAGE } from "../../utils/mutations";

function Modal({ onClose, currentPhoto }) {
    const { title, createdAt, url, _id } = currentPhoto;

    const [deleteImage] = useMutation(DELETE_IMAGE, {
        update(cache, { data: { deleteImage } }) {
            const { images } = cache.readQuery({ query: DELETE_IMAGE });
            cache.writeQuery({
                query: DELETE_IMAGE,
                data: { images: [deleteImage, ...images] },
            });
        },
    });

    const deleteSubmit = async () => {
        try {
            await deleteImage({
                variables: { id: _id },
            });
        } catch (e) {
            console.error(e);
        }
        window.location.reload(false);
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