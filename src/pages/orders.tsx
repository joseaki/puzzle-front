import LayoutTemplate from "@/components/layout";
import OrdersOptions from "@/components/ordersOptions";
import OrdersTable from "@/components/ordersTable";
import PreviousTable from "@/components/previousTable";
import { useCart } from "@/context/cart";
import { CurrencyTypes, useCurrency } from "@/context/currency";
import { useUser } from "@/hooks/useUser";
import { deleteShoppingCart, getAllOrders, payCart } from "@/services/order";
import { IOrder } from "@/types/orders.types";
import { Button, Col, Row, Select, Spin, message } from "antd";
import Head from "next/head";
import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "../styles/Orders.module.css";

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const currencyEdit = useRef<any>(undefined);
  const previousOrder = orders.filter((order) => order.state === "Completed");
  const [itemToRender, setItemToRender] = useState("cart");
  const [edit, setEdit] = useState(false);
  const { cart, deleteAll, setCartProducts } = useCart();
  const { currency, setCurrency } = useCurrency();
  const { user } = useUser();

  const handleChange = (value: string) => {
    setItemToRender(value);
  };

  const handleSave = () => {
    setEdit(false);
    setCurrency(currencyEdit.current);
    currencyEdit.current = undefined;
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const deleteCart = async () => {
    if (edit) {
      setEdit(false);
      currencyEdit.current = undefined;
    } else {
      await deleteShoppingCart();
      deleteAll();
    }
  };

  const handlePay = async () => {
    await payCart();
    deleteAll();
    message.success("Payment successful");
  };

  const handleCurrencyChange = (value: string) => {
    const currency = CurrencyTypes.find((currency) => currency.iso === value)!;
    currencyEdit.current = currency;
  };

  useEffect(() => {
    getAllOrders()
      .then((orders: IOrder[]) => {
        setOrders(orders);
        const shoppingCart = orders.find((order) => order.state === "Active");
        if (shoppingCart) {
          setCartProducts(shoppingCart.products);
        }
      })
      .catch((err) => console.log(err.message));
  }, []);

  if (!user) {
    return (
      <div className={styles.loading}>
        <Spin />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" content="Store Login" />
      </Head>
      <Row gutter={16} className="content">
        <Col span={6} xs={24} sm={24} md={24} lg={6}>
          <OrdersOptions onChange={handleChange} />
        </Col>
        <Col span={18} xs={24} sm={24} md={24} lg={18}>
          {itemToRender === "cart" ? (
            <>
              {edit ? (
                <Select
                  onChange={handleCurrencyChange}
                  defaultValue={currency.iso}
                  style={{ width: 120 }}
                  options={CurrencyTypes.map((currency) => ({
                    value: currency.iso,
                    label: `${currency.iso} - (${currency.symbol})`,
                  }))}
                />
              ) : null}
              <OrdersTable edit={edit} />
              {cart.length ? (
                <Row gutter={8} justify="end">
                  {!edit ? (
                    <Col>
                      <Button onClick={handleEdit}>Edit</Button>
                    </Col>
                  ) : null}
                  {edit ? (
                    <Col>
                      <Button type="primary" onClick={handleSave}>
                        Save
                      </Button>
                    </Col>
                  ) : null}

                  <Col>
                    <Button type="primary" danger onClick={deleteCart}>
                      Cancel
                    </Button>
                  </Col>
                  {!edit ? (
                    <Col>
                      <Button type="primary" onClick={handlePay}>
                        Pay
                      </Button>
                    </Col>
                  ) : null}
                </Row>
              ) : null}
            </>
          ) : (
            <PreviousTable orders={previousOrder} />
          )}
        </Col>
      </Row>
    </>
  );
}

Orders.getLayout = function getLayout(page: ReactNode) {
  return <LayoutTemplate>{page}</LayoutTemplate>;
};
