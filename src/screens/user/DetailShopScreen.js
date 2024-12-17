import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import detailShopAPI from "../../api/detailshopAPI";

function DetailShopScreen() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [totalRecords, setTotalRecords] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [newQuantity, setNewQuantity] = useState(0);

    const { shopID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                let res = await detailShopAPI.getAll(shopID, currentPage, pageSize, searchText, "", "");
                setProducts(res.data.results);
                setTotalPage(res.data.totalOfPages);
                setTotalRecords(res.data.totalOfNumberRecord);
            } catch (error) {
                console.error("Error fetching products: ", error);
                alert("An error occurred while fetching products.");
            }
        };

        fetchAPI();
    }, [currentPage, searchText]);

    // Thay đổi trang phân trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Xóa sản phẩm
    const handleDelete = async (id) => {
        try {
            await detailShopAPI.deleteDetail(shopID, id);
            setProducts(products.filter((item) => item.product.productId !== id)); // Cập nhật danh sách sau khi xóa
            alert("Product deleted successfully");
        } catch (error) {
            console.error("Error deleting product: ", error);
            alert("An error occurred while deleting product.");
        }
    };

    // Hiển thị modal để chỉnh sửa số lượng
    const handleModify = (product) => {
        setCurrentProduct(product); // Lưu sản phẩm hiện tại vào state
        setNewQuantity(product.quantity); // Thiết lập số lượng hiện tại vào input
        setShowModal(true); // Hiển thị modal
    };

    // Cập nhật số lượng sản phẩm
    const handleUpdateQuantity = async () => {
        if (newQuantity < 0) {
            alert("Quantity must be a positive number");
            return;
        }

        try {
            // Gọi API để cập nhật số lượng
            await detailShopAPI.updateDetail(shopID, currentProduct.product.productId, newQuantity);
            setProducts(products.map(item =>
                item.product.productId === currentProduct.product.productId ? {
                    ...item,
                    quantity: newQuantity
                } : item
            ));
            setShowModal(false);
            alert("Quantity updated successfully");
        } catch (error) {
            console.error("Error updating quantity: ", error);
            alert("An error occurred while updating quantity.");
        }
    };

    // Thêm sản phẩm mới
    const handleAddProduct = () => {
        navigate(`/shop/${shopID}/newproduct`); // Dẫn tới trang thêm sản phẩm
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-3">
                {/* Thanh tìm kiếm */}
                <div className="relative w-1/3">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search products..."
                        className="px-4 py-2 pl-10 border rounded-md w-full"
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                </div>

                {/* Nút thêm sản phẩm */}
                <button
                    onClick={handleAddProduct}
                    className="px-4 py-2 bg-[#1C6BA0] text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600"
                >
                    <FontAwesomeIcon icon={faPlus} color="white" size={18} />
                    <span>Add Product</span>
                </button>
            </div>

            <div className="text-base mt-5">Found {totalRecords} results</div>

            <div className="py-2">
                <table className="min-w-full table-auto bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-[#1C6BA0]">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-white">Product Name</th>
                            <th className="px-4 py-2 text-left font-semibold text-white">Image</th>
                            <th className="px-4 py-2 text-left font-semibold text-white">Price</th>
                            <th className="px-4 py-2 text-left font-semibold text-white">Quantity</th>
                            <th className="px-4 py-2 text-left font-semibold text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item.product.productId} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2 text-gray-700">{item.product.productName}</td>
                                <td className="px-4 py-2">
                                    {item.product.imageUrl ? (
                                        <img
                                            src={item.product.imageUrl}
                                            alt={item.product.productName}
                                            className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 bg-gray-200 rounded-lg border border-gray-300 flex items-center justify-center">
                                            <span className="text-gray-500">No Image</span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-gray-700">${item.product.price}</td>
                                <td className="px-4 py-2 text-gray-700 font-bold">{item.quantity}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleModify(item)}
                                        className="px-4 py-2 bg-[#28a745] text-white rounded-md hover:bg-green-600 mr-2"
                                    >
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.product.productId)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Phân trang */}
                <div className="mt-4 flex justify-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-md text-sm font-semibold bg-gray-200 text-gray-700 disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPage }).map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 rounded-md text-sm font-semibold ${currentPage === index + 1
                                ? "bg-[#1C6BA0] text-white"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPage}
                        className="px-4 py-2 rounded-md text-sm font-semibold bg-gray-200 text-gray-700 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Modal để thay đổi số lượng */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-96">
                        <h3 className="text-xl font-semibold mb-4 text-center">Update Quantity</h3>
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-gray-700 mb-2">New Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                value={newQuantity}
                                onChange={(e) => setNewQuantity(Number(e.target.value))}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateQuantity}
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

export default DetailShopScreen;
