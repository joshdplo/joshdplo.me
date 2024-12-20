import { showPerPage, fetchKeeps } from "$lib/keeps";
import { json } from "@sveltejs/kit";

export const prerender = true;

export const GET = async ({ params }) => {
  const { page } = params || 1;

  const options = {
    offset: (page - 1) * showPerPage,
    limit: showPerPage
  };

  const { keeps } = await fetchKeeps(options);
  return json(keeps);
};