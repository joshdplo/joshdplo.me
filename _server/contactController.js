import Message from '../../slurpi/db/Message.js';

// Test (GET)
export const testContact = async (req, res) => {
  const messages = await Message.findAll();

  res.json(messages);
};

// POST Message
export const postContact = async (req, res) => {
  let error = "";

  try {
    const { name, text } = req.body;
    const nameValue = name.trim();
    const textValue = text.trim();

    if (!name || !text) error += " Must submit name and message.";
    if (name && nameValue === "") error += " Name cannot be empty.";
    if (text && textValue === "") error += " Message cannot be empty.";

    if (error !== "") return res.json(error);

    await Message.create({ name, text });
    return res.json({ success: true });
  } catch (err) {
    res.json({ error: 'Error submitting message.' });
  }
};