import { Col, Row } from "antd";
import ProductItem from "./productItem";

interface ProductListProps {
  products: any[];
}

const ProductList = (props: ProductListProps) => {
  return (
    <Row gutter={16}>
      {props.products.map((product) => (
        <Col key={product.id} xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
