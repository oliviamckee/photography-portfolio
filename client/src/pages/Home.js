import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_IMAGES } from '../utils/queries';
import Image from '../components/Image';
import Modal from '../components/Modal';
import AddImage from '../components/AddImage'
import Auth from '../utils/auth';

const Home = () => {
    const [categories] = useState([
        { name: "People" },
        { name: "Places" },
        { name: "Animals" }
    ]);

    const [currentCategory, setCurrentCategory] = useState();

    const { data } = useQuery(QUERY_IMAGES);
    const images = data?.images || [];

    function filterImages() {
        if (!currentCategory) {
            return images;
        } return images.filter((image) => image.category === currentCategory)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPhoto, setCurrentPhoto] = useState();
    const toggleModal = (image, i) => {
        setCurrentPhoto({ ...image, index: i });
        setIsModalOpen(!isModalOpen);
    }

    const [isAddOpen, setIsAddOpen] = useState(false);

    return (
        <main className='d-flex flex-column flex-wrap'>
            <nav className='d-flex flex-wrap w-100 justify-content-center'>
                <button className="button1"
                    onClick={() => {
                        setCurrentCategory()
                        setIsAddOpen(false)
                    }}>All</button>
                {categories.map((category) => (
                    <button className="button1"
                        key={category.name}
                        onClick={() => {
                            setCurrentCategory(category.name)
                            setIsAddOpen(false)
                        }}>{category.name} </button>
                ))}
                {Auth.loggedIn() && <button className="button3"
                    onClick={() => setIsAddOpen(true)}>Add</button>}
            </nav>
            <div>
                <div>
                    {isModalOpen && (
                        <Modal currentPhoto={currentPhoto} onClose={toggleModal} />
                    )}
                </div>

                {isAddOpen ? (
                    <AddImage />
                ) : (
                    <div className='d-flex flex-wrap justify-content-center'>
                        {filterImages().map((image, i) => (
                            <Image key={image._id}
                                image={image}
                                toggleModal={toggleModal}
                                i={i} />
                        ))}
                    </div>
                )}


            </div>
        </main >
    );
};
export default Home;
