import { randomUUID } from "crypto";
import { Site } from "./types";
import { readJson, writeJson } from "./storage";

const FILE = "sites.json";

export async function getSites(){ return readJson<Site[]>(FILE,[]); }

export async function addSite(input: Omit<Site, "id" | "createdAt">){
  const sites = await getSites();
  const site: Site = { id: randomUUID(), createdAt: new Date().toISOString(), ...input };
  sites.push(site);
  await writeJson(FILE, sites);
  return site;
}
