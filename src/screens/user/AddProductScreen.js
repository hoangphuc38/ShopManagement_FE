import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import productAPI from "../../api/productAPI";
import detailShopAPI from "../../api/detailshopAPI";

function AddProductScreen() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState("");

    const { shopID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const res = await productAPI.getAll(currentPage, pageSize, searchText, "", "");
                setProducts(res.data.results);
                setTotalPage(res.data.totalOfPages);  // Cập nhật tổng số trang từ API
            } catch (error) {
                console.error("Error fetching data: ", error);
                alert("An error occurred while fetching products.");
            }
        };
        fetchAPI();
    }, [currentPage, searchText]);  // Chỉ gọi lại API khi trang thay đổi

    // Hàm để thay đổi sản phẩm được chọn
    const handleCheckboxChange = (productId) => {
        if (selectedProduct === productId) {
            setSelectedProduct(null);  // Nếu sản phẩm đang chọn thì bỏ chọn
        } else {
            setSelectedProduct(productId);  // Chọn sản phẩm mới
        }
    };

    // Hàm để mở modal khi nhấn nút AddProduct
    const handleAddProduct = () => {
        if (!selectedProduct) {
            alert("Please select a product first.");
            return;
        }
        setShowModal(true);  // Hiển thị modal nhập số lượng
    };

    // Hàm để đóng modal
    const closeModal = () => {
        setShowModal(false);
        setQuantity(1);  // Reset lại số lượng
    };

    // Hàm để xử lý thêm sản phẩm vào giỏ
    const handleConfirmAddProduct = async () => {
        try {
            if (!quantity) {
                alert("Quantity is required!");
                return;
            }

            await detailShopAPI.addDetail(shopID, selectedProduct, quantity);

            alert(`Product added successfully`);
            setShowModal(false);  // Đóng modal
            setQuantity(1);  // Reset lại số lượng
            navigate(`/shop/${shopID}`);
        } catch (error) {
            console.error("Error adding product: ", error);
            alert("An error occurred while adding product.");
        }
    };

    // Hàm để thay đổi trang
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPage) {
            setCurrentPage(pageNumber);  // Cập nhật trang hiện tại
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-3">
                {/* Search Bar */}
                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="px-4 py-2 pl-10 border rounded-md w-full"
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                </div>

                {selectedProduct && (
                    <button
                        onClick={handleAddProduct}
                        className="px-4 py-2 bg-[#1C6BA0] text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600"
                    >
                        <FontAwesomeIcon icon={faPlus} color="white" size={18} />
                        <span>Add for Shop</span>
                    </button>
                )}

            </div>

            <div className="py-6">
                <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-[#1C6BA0]">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-white">Select</th>
                            <th className="px-4 py-2 text-left font-semibold text-white">Product Name</th>
                            <th className="px-4 py-2 text-left font-semibold text-white">Image</th>
                            <th className="px-4 py-2 text-left font-semibold text-white">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item.productId} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedProduct === item.productId}
                                        onChange={() => handleCheckboxChange(item.productId)}
                                    />
                                </td>
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
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add Product Button, visible after selecting a product */}

            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center space-x-2 mt-6">
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

            {/* Modal to enter quantity */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4 text-center">Enter Quantity</h3>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-gray-700 mb-2">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md"
                                min="1"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmAddProduct}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddProductScreen;
