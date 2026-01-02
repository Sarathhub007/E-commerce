import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {Sheet,  SheetContent, SheetTitle,SheetHeader } from "../ui/sheet"
   const adminSidebarMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard />,
    },
    {
      id: "products",
      label: "Products",
      path: "/admin/products",
      icon: <ShoppingBasket />,
    },

    {
      id: "orders",
      label: "Orders",
      path: "/admin/orders",
      icon: <BadgeCheck />,
    },
  ];
function MenuItems({setopen}) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setopen ? setopen(false) : null;
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}
function AdminSidebar({open,setopen}) {
    const navigate = useNavigate();

  return (
    <>
      <Fragment>
      <Sheet open={open} onOpenChange={setopen} >
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
       <SheetHeader className="border-b">
        <SheetTitle className="flex gap-5 mt-5 mb-5">
          <ChartNoAxesCombined size={30} />
            <h1 className="text-2xl font-extrabold ">Admin panel</h1>
        </SheetTitle>
       </SheetHeader>
       <MenuItems setopen={setopen}/>
          </div>
          
        </SheetContent>

      </Sheet>


        <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
          <div
            className="flex items-center cursor-pointer gap-2 "
            onClick={() => navigate("/admin/dashboard")}
          >
            <ChartNoAxesCombined size={30} />
            <h1 className="text-2xl font-extrabold ">Admin panel</h1>
          </div>
          <MenuItems />
        </aside>
      </Fragment>
    </>
  );
}

export default AdminSidebar;
