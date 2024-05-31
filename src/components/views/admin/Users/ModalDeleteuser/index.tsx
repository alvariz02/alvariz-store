import { useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDeletedUser.module.scss";
import { useSession } from "next-auth/react";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const session: any = useSession();

  const handleDelete = async () => {
    setIsLoading(true);
    setError("");
    try {
      await userServices.deleteUser(deletedUser.id, session.data?.accessToken);
      setDeletedUser({});
      const { data } = await userServices.getAllUser();
      setUsersData(data.data);
    } catch (error) {
      setError("Failed to delete user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.modal__title}>Are You Sure ?</h1>
      {error && <p className={styles.error}>{error}</p>}
      <Button type="button" onClick={handleDelete}>
        {isLoading ? "Deleting..." : "Delete"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
