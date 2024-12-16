import Navbar from "../navbar";

function UserLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <div className="py-4 px-8">
                {children}
            </div>
        </div>
    )
}

export default UserLayout;