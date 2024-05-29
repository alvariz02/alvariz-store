import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";

const ModalUpdateUser = (props: any) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const form: any = event.target as HTMLFormElement;
      const data = {
        role: form.role.value,
      };

      const result = await userServices.updateUser(updatedUser.id, data);

      if (result.status === 200) {
        form.reset();
        setUpdatedUser({});
        const { data: usersData } = await userServices.getAllUser();
        setUsersData(usersData.data);
      } else {
        const errorData = result.data;
        throw new Error(errorData.message || "Failed to update user");
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        // Show specific error message to the user
        console.error(error.response.data.message);
      } else {
        // Show a generic error message
        console.error(error.message || "Failed to update user");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Edit User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input label="Fullname" name="fullname" type="text" defaultValue={updatedUser.fullname} disabled />
        <Input label="Email" name="email" type="email" defaultValue={updatedUser.email} disabled />
        <Input label="Phone" name="phone" type="text" defaultValue={updatedUser.phone} disabled />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button type="submit">{isLoading ? "Updating..." : "Edit"}</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
