import { FlowKey } from "../data/types";

const baseURL = "https://www.saucedemo.com/";

interface Config {
  name: string;
  url: string;
}

// One entry per flow. Record<FlowKey, ...> forces an entry for every key.
export const flow: Record<FlowKey, Config> = {
  LOGIN: { name: "Login page", url: baseURL },
  INVENTORY: { name: "Inventory page", url: baseURL + "inventory.html" },
};

export function getUrl(flowKey: FlowKey): string {
  if (!flow[flowKey]) throw new Error(`Flow not found: ${flowKey}`);
  return flow[flowKey].url;
}
