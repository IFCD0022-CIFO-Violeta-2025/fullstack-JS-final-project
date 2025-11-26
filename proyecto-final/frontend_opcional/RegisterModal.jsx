import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { register } from "../api/auth";

export default function RegisterModal({ show, onHide }) {
  const [form, setForm] = useState({
    username: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    documentType: "",
    documentNumber: "",
    terms: false,
    privacy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.terms || !form.privacy) {
      alert("Ви повинні прийняти Terms & Conditions та Privacy Policy");
      return;
    }

    try {
      // формуємо payload згідно бекенду
      const payload = {
        username: form.username,
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        documentType: form.documentType || null,
        documentNumber: form.documentNumber || null,
      };

      const { data } = await register(payload);

      localStorage.setItem("authToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      console.log("Register success:", data);
      onHide();
    } catch (err) {
      alert(
        "Помилка реєстрації: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Реєстрація</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Username */}
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Name */}
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="name"
              placeholder="Ім'я"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Last Name */}
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Прізвище"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-2">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-2">
            <Form.Control
              type="password"
              name="password"
              placeholder="Пароль"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Document type */}
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="documentType"
              placeholder="Тип документа (паспорт/ID)"
              value={form.documentType}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Document number */}
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              name="documentNumber"
              placeholder="Номер документа"
              value={form.documentNumber}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Terms */}
          <Form.Check
            type="checkbox"
            name="terms"
            label={
              <>
                Я приймаю{" "}
                <a href="/terms" target="_blank">
                  Terms & Conditions
                </a>
              </>
            }
            checked={form.terms}
            onChange={handleChange}
          />

          {/* Privacy */}
          <Form.Check
            type="checkbox"
            name="privacy"
            label={
              <>
                Я приймаю{" "}
                <a href="/privacy" target="_blank">
                  Privacy Policy
                </a>
              </>
            }
            checked={form.privacy}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            style={{ width: "100%" }}
          >
            Зареєструватися
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
