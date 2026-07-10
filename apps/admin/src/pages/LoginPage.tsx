import { useLogin } from "@refinedev/core";
import { useState } from "react";
import { Alert, Button, Card, Form, Input, Typography } from "antd";

function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "object" && error && "message" in error) {
    return String((error as { message?: unknown }).message ?? "Login failed");
  }
  return "Invalid email or password";
}

export function LoginPage() {
  const { mutate: signIn, isPending } = useLogin();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = (values: Record<string, unknown>) => {
    setErrorMessage(undefined);
    signIn(values, {
      onSuccess: (result) => {
        if (!result.success) {
          setErrorMessage(getAuthErrorMessage(result.error));
        }
      },
      onError: (error) => {
        setErrorMessage(getAuthErrorMessage(error));
      },
    });
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f5f7fb" }}>
      <Card style={{ width: 380 }}>
        <Typography.Title level={3} style={{ marginTop: 0 }}>SINOTRUK Admin</Typography.Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          {errorMessage && (
            <Alert
              type="error"
              showIcon
              message="Login failed"
              description={errorMessage}
              style={{ marginBottom: 16 }}
            />
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Please enter a valid email address" }]}
          >
            <Input autoComplete="email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={isPending}>Log in</Button>
        </Form>
      </Card>
    </div>
  );
}