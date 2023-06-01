import { ILoginForm } from "@/types/login.types";
import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { login } from "@/services/users";
import Link from "next/link";

const { Title } = Typography;

export default function Login() {
  const router = useRouter();
  const onFinish = async (values: ILoginForm) => {
    try {
      const { token } = await login(values.username, values.password);
      document.cookie = `token=${token}; path=/`;
      router.push("/");
    } catch (error) {
      message.error("Invalid credentials");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Store Login" />
      </Head>
      <main>
        <Row justify="center" align="middle" className={styles.container}>
          <Col xs={22} md={16} lg={12}>
            <Title>Login</Title>
            <Form
              name="basic"
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
              <Link href={"signup"}>I am new</Link>
            </Form>
          </Col>
        </Row>
      </main>
    </>
  );
}
