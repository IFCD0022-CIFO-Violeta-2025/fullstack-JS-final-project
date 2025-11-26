import { FAQ } from "../models/index.js";

export const listFAQ = async (req, res) => {
  try {
    const faqs = await FAQ.findAll();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні FAQ" });
  }
};

export const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = await FAQ.create({ question, answer });
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ error: "Помилка при створенні FAQ" });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const { idFaq } = req.params;
    const { question, answer } = req.body;
    const faq = await FAQ.findByPk(idFaq);
    if (!faq) return res.status(404).json({ error: "FAQ не знайдено" });
    await faq.update({ question, answer });
    res.json(faq);
  } catch (err) {
    res.status(500).json({ error: "Помилка при оновленні FAQ" });
  }
};

export const deleteFAQ = async (req, res) => {
  try {
    const { idFaq } = req.params;
    const faq = await FAQ.findByPk(idFaq);
    if (!faq) return res.status(404).json({ error: "FAQ не знайдено" });
    await faq.destroy();
    res.json({ message: "FAQ видалено" });
  } catch (err) {
    res.status(500).json({ error: "Помилка при видаленні FAQ" });
  }
};
