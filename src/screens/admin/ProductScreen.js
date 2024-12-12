import { useEffect, useState } from "react";
import productAPI from "../../api/productAPI";

function ProductScreen() {
    const [currentPage, setCurrentPage] = useState(1); // State to store the product data
    const [products, setProducts] = useState([]);
    const itemsPerPage = 5;

    const [pageIndex, setPageIndex] = useState("1");
    const [pageSize, setPageSize] = useState("10");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                let res = await productAPI.getAll(pageIndex, pageSize, searchText, "", "");
                console.log("check: ", res.data.results)
                setProducts(res.data.results);
            }
            catch (error) {
                console.error("Error fetching data: ", error);
                if (error.response && error.response.status === 400) {
                    alert(`Error: ${error.response.data.message}`);
                } else {
                    alert("An unexpected error occurred. Please try again later.");
                }
            }
        }

        fetchAPI();
    }, [])

    // Calculate the index of the first and last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    // Change page function
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle Delete
    const handleDelete = (id) => {
        const filteredProducts = products.filter((product) => product.id !== id);
        setProducts(filteredProducts);
    };

    // Handle Modify (For simplicity, we'll just log the product to be modified)
    const handleModify = (product) => {
        console.log("Modify product:", product);
        // You could show a modal or navigate to a modify page here
    };

    return (
        <div className="container mx-auto p-4">
            <div className="p-6">
                <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Product Name</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Image</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Price</th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
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
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                                    >
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
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
                    {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 rounded-md text-sm font-semibold ${currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductScreen;