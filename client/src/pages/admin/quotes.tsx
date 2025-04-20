import { Helmet } from "react-helmet-async";
import Sidebar from "@/components/admin/Sidebar";
import QuoteTable from "@/components/admin/QuoteTable";

const AdminQuotes = () => {
  return (
    <>
      <Helmet>
        <title>Quote Requests | Murray Moving Admin</title>
      </Helmet>

      <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Quote Requests</h1>
            <p className="text-slate-500">Manage and respond to customer quote requests.</p>
          </div>
          
          <QuoteTable />
        </div>
      </div>
    </>
  );
};

export default AdminQuotes;
