import Meta from '../../slurpi/db/Meta.js';

export const testContact = async (req, res) => {
  const meta = await Meta.findByPk(1);

  res.json(meta);
};