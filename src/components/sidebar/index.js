import { Link, NavLink } from "react-router-dom";

export function Sidebar() {
    return (
        <aside className="bg-white shadow-sm translate-x-0 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
            <div className="relative">
                <Link to="/product" className="py-6 px-8 text-center">
                    <p className="text-xl font-bold">Shop Management</p>
                </Link>
            </div>
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    <NavLink to={"/product"} className={({ isActive }) =>
                        isActive ? "text-lg bg-red" : "text-lg text-center"
                    }>
                        <p>Product</p>
                    </NavLink>
                    <NavLink to={"/user"} className="text-lg text-center">
                        <p>User</p>
                    </NavLink>
                </ul>
            </div>
        </aside>
    )
}