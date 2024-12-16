import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/appContext';
import authAPI from '../../api/authAPI';
import { HubConnectionBuilder } from '@microsoft/signalr';
import notificationAPI from "../../api/notificationAPI";

function Navbar() {
    const { customerName, setCustomerID, customerID } = useContext(AppContext);

    // State để quản lý tooltip thông báo
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [totalUnread, setTotalUnread] = useState(0);
    const [connection, setConnection] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const connect = new HubConnectionBuilder().withUrl("https://localhost:7125/hubs/stock")
            .withAutomaticReconnect()
            .build();
        setConnection(connect);
    }, [])

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log("SignalR connected");
                    connection.on("NewProductNoti", async (noti) => {
                        console.log("noti: ", noti);

                        // Cập nhật danh sách thông báo
                        fetchAPI();

                        // Cập nhật số lượng thông báo chưa đọc
                        setTotalUnread(prevUnread => prevUnread + 1);
                    })
                })
                .catch((error) => {
                    console.error("Error starting SignalR connection:", error);
                })
        }
    }, [connection])

    useEffect(() => {
        fetchAPI();
    }, [])

    const fetchAPI = async () => {
        try {
            let res = await notificationAPI.getAll(customerID);
            console.log("Notifications: ", res.data.results);
            setNotifications(res.data.results);
            setTotalUnread(res.data.unreadNotification);
        } catch (error) {
            console.error("Error fetching data: ", error);
            if (error.response && error.response.status === 400) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("An unexpected error occurred. Please try again later.");
            }
        }
    };


    // Logout function
    const handleLogout = async () => {
        try {
            await authAPI.logout(customerID);
            localStorage.removeItem("token");
            setCustomerID(0);
            navigate("/login");
        }
        catch (error) {
            console.log("error: ", error);
        }
    };

    // Toggle notification dropdown
    const toggleNotification = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };

    return (
        <div className="flex items-center justify-between bg-[#1C6BA0] text-white py-4 px-8">
            {/* Left Side: Links */}
            <div className="flex space-x-8">
                <Link to="/product" className="hover:text-gray-200">Product</Link>
                <Link to="/shop" className="hover:text-gray-200">Shop</Link>
            </div>

            {/* Right Side: User Info */}
            <div className="flex items-center space-x-4">
                {/* Notification Icon */}
                <div className="relative">
                    <FontAwesomeIcon
                        icon={faBell}
                        size="xl"
                        onClick={toggleNotification}
                        className="cursor-pointer"
                    />
                    <span className="absolute bottom-3 left-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{totalUnread}</span>

                    {/* Tooltip (Notification Dropdown) */}
                    {isNotificationOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-md z-10">
                            <div className="px-4 pt-2 pb-1 text-lg font-semibold text-gray-700">Notifications</div>
                            <div className="max-h-60 overflow-y-auto">
                                {notifications.map(notification => (
                                    <div key={notification.id} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">
                                        {notification.notificationContent.content}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Avatar and User Name */}
                <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUserCircle} size="2x" />
                    <span className="text-sm">{customerName}</span>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} size="sm" />
                </button>
            </div>
        </div>
    );
}

export default Navbar;