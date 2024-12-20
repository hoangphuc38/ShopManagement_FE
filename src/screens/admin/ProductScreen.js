import { useEffect, useState } from "react";
import productAPI from "../../api/productAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function ProductScreen() {
    const [currentPage, setCurrentPage] = useState(1); // State to store the product data
    const [products, setProducts] = useState([]);
    const [pageIndex, setPageIndex] = useState(1); // Current page index
    const [pageSize, setPageSize] = useState(10);  // Number of items per page
    const [searchText, setSearchText] = useState("");  // Search text (if needed)
    const [totalPage, setTotalPage] = useState(0);  // Total pages from the API response

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                let res = await productAPI.getAll(pageIndex, pageSize, searchText, "", "");
                console.log("Products: ", res.data.results);
                setProducts(res.data.results);
                setTotalPage(res.data.totalOfPages); // Set total pages based on API response
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
    }, [pageIndex, searchText]);  // Fetch data when pageIndex or searchText changes

    // Handle pagination page change
    const handlePageChange = (pageNumber) => {
        setPageIndex(pageNumber);  // Set the current page number
        setCurrentPage(pageNumber);  // Optionally update currentPage for UI
    };

    // Handle Delete
    const handleDelete = async (id) => {
        try {
            const res = await productAPI.deleteProduct(id);
            const filteredProducts = products.filter((product) => product.productId !== id);
            setProducts(filteredProducts);
            alert(res.message);
        }
        catch (error) {
            console.error("Error fetching data: ", error);
            if (error.response && error.response.status === 400) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("An unexpected error occurred. Please try again later.");
            }
        }
    };

    // Handle Modify (For simplicity, we'll just log the product to be modified)
    const handleModify = (product) => {
        navigate(`/product/${product.productId}`);
        // You could show a modal or navigate to a modify page here
    };

    const handleAddProduct = () => {
        navigate("/product/newproduct")
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-3">
                {/* Search Bar */}
                <div className="relative w-1/3">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search products..."
                        className="px-4 py-2 pl-10 border rounded-md w-full"
                    />
                    {/* Replace <i> with FontAwesomeIcon */}
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                </div>

                {/* Add Product Button */}
                <button
                    onClick={handleAddProduct}
                    className="px-4 py-2 bg-[#1C6BA0] text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600"
                >
                    <FontAwesomeIcon icon={faPlus} color="white" size={18} />
                    <span>Add Product</span>
                </button>
            </div>
            <div className="py-6">
                <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-[#1C6BA0]">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-white">Product Name</th>
                            <th className="px-4 py-2 text-left font-semibold text-white">Image</th>
                            <th className="px-4 py-2 text-left font-semibold text-white">Price</th>
                            <th className="px-4 py-2 text-left font-semibold text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item.productId} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2 text-gray-700">{item.productName}</td>
                                <td className="px-4 py-2">
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.productName}
                                            className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-gray-700">${item.price}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleModify(item)}
                                        className="px-4 py-2 bg-[#28a745] text-white rounded-md hover:bg-green-600 mr-2"
                                    >
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.productId)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 flex justify-center space-x-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-md text-sm font-semibold bg-gray-200 text-gray-700 disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {/* Page Number Buttons */}
                    {Array.from({ length: totalPage }).map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)} // Change to use page index
                            className={`px-4 py-2 rounded-md text-sm font-semibold ${currentPage === index + 1
                                ? "bg-[#1C6BA0] text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPage}
                        className="px-4 py-2 rounded-md text-sm font-semibold bg-gray-200 text-gray-700 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductScreen;