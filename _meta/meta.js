import Meta from '../../slurpi/db/Meta.js';

// date formatting
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
dayjs.extend(relativeTime);

// Update Metadata
(async () => {
  console.log('Updating metadata...');

  const meta = await Meta.findByPk(1);

  let buildHistory = meta.buildHistory;
  if (buildHistory.dates && buildHistory.dates.length > 50) buildHistory.dates.pop();

  buildHistory = { count: buildHistory.count + 1, dates: [new Date(), ...buildHistory.dates] };

  meta.buildHistory = buildHistory;
  await meta.save();

  console.log('Update complete!');
})();
