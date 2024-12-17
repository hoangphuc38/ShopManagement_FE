import { useEffect, useState } from "react";
import shopAPI from "../../api/shopAPI";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const formatDate = (date) => {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };
    const formattedDate = new Date(date).toLocaleString('en-GB', options);
    return formattedDate;
};

function ShopScreen() {
    const [shops, setShops] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchText, setSearchText] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        fetchAPI()
    }, [pageIndex, searchText]);

    const fetchAPI = async () => {
        try {
            const res = await shopAPI.getAll(pageIndex, pageSize, searchText, "", "");
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
            </div>

            <div className="text-base mb-4">Found {totalRecords} results</div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-[#1C6BA0] text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium">Shop Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Shop Address</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Owner Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium">Created Date</th>
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
                                <td className="px-6 py-4 text-sm text-gray-700">{shop.ownerName}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{formatDate(shop.createdDate)}</td>
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
        </div>
    );
}

export default ShopScreen;