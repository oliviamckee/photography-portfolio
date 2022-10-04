import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_IMAGES } from '../utils/queries';
import Images from '../components/Images';
// import Auth from '../utils/auth';

const Home = () => {
    const { loading, data } = useQuery(QUERY_IMAGES);

    const images = data?.images || [];

    //   const loggedIn = Auth.loggedIn();

    return (
        <main>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Images images={images} />
                )}
            </div>
        </main>
    );
};
export default Home;
