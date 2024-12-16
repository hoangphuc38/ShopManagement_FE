import { Link, useNavigate } from "react-router-dom";
import ButtonSideBar from "../button/buttonSideBar";
import config from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faHouse, faShop, faUser } from "@fortawesome/free-solid-svg-icons";
import authAPI from "../../api/authAPI";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";

export function Sidebar() {
    const navigate = useNavigate();
    const { customerID, setCustomerID } = useContext(AppContext);

    const HandleLogout = async () => {
        try {
            localStorage.removeItem("token");
            await authAPI.logout(customerID);
            setCustomerID(0);
            navigate("/login");
        }
        catch (error) {
            console.log("error: ", error);
        }
    }

    return (
        <aside className="bg-white shadow-sm translate-x-0 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
            <div className="relative">
                <Link to="/product" className="py-6 px-8 text-center">
                    <p className="text-xl font-bold text-[#1C6BA0]">Shop Management</p>
                </Link>
            </div>
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    <ButtonSideBar title="Product"
                        to={config.routes.product}
                        icon={<FontAwesomeIcon icon={faHouse} />}
                    />
                    <ButtonSideBar title="Shop"
                        to={config.routes.shop}
                        icon={<FontAwesomeIcon icon={faShop} />} />
                    <ButtonSideBar title="User"
                        to={config.routes.customer}
                        icon={<FontAwesomeIcon icon={faUser} />} />
                </ul>
            </div>
            <div className="absolute bottom-5 left-4 w-[90%]">
                <ButtonSideBar title="Logout"
                    onClick={HandleLogout}
                    to={config.routes.login}
                    icon={<FontAwesomeIcon icon={faDoorOpen} />} />
            </div>
        </aside>
    )
}