import instance from "@/lib/axios/instance";

const authServices = {
  registerAccount: (data: any) => instance.post("/api/userRegister/register", data),
};

export default authServices;
