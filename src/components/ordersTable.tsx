import { useCurrency } from "@/context/currency";
import { Button, Row, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { IProduct } from "../types/products.types";
import { useCart } from "@/context/cart";
import { removeProductFromOrder } from "@/services/order";

const { Text } = Typography;

interface OrdersTableProps {
  edit: boolean;
}

const OrdersTable = (props: OrdersTableProps) => {
  const { currency } = useCurrency();
  const { cart, deleteFromCart } = useCart();

  const handleDeleteProduct = async (product: IProduct) => {
    await removeProductFromOrder(product);
    deleteFromCart(product);
  };

  const actions = props.edit
    ? [
        {
          title: "Actions",
          dataIndex: "actions",
          key: "actions",
          render: (_: any, product: IProduct) => (
            <>
              <Button
                shape="circle"
                onClick={() => handleDeleteProduct(product)}
                icon={<DeleteOutlined />}
              />
            </>
          ),
        },
      ]
    : [];
  const columns: ColumnsType<IProduct> = [
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => (
        <>
          <span>
            {currency.symbol}
            {(price * currency.exchange).toFixed(2)}
          </span>
        </>
      ),
    },
    {
      title: "Interest",
      dataIndex: "interest",
      key: "interest",
      render: (_, { price }) => (
        <>
          <span>
            {currency.symbol}
            {(price * currency.exchange * 0.15).toFixed(2)}
          </span>
        </>
      ),
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "total",
      render: (_, { price }) => (
        <>
          <span>
            {currency.symbol}
            {(price * currency.exchange * 1.15).toFixed(2)}
          </span>
        </>
      ),
    },
    ...actions,
  ];

  return (
    <>
      <Table
        dataSource={cart}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
      {cart.length ? (
        <Row justify="end">
          <Text strong>
            Total: {currency.symbol}
            {(
              cart.reduce((sum, product) => sum + product.price, 0) *
              currency.exchange *
              1.15
            ).toFixed(2)}
          </Text>
        </Row>
      ) : null}
    </>
  );
};

export default OrdersTable;
