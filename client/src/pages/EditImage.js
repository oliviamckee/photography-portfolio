import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactCloudinaryUploader from "@app-masters/react-cloudinary-uploader";
import { QUERY_IMAGE } from "../utils/queries";
import { EDIT_IMAGE } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

const EditImage = () => {
    const { id } = useParams();
    const { data } = useQuery(QUERY_IMAGE, {
        variables: { id: id },
    });

    const image = data?.image || [];

    const [title, setTitle] = useState(image.title);
    const titleChange = (event) => {
        setTitle(event.target.value);
    };

    const [category, setCategory] = useState(image.category);
    const categoryChange = (event) => {
        setCategory(event.target.value);
    };

    // cloudinary stuff for images
    let choices = {
        cloud_name: "oliviacm",
        upload_preset: "ujb638tm",
        multiple: true,
        returnJustUrl: true
    };

    const [url, setUrl] = useState(image.url);

    const uploadImage = (event) => {
        event.preventDefault();

        ReactCloudinaryUploader
            .open(choices)
            .then(image => {
                setUrl(image[0]);
            });
    }
    // end cloudinary

    const [editImage] = useMutation(EDIT_IMAGE, {
        update(cache, { data: { editImage } }) {
            const { images } = cache.readQuery({ query: EDIT_IMAGE });
            cache.writeQuery({
                query: EDIT_IMAGE,
                data: { images: [editImage, ...images] },
            });
        },
    });

    const navigate = useNavigate();
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await editImage({
                variables: {
                    title,
                    category,
                    url,
                    id
                },
            });
        } catch (e) {
            console.error(e);
        }
        navigate("/");
    };

    return (
        <div className="p-3 w-50 mx-auto">
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input className="form-control"
                        placeholder="Enter image title"
                        value={title}
                        onChange={titleChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select className="form-select"
                        value={category}
                        onChange={categoryChange}>
                        <option value={false}>Select a category</option>
                        <option value="People">People</option>
                        <option value="Places">Places</option>
                        <option value="Animals">Animals</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <br></br>
                    <button id="upload"
                        className="button3"
                        onClick={uploadImage}>Upload</button>
                </div>
                <button type="submit" className="button1">Submit</button>
            </form>
        </div>
    )
}

export default EditImage;