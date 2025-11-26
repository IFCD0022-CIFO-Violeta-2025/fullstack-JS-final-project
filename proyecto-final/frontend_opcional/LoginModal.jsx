import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { login } from "../api/auth";

export default function LoginModal({ show, onHide }) {
  console.log("LoginModal mounted. Show =", show);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (show) {
      console.log("localStorage before login:", {
        authToken: localStorage.getItem("authToken"),
        refreshToken: localStorage.getItem("refreshToken"),
      });
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login form:", form);

    try {
      const response = await login(form);
      const data = response?.data;

      if (data?.accessToken && data?.refreshToken) {
        localStorage.setItem("authToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("authUser", JSON.stringify(data.user));

        console.log("Tokens saved to localStorage:", {
          authToken: localStorage.getItem("authToken"),
          refreshToken: localStorage.getItem("refreshToken"),
        });

        alert("Login success");

        // 1️. ховаємо модалку
        onHide();

        // 2️. оновлюємо глобальні компоненти
        window.dispatchEvent(new Event("auth-changed"));

        // 3️. очищаємо форму
        setForm({ email: "", password: "" });

        // 4️. НЕ РОБИМО reload
        // 5️. НЕ РОБИМО redirect
      
      } else {
        alert("Сервер не повернув токени.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Помилка входу: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Увійти</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Увійти
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
