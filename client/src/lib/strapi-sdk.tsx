import { getStrapiURL } from "./utils";
import { strapi } from "@strapi/client";

const BASE_API_URL = getStrapiURL() + "/api";
const API_TOKEN = process.env.STRAPI_API_TOKEN;
const strapiClient = strapi({ baseURL: BASE_API_URL, auth: API_TOKEN });

export { strapiClient };
