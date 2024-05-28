import AdminLayout from "@/components/layouts/AdminLayout";
import UserAdminView from "@/components/views/admin/Users";
import userServices from "@/services/user";
import { useCallback, useEffect, useState } from "react";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllUsers = useCallback(async () => {
    setLoading(true); // Set loading ke true saat memulai pemanggilan API
    setError(null); // Reset error sebelum memulai pemanggilan API
    try {
      const { data } = await userServices.getAllUser();
      setUsers(data.data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false); // Pastikan loading diatur ke false di blok finally
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error || "An error occurred"}</div>; // Pastikan properti message tersedia
  }
  return (
    <>
      <UserAdminView users={users}></UserAdminView>
    </>
  );
};

export default AdminUserPage;
