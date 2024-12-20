import { showPerPage, fetchKeeps } from "$lib/keeps";
import { json } from "@sveltejs/kit";

export const prerender = true;

export const GET = async () => {
  const options = {
    limit: showPerPage
  };

  const { keeps } = await fetchKeeps(options);
  return json(keeps);
};