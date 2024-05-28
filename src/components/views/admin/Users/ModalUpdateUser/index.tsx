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

      const result = await userServices.updateUser(updatedUser.id, data); // Pastikan ini adalah panggilan axios

      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        setUpdatedUser({});
        const { data } = await userServices.getAllUser();
        setUsersData(data.data);
      } else {
        const errorData = result.data;
        throw new Error(errorData.message || "Failed to register user");
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        // setError(error.response.data.message);
      } else {
        // setError(error.message || "Failed to register user");
      }
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Edit User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input label="Fullname" name="fullname" type="text" defaultValue={updatedUser.fullname} disabeld></Input>
        <Input label="Email" name="email" type="email" defaultValue={updatedUser.email} disabeld></Input>
        <Input label="Phone" name="phone" type="text" defaultValue={updatedUser.phone} disabeld></Input>
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            {
              label: "Member",
              value: "member",
            },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button type="submit">Edit</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
