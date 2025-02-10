import Meta from '../../slurpi/db/Meta.js';
import Message from '../../slurpi/db/Message.js';

// POST Message
export const postContact = async (req, res) => {
  let error = "";

  try {
    const meta = await Meta.findByPk(1);
    const lastMessage = new Date(meta.lastMessageDate);
    const diff = Math.abs(new Date().getTime() - lastMessage.getTime());
    const minutesSinceLastMessage = Math.floor(diff / (1000 * 60));

    if (minutesSinceLastMessage < 5 && req.app.locals.messageCount >= 10) {
      if (!req.app.locals.spamCaptured) {
        meta.spamHistory = [new Date(), ...meta.spamHistory];
        await meta.save();
        req.app.locals.spamCaptured = true;
      }
      return res.json({ error: "High frequency of messages has been detected. To avoid spam, the message service has been temporarily paused. Please try again in a little bit." })
    }

    if (minutesSinceLastMessage >= 5) {
      req.app.locals.spamCaptured = false;
      req.app.locals.messageCount = 0;
    }

    const { name, text } = req.body;
    const nameValue = name.trim();
    const textValue = text.trim();

    if (!name || !text) error += " Must submit name and message.";
    if (name && nameValue === "") error += " Name cannot be empty.";
    if (text && textValue === "") error += " Message cannot be empty.";

    if (error !== "") return res.json(error);

    meta.lastMessageDate = new Date();
    await meta.save();
    await Message.create({ name, text });
    req.app.locals.messageCount += 1;
    return res.json({ success: true });
  } catch (err) {
    res.json({ error: 'Error submitting message.' });
  }
};