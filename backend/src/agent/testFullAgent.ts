import "dotenv/config";
import { investmentAgent } from "./graph";

async function main() {
  const result = await investmentAgent.invoke({ companyName: "NVDA" });
  console.log(JSON.stringify(result, null, 2));
}

main();