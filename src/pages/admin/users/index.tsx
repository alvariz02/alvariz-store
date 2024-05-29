import UserAdminView from "@/components/views/admin/Users";
import userServices from "@/services/user";
import { useCallback, useEffect, useState } from "react";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllUsers = useCallback(async () => {
    setLoading(true); // Mengatur loading ke true saat mulai memanggil API
    setError(null); // Reset error sebelum memulai pemanggilan API

    try {
      const { data } = await userServices.getAllUser();
      setUsers(data.data);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat mengambil data pengguna.");
    } finally {
      setLoading(false); // Pastikan loading diatur ke false di blok finally
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <UserAdminView users={users} />
    </>
  );
};

export default AdminUserPage;
