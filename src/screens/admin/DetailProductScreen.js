import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import assetAPI from '../../api/assetAPI';
import productAPI from '../../api/productAPI';
import { useNavigate } from 'react-router-dom';

function DetailProductScreen() {
    const { productId } = useParams();

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [publicId, setPublicId] = useState("");

    const navigate = useNavigate();

    // Handle changes in name and price input fields
    const handleNameChange = (e) => setProductName(e.target.value);
    const handlePriceChange = (e) => setProductPrice(e.target.value);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                let res = await productAPI.getProduct(productId);
                setProductName(res.data.productName);
                setProductPrice(res.data.price);
                setProductImage(res.data.imageUrl);
            } catch (error) {
                console.error("Error fetching data: ", error);
                if (error.response && error.response.status === 400) {
                    alert(`Error: ${error.response.data.message}`);
                } else {
                    alert("An unexpected error occurred. Please try again later.");
                }
            }
        };

        fetchAPI();
    }, []);

    // Handle image add
    const handleAddImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const response = await assetAPI.uploadImage('product', file);
                // Assuming response.data contains the uploaded image URL and publicId
                setProductImage(response.data.urlImage);
                setPublicId(response.data.publicId);
                alert(response.message);
            } catch (error) {
                console.error('Image upload failed:', error);
                if (error.response && error.response.status === 400) {
                    alert(`Error: ${error.response.data.message}`);
                } else {
                    alert("An unexpected error occurred. Please try again later.");
                }
            }
        }
    };

    // Handle delete image
    const handleDeleteImage = async () => {
        if (publicId) {
            try {
                const res = await assetAPI.deleteImage(publicId);
                setProductImage(null); // Remove the image
                alert(res.message);
            }
            catch (error) {
                console.error('Image delete failed:', error);
                if (error.response && error.response.status === 400) {
                    alert(`Error: ${error.response.data.message}`);
                } else {
                    alert("An unexpected error occurred. Please try again later.");
                }
            }
        }
        setProductImage(null);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("name: ", productName);
        console.log("price: ", productPrice);
        console.log("image: ", productImage);

        try {
            const res = await productAPI.updateProduct(productId, productName, productPrice, productImage);
            navigate("/product");
            alert(res.message);
        }
        catch (error) {
            console.error('Update product failed:', error);
            if (error.response && error.response.status === 400) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("An unexpected error occurred. Please try again later.");
            }
        }
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between gap-6">
                <div className="w-1/3">
                    <div className="flex flex-col items-center">
                        {productImage ? (
                            <>
                                <img
                                    src={productImage}
                                    alt="Product"
                                    className="w-full h-72 object-cover rounded-md border border-gray-300 mb-4"
                                />
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleDeleteImage}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                        Delete Image
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-full h-72 bg-gray-200 rounded-md border border-gray-300 mb-4 flex items-center justify-center">
                                    <span className="text-gray-500">No Image</span>
                                </div>
                                <button
                                    onClick={() => document.getElementById('imageInput').click()}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                    <FontAwesomeIcon icon={faImage} className="mr-2" />
                                    Add Image
                                </button>
                                <input
                                    type="file"
                                    id="imageInput"
                                    accept="image/*"
                                    onChange={handleAddImage}
                                    className="hidden"
                                />
                            </>
                        )}
                    </div>
                </div>

                <div className="flex flex-col w-1/2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-semibold text-gray-700 mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={productName}
                            onChange={handleNameChange}
                            placeholder="Enter product name"
                            className="p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="price" className="font-semibold text-gray-700 mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={productPrice}
                            onChange={handlePriceChange}
                            placeholder="Enter product price"
                            className="p-3 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        onClick={handleSubmit}
                        className="mt-4 px-6 py-3 bg-[#1C6BA0] text-white rounded-md hover:bg-blue-600"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetailProductScreen;