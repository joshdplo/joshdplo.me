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

	interface Note {
		title: string,
		slug: string,
		summary: string,
		image?: string,
		slug?: string,
		date: string,
		updated: string,
		tags: string[],
	}

	interface NoteTag {
		title: string,
		path: string,
		notes: Note[]
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

	interface SpotifySong {
		id: string,
		isTopTrack: boolean,
		name: string,
		artists: [
			{ name: string, url: string }
		],
		duration_ms: number,
		url: string,
		image: string,
		release_date: string,
		createdAt: string,
		updatedAt: string,
		super: boolean,
		mega: boolean,
	}

	interface SpotifyAlbum {
		id: string,
		isTopTrack: boolean,
		name: string,
		artists: [
			{ name: string, url: string }
		],
		total_tracks: number,
		url: string,
		image: string,
		release_date: string,
		createdAt: string,
		updatedAt: string,
		super: boolean,
		mega: boolean,
	}

	interface SpotifyArtist {
		id: string,
		name: string,
		genres: string[],
		url: string,
		image: string,
		createdAt: string,
		updatedAt: string,
		super: boolean,
		mega: boolean,
	}

	interface SpotifyShow {
		id: string,
		name: string,
		description: string,
		url: string,
		image: string,
		total_episodes: number,
		createdAt: string,
		updatedAt: string,
		super: boolean,
		mega: boolean,
	}

	type SteamPlatform = 'windows' | 'mac' | 'linux';
	interface SteamGame {
		id: number,
		appid: number,
		recent: boolean,
		playtime_forever: number,
		name: string,
		is_free: boolean,
		short_description: string,
		website: string,
		header_image: string,
		capsule_image: string,
		developers: string[],
		publishers: string[],
		platforms: {
			[key: SteamPlatform]: boolean
		},
		categories: {
			[key: 'id']: number,
			[key: 'description']: string
		},
		genres: {
			[key: 'id']: number,
			[key: 'description']: string
		},
		release_date: {
			[key: 'coming_soon']: boolean,
			[key: 'date']: string
		},
		createdAt: string,
		updatedAt: string,
		invalid: boolean,
		super: boolean,
		mega: boolean,
	}
}

export { };
