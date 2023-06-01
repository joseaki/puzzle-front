import { useCurrency } from "@/context/currency";
import { IProduct } from "@/types/products.types";
import { Button, Col, Rate, Row, Typography, message } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useCart } from "@/context/cart";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";

const { Title, Text } = Typography;

interface ProductItemProps {
  product: IProduct;
}

const ProductItem = (props: ProductItemProps) => {
  const { product } = props;
  const router = useRouter();
  const { currency } = useCurrency();
  const { addToCart } = useCart();
  const { user } = useUser();

  const handleAddToCart = (product: IProduct) => {
    if (!user) {
      router.push("/login");
      return;
    }
    addToCart(product);
    message.success("Added to cart");
  };

  return (
    <Row style={{ height: "100%" }}>
      <Col
        span={24}
        style={{
          padding: "1rem",
          borderRadius: "1rem",
          boxShadow: "0 2px 4px rgb(0 0 0 / 0.2)",
        }}
      >
        <Title level={4} style={{ height: "5rem" }}>
          {product.title}
        </Title>
        <Image
          style={{ objectFit: "contain", width: "100%" }}
          alt={product.title}
          width={300}
          height={300}
          src={product.image}
        />
        <Rate value={product.rating.rate} style={{ display: "block" }} />
        <Row justify="space-between">
          <Col>
            <Text style={{ display: "block" }}>{product.category}</Text>
            <Text style={{ display: "block" }} strong>
              {currency.symbol}
              {(product.price * currency.exchange).toFixed(2)}
            </Text>
          </Col>
          <Col>
            <Button
              onClick={() => handleAddToCart(product)}
              icon={<ShoppingCartOutlined />}
            >
              Add
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductItem;
