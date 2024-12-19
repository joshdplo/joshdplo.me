import { json } from "@sveltejs/kit";

export const prerender = true;

export const GET = () => {
  const keeps = import.meta.glob(`$lib/../keeps/**/*.md`);
  return json(Object.keys(keeps).length);
};