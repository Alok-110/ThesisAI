import "dotenv/config";
import { helloGraph } from "./helloGraph";

async function main() {
  const result = await helloGraph.invoke({});
  console.log(result);
}

main();