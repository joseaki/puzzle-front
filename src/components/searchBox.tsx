import { Button, Col, Form, Input, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export interface ISearchBox {
  query: string;
}
interface SearchBoxProps {
  onFinish: (values: ISearchBox) => void;
}

const SearchBox = (props: SearchBoxProps) => {
  return (
    <Form onFinish={props.onFinish}>
      <Row gutter={16}>
        <Col span={20} xs={16} md={20}>
          <Form.Item name="query">
            <Input placeholder="Search..." />
          </Form.Item>
        </Col>
        <Col span={4} xs={8} md={4}>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              icon={<SearchOutlined />}
            >
              Search
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
