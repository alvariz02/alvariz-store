import Button from "@/components/ui/Button";
import styles from "./User.module.scss";
import Modal from "@/components/ui/Modal";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import userServices from "@/services/user";
import ModalDeleteUser from "./ModalDeleteuser";
type Propstypes = {
  users: any;
};
const UserAdminView = (props: Propstypes) => {
  const { users } = props;
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [deletedUser, setDeletedUser] = useState<any>({});
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    setUsersData(users);
  }, [users]);
  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h1>User Management</h1>
          <table className={styles.users__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: any, index: number) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={styles.users__table__action}>
                      <Button onClick={() => setUpdatedUser(user)} type="button" className={styles.users__table__action__edit}>
                        <i className="bx bxs-edit"></i>
                      </Button>
                      <Button type="button" className={styles.users__table__action__delete} onClick={() => setDeletedUser(user)}>
                        <i className="bx bxs-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length && <ModalUpdateUser updatedUser={updatedUser} setUpdatedUser={setUpdatedUser} setUsersData={setUsersData} />}
      {Object.keys(deletedUser).length && <ModalDeleteUser deletedUser={deletedUser} setDeletedUser={setDeletedUser} setUsersData={setUsersData} />}
    </>
  );
};

export default UserAdminView;
