import { Menu, MenuProps } from "antd";
import { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import useWindowSize from "@/hooks/useResize";

interface OrdersOptionsProps {
  onChange: (values: string) => void;
}

const OrdersOptions = (props: OrdersOptionsProps) => {
  const [current, setCurrent] = useState("cart");
  const size = useWindowSize();

  const items: MenuProps["items"] = [
    {
      label: "Shopping cart",
      key: "cart",
      icon: <MailOutlined />,
    },
    {
      label: "Orders",
      key: "orders",
      icon: <MailOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    props.onChange(e.key);
  };

  const handleResize = (e: any) => {
    console.log(e);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode={["xs", "sm", "md"].includes(size) ? "horizontal" : "inline"}
      items={items}
      onResize={handleResize}
    />
  );
};

export default OrdersOptions;
