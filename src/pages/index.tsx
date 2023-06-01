import { ReactNode, useMemo, useState } from "react";
import { Button, Col, Form, Row, Input } from "antd";
import Head from "next/head";
import LayoutTemplate from "@/components/layout";

import styles from "../styles/Products.module.css";
import SearchBox, { ISearchBox } from "@/components/searchBox";
import Filters from "@/components/filters";
import ProductList from "@/components/productList";
import { getProducts } from "@/services/products";
import { IProduct } from "@/types/products.types";

export const getServerSideProps = async () => {
  const products = await getProducts();
  return { props: { products } };
};

export default function Page({
  products: serverProducts,
}: {
  products: IProduct[];
}) {
  const [products, setProducts] = useState(serverProducts);
  const [categories, setCategories] = useState<string | undefined>(undefined);
  const [prices, setPrices] = useState<string | undefined>(undefined);
  const [query, setQuery] = useState<string | undefined>(undefined);

  const categoryList = useMemo(
    () => new Set(products.map((product) => product.category)),
    []
  );

  const onFinish = async (values: ISearchBox) => {
    setQuery(values.query);
    const products = await getProducts(values.query, categories, prices);
    setProducts(products);
  };

  const handleFilterChange = async (categories: string, prices: string) => {
    setCategories(categories);
    setPrices(prices);
    const products = await getProducts(query, categories, prices);
    setProducts(products);
  };

  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="description" content="Products" />
      </Head>
      <Row className="content">
        <Col span={24}>
          <SearchBox onFinish={onFinish} />
        </Col>
        <Col span={24}>
          <Row gutter={16}>
            <Col span={6} xs={24} md={6}>
              <Filters
                categories={[...categoryList]}
                onChange={handleFilterChange}
              />
            </Col>
            <Col span={18} xs={24} md={18}>
              <ProductList products={products} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

Page.getLayout = function getLayout(page: ReactNode) {
  return <LayoutTemplate>{page}</LayoutTemplate>;
};
