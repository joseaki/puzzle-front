import { useCurrency } from "@/context/currency";
import { Button, Collapse, Rate, Row, Table, Typography, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";
import { IProduct } from "../types/products.types";
import { useCart } from "@/context/cart";
import { rateOrder, removeProductFromOrder } from "@/services/order";
import { IOrder } from "@/types/orders.types";

const { Text } = Typography;
const { Panel } = Collapse;

interface PreviousTableProps {
  orders: IOrder[];
}

const PreviousTable = (props: PreviousTableProps) => {
  const { currency } = useCurrency();

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
  ];

  const handleRateChange = async (order: IOrder, rate: number) => {
    await rateOrder(order, rate);
    message.success("Order rated successfully");
  };

  console.log(props.orders);
  return (
    <Collapse accordion>
      {props.orders.map((order, idx) => (
        <Panel key={idx} header={`Order id: ${order._id}`}>
          <Rate
            disabled={!!order.rate}
            value={order.rate}
            onChange={(rate) => handleRateChange(order, rate)}
          />
          <Table
            dataSource={order.products}
            columns={columns}
            pagination={false}
            rowKey="id"
          />
          {order.products.length ? (
            <Row justify="end">
              <Text strong>
                Total: {currency.symbol}
                {(
                  order.products.reduce(
                    (sum, product) => sum + product.price,
                    0
                  ) *
                  currency.exchange *
                  1.15
                ).toFixed(2)}
              </Text>
            </Row>
          ) : null}
        </Panel>
      ))}
    </Collapse>
  );
};

export default PreviousTable;
