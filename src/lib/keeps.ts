export const keepsConfig = {
	postPerPage: 10
};

/**
 * by josh collinsworth:
 * https://github.com/josh-collinsworth/sveltekit-blog-starter/blob/main/src/lib/assets/js/fetchPosts.js
 */
export const fetchKeeps = async ({ offset = 0, limit = keepsConfig.postPerPage, tag = '' } = {}) => {

	const keeps = await Promise.all(
		Object.entries(import.meta.glob('/src/lib/keeps/**/*.svx')).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const slug = path.split('/').pop().slice(0, -3);
			return { ...metadata, slug };
		})
	)

	let sortedKeeps = keeps.sort((a, b) => new Date(b.date) - new Date(a.date));

	if (tag) {
		sortedKeeps = sortedKeeps.filter(keep => keep.categories.includes(category));
	}

	if (offset) {
		sortedKeeps = sortedKeeps.slice(offset);
	}

	if (limit && limit < sortedKeeps.length && limit != -1) {
		sortedKeeps = sortedKeeps.slice(0, limit);
	}

	sortedKeeps = sortedKeeps.map(keep => ({
		title: keep.title,
		slug: keep.slug,
		summary: keep.summary,
		date: keep.date,
		tags: keep.categories,
	}));

	return {
		keeps: sortedKeeps
	}
};
