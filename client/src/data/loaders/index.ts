import { strapiClient } from "@/lib/strapi-sdk";


async function getCollectionType(name: string, params: object) {
  const data = await strapiClient.collection(name).find(params);
  return data;
}

async function getSingleType(name: string, params: object) {
  const data = await strapiClient.single(name).find(params);
  return data;
}
