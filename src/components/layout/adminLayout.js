import { Sidebar } from "../sidebar";

function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100">
            <Sidebar />
            <div className="p-4 xl:ml-80">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout;