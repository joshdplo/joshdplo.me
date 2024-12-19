// Keeps Config
export const keepsConfig = {
	showPerPage: 10
};

// Fetch Keeps
export const fetchKeeps = async ({ offset = 0, limit = keepsConfig.showPerPage, tag = '' } = {}) => {
	const keeps = await Promise.all(
		Object.entries(import.meta.glob('/src/keeps/**/*.md')).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const slug = path.split('/').at(-1)?.replace('.md', '');
			return { ...metadata, slug };
		})
	);

	let sortedKeeps = keeps.sort((a, b) => new Date(b.date) - new Date(a.date));
	if (tag) sortedKeeps = sortedKeeps.filter(keep => keep.tags.includes(tag));
	if (offset) sortedKeeps = sortedKeeps.slice(offset);
	if (limit && limit < sortedKeeps.length && limit !== -1) sortedKeeps = sortedKeeps.slice(0, limit);

	sortedKeeps = sortedKeeps.map(keep => ({
		title: keep.title,
		slug: keep.slug,
		summary: keep.summary,
		image: keep.image || null,
		date: keep.date,
		updated: keep.updated,
		tags: keep.tags
	}));

	return { keeps: sortedKeeps };
}