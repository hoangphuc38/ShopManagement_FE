import { useContext, useEffect, useState } from "react";
import shopAPI from "../../api/shopAPI";
import { AppContext } from "../../contexts/appContext";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };
    const formattedDate = new Date(date).toLocaleString('en-GB', options);
    return formattedDate;
};

function ShopCustomerScreen() {
    const { customerID } = useContext(AppContext);

    const navigate = useNavigate();

    const [shops, setShops] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [currentShop, setCurrentShop] = useState(null); // Để lưu shop hiện tại đang được chỉnh sửa
    const [shopName, setShopName] = useState("");
    const [shopAddress, setShopAddress] = useState("");

    useEffect(() => {
        fetchAPI()
    }, [pageIndex, searchText]);

    const fetchAPI = async () => {
        try {
            const res = await shopAPI.getAllOfUser(customerID, pageIndex, pageSize, searchText, "", "");
            setShops(res.data.results);
            setTotalPages(res.data.totalOfPages);
            setTotalRecords(res.data.totalOfNumberRecord);
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

    // Hàm để thay đổi trang
    const handlePageChange = (pageNumber) => {
        setPageIndex(pageNumber);  // Set the current page number
    };

    // Mở modal để thêm shop
    const handleAddShop = () => {
        setShopName(""); // Reset lại giá trị input
        setShopAddress(""); // Reset lại giá trị input
        setShowModalAdd(true); // Mở modal
    };

    // Cập nhật thông tin shop (Thêm shop mới)
    const handleCreateShop = async () => {
        try {
            if (!shopName || !shopAddress) {
                alert("Shop name and address are required!");
                return;
            }

            // Gọi API để tạo shop mới
            await shopAPI.addShop(customerID, shopName, shopAddress);

            alert("Shop created successfully.");
            fetchAPI();
            setShowModalAdd(false);
        } catch (error) {
            console.error("Error creating shop: ", error);
            alert("An error occurred while creating the shop.");
        }
    };

    const handleDelete = async (shopId) => {
        if (window.confirm("Are you sure you want to delete this shop?")) {
            try {
                await shopAPI.deleteShop(shopId);
                alert("Shop deleted successfully.");
                fetchAPI(); // Refresh data after delete
            } catch (error) {
                console.error("Error deleting shop: ", error);
                alert("An error occurred while deleting the shop.");
            }
        }
    }

    const handleDetails = (shopId) => {
        // Chuyển hướng tới trang chi tiết shop
        navigate(`/shop/${shopId}`);
    }

    // Mở modal chỉnh sửa
    const handleModify = (shop) => {
        setCurrentShop(shop); // Lưu shop đang được chỉnh sửa vào state
        setShopName(shop.shopName); // Thiết lập giá trị ban đầu cho input
        setShopAddress(shop.shopAddress); // Thiết lập giá trị ban đầu cho input
        setShowModal(true); // Hiển thị modal
    };

    // Cập nhật thông tin shop
    const handleUpdateShop = async () => {
        try {
            if (!shopName || !shopAddress) {
                alert("Shop name and address are required!");
                return;
            }

            await shopAPI.updateShop(currentShop.shopID, shopName, shopAddress);

            alert("Shop updated successfully.");
            fetchAPI(); // Refresh data after update
            setShowModal(false); // Đóng modal
        } catch (error) {
            console.error("Error updating shop: ", error);
            alert("An error occurred while updating the shop.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-[40px]">
                {/* Search Bar */}
                <div className="relative w-1/3">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search shop..."
                        className="px-4 py-2 pl-10 border rounded-md w-full"
                    />
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    />
                </div>

                {/* Add Shop Button */}
                <button
                    onClick={handleAddShop}
                    className="px-4 py-2 bg-[#1C6BA0] text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600"
                >
                    <FontAwesomeIcon icon={faPlus} color="white" size={18} />
                    <span>Add Shop</span>
                </button>
            </div>

            <div className="text-base mb-4">Found {totalRecords} results</div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-[#1C6BA0] text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium">Shop Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Shop Address</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Created Date</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Actions</th> {/* Actions column */}
                        </tr>
                    </thead>
                    <tbody>
                        {shops.map((shop, index) => (
                            <tr
                                key={shop.shopID}
                                className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-100`}
                            >
                                <td className="px-6 py-4 text-sm text-gray-700">{shop.shopName}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{shop.shopAddress}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{formatDate(shop.createdDate)}</td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <button
                                        onClick={() => handleDetails(shop.shopID)}
                                        className="px-3 py-1 bg-[#28a745] text-white rounded-md hover:bg-green-600 mr-2"
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => handleModify(shop)}
                                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                                    >
                                        Modify
                                    </button>
                                    <button
                                        onClick={() => handleDelete(shop.shopID)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-5">
                <button
                    onClick={() => handlePageChange(pageIndex - 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-l-lg disabled:opacity-50"
                    disabled={pageIndex === 1}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 ${pageIndex === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded-md mx-1`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(pageIndex + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-lg disabled:opacity-50"
                    disabled={pageIndex === totalPages}
                >
                    Next
                </button>
            </div>

            {/* Modal to Edit Shop */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4 text-center">Modify Shop</h3>
                        <div className="mb-4">
                            <label htmlFor="shopName" className="block text-gray-700 mb-2">Shop Name</label>
                            <input
                                type="text"
                                id="shopName"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="shopAddress" className="block text-gray-700 mb-2">Shop Address</label>
                            <input
                                type="text"
                                id="shopAddress"
                                value={shopAddress}
                                onChange={(e) => setShopAddress(e.target.value)}
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
                                onClick={handleUpdateShop}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal to Add Shop */}
            {showModalAdd && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4 text-center">New Shop</h3>
                        <div className="mb-4">
                            <label htmlFor="shopName" className="block text-gray-700 mb-2">Shop Name</label>
                            <input
                                type="text"
                                id="shopName"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="shopAddress" className="block text-gray-700 mb-2">Shop Address</label>
                            <input
                                type="text"
                                id="shopAddress"
                                value={shopAddress}
                                onChange={(e) => setShopAddress(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowModalAdd(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateShop}
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

export default ShopCustomerScreen;