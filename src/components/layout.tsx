import { ReactNode, useEffect, useState } from "react";
import { Badge, Layout, Menu, MenuProps } from "antd";
import { ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useCart } from "@/context/cart";

const { Header, Content, Footer } = Layout;

type LayoutProps = {
  children: ReactNode;
};

const LayoutTemplate = (props: LayoutProps) => {
  const [current, setCurrent] = useState("products");
  const { cart } = useCart();
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      label: "All Products",
      key: "",
      icon: <ShopOutlined />,
    },
    {
      label: (
        <Badge count={cart.length}>
          <span>My orders</span>
        </Badge>
      ),
      key: "orders",
      icon: <ShoppingCartOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    router.push(e.key ? e.key : "/");
  };

  useEffect(() => {
    if (router.pathname.includes("orders")) {
      setCurrent("orders");
    } else {
      setCurrent("");
    }
  }, []);

  return (
    <Layout>
      <Header>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </Header>
      <Content>{props.children}</Content>
    </Layout>
  );
};

export default LayoutTemplate;
