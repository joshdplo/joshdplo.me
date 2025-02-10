import Meta from '../../slurpi/db/Meta.js';

export default async function (req, res, next) {
  try {
    const meta = await Meta.findByPk(1);
    const lastMessage = new Date(meta.lastMessageDate);
    const diff = Math.abs(new Date().getTime() - lastMessage.getTime());
    const minutesSinceLastMessage = Math.floor(diff / (1000 * 60));

    console.log('......DEBUG MIDDLEWARE......');
    console.log(`path: ${req.path}`);
    console.log(`message count: ${req.app.locals.messageCount}`);
    console.log(`minutes since last message: ${minutesSinceLastMessage}`);
    console.log(`spam captured? ${req.app.locals.spamCaptured}`);
    console.log('...........................');

    next();
  } catch (err) {
    console.error('Error in debug middleware', err);
  }
}