import React, { useState } from "react";
import ReactCloudinaryUploader from "@app-masters/react-cloudinary-uploader";
import { QUERY_IMAGES } from "../../utils/queries";
import { ADD_IMAGE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

const AddImage = () => {
    const [title, setTitle] = useState("");
    const titleChange = (event) => {
        setTitle(event.target.value);
    };

    const [category, setCategory] = useState("");
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

    const [url, setUrl] = useState("");

    const uploadImage = (event) => {
        event.preventDefault();

        ReactCloudinaryUploader
            .open(choices)
            .then(image => {
                setUrl(image[0]);
            });
    }
    // end cloudinary

    const [addImage] = useMutation(ADD_IMAGE, {
        update(cache, { data: { addImage } }) {
            const { images } = cache.readQuery({ query: QUERY_IMAGES });
            cache.writeQuery({
                query: QUERY_IMAGES,
                data: { images: [addImage, ...images] },
            });
        },
    });

    const handleFormSubmit = async (event) => {
        // event.preventDefault();
        try {
            await addImage({
                variables: {
                    title,
                    category,
                    url
                },
            });
        } catch (e) {
            console.error(e);
        }
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

export default AddImage;