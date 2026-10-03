import { generateKeyPair } from "crypto";
import { createAgent, tool } from "langchain";
import { number, z, ZodAny } from "zod";
import dotenv from "dotenv";
import type { JSONSchema } from "zod/v4/core";
import { tavily } from "@tavily/core";
import fs from "fs";
dotenv.config();

const client = tavily({ apiKey: process.env.TAVILY_API_KEY ?? "" });

const searchAgent = tool(
  async (query) => {
    console.log(query, query.query);
    let result = await client.search(query.query, {
      searchDepth: "fast",
      topic: "news",
      timeRange: "month",
    });
    console.log(result);
    return result;
  },
  {
    name: "search_google",
    description: "Search for information for anything ",
    schema: z.object({
      query: z.string().describe("the query to search"),
    }),
  },
);

const WhetherAgent = tool(
  ({ city, country }: { city: string; country: string }) => {
    console.log({ city, country });
    return `the whether is 50c in this ${city}`;
  },
  {
    name: "whether",
    description: "get  the whether of the city or status",
    schema: z.object({
      city: z.string().describe("the name of the city to get whether"),
      country: z.string().describe("the country of the city"),
    }),
  },
);

const agent = createAgent({
  model: "google-genai:gemini-2.5-flash-lite",
  tools: [searchAgent, WhetherAgent],
});

let response = await agent.invoke({
  messages: [
    {
      role: "human",
      content:
        "who is the cm of west bengal?also explicitly mention the toolname you used and what is the result of it",
    },
  ],
});


console.log(response);
