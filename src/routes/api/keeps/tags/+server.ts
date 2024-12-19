import { json } from "@sveltejs/kit";

export const prerender = true;

export const GET = async ({ url }) => {
  const keepsResponse = await fetch(`${url.origin}/api/keeps/keeps.json`);
  const keeps: Keep[] = await keepsResponse.json();

  const tagsObject = {};
  keeps.forEach(k => {
    k.tags.forEach(t => {
      if (tagsObject.hasOwnProperty(t)) {
        tagsObject[t].count += 1;
      } else {
        tagsObject[t] = {
          title: t,
          path: `/keeps/tag/${t}`,
          count: 1
        }
      }
    });
  });

  const tagsArray = [...Object.keys(tagsObject)].map(tag => ({
    title: tagsObject[tag].title,
    path: tagsObject[tag].path,
    count: tagsObject[tag].count
  })).sort((a, b) => a.title.localeCompare(b.title));

  const responseData = url.searchParams.get('array') ? tagsArray : tagsObject;
  return json(responseData);
};