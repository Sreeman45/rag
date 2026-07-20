
import { generateKeyPair } from "crypto";
import { createAgent, tool } from "langchain";
import { string, z } from "zod";
import dotenv from 'dotenv';
import type { JSONSchema } from "zod/v4/core";
dotenv.config()


const searchAgent=tool(
    (query)=>
    {   console.log(query,query.query)
        return`this is the result ${query.query}`},
    {
        name:"search_google",
        description: "Search for information for anything ",
        schema:z.object({
            query:z.string().describe("the query to search"),
            
        })
    }

)

const WhetherAgent=tool(
    ({city,country}:{city:string,country:string})=>{
          console.log({city,country})
        return `the whether is 50 in this ${city}`},
    {
      name:"whether",
      description:"get  the whether of the city or status",
      schema:z.object({
        city:z.string().describe('the name of the city to get whether'),
        country:z.string().describe("the country of the city")
      })
    }

)

const agent = createAgent({
  model: "google-genai:gemini-2.5-flash-lite",
  tools: [searchAgent,WhetherAgent],
  

});

let response =await agent.invoke({
    messages:[ {role: "user", content: "who is narendra modi?" }]
})

console.log(response["messages"][0]?.contentBlocks)






