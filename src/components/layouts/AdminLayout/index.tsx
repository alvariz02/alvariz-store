import Sidebar from "@/components/fargments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Propstypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bxs-box",
  },
];
const AdminLayout = (props: Propstypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem}></Sidebar>
      {children}
    </div>
  );
};

export default AdminLayout;
