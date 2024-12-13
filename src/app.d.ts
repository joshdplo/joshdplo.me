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
}

interface Keep {
	title: string,
	slug: string,
	summary: string,
	image?: string,
	date: string,
	updated: string,
	tags: string[],
}

export { };
