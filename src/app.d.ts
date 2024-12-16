// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface URLWords {
		base: string,
		first?: string,
		second?: string,
		third?: string,
		fourth?: string
	}

	interface Keep {
		title: string,
		slug: string,
		summary: string,
		image?: string,
		slug?: string,
		date: string,
		updated: string,
		tags: string[],
	}

	interface KeepTag {
		title: string,
		path: string,
		keeps: Keep[]
	}

	interface Movie {
		adult: boolean,
		genre_ids: number[],
		id: number,
		original_language: string,
		overview: string,
		poster_path: string,
		release_date: string,
		title: string,
		rating?: number | null,
		createdAt: string,
		updatedAt: string,
		mega: boolean,
	}

	interface Show {
		adult: boolean,
		genre_ids: number[],
		id: number,
		original_language: string,
		overview: string,
		poster_path: string,
		first_air_date: string,
		name: string,
		rating?: number | null,
		createdAt: string,
		updatedAt: string,
		mega: boolean,
	}
}



export { };
