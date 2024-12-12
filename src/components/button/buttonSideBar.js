import { NavLink } from "react-router-dom";

function ButtonSideBar({ icon, to, title, onClick }) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
                isActive
                    ? `flex items-center bg-[#1C6BA0] text-white px-2 py-2 rounded-[5px] relative`
                    : "flex items-center px-2 py-2 rounded-[5px] relative hover:bg-slate-100"
            }
        >
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm">
                {icon}
            </div>
            <p className="ml-8 text-lg font-medium">{title}</p>
        </NavLink>
    )
}

export default ButtonSideBar;