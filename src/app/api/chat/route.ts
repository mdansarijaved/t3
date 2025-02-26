import type { CoreMessage, Message } from "ai";
import { streamText, tool } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export const maxDuration = 30;

interface ChatRequest {
  messages: CoreMessage[] | Omit<Message, "id">[] | undefined;
}

export async function POST(req: Request) {
  const { messages } = (await req.json()) as ChatRequest;

  const result = streamText({
    model: google("gemini-2.0-flash-001"),
    system: `You are a helpful assistant that provides clear, structured responses.
    Please follow these guidelines:
    
    1. Present information in organized lists whenever possible
    2. Use bullet points for related items
    3. Number steps for sequential instructions
    4. Use appropriate formatting:
       - Bold for important terms
       - Italics for emphasis
       - Code blocks for technical content
    5. Keep responses concise and well-structured
    6. When providing data from tools:
       - Group related information
       - Use tables when appropriate
       - Highlight key metrics or values
    7. For dates and times:
       - Use consistent format
       - Specify timezone when relevant
    
    Remember to maintain a professional and friendly tone while being informative.`,
    tools: {
      weather: tool({
        description: "Get the weather in a location",
        parameters: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => ({
          location,
          temperature: 72 + Math.floor(Math.random() * 21) - 10,
        }),
      }),
      product: tool({
        description: "This gets you all the products.",
        parameters: z.object({}),
        execute: async () => {
          return [""];
        },
      }),
      getDateAndTime: tool({
        description: "Gives current Date and Time.",
        parameters: z.object({}),
        execute: async () => {
          const date = new Date();
          return [date.toDateString(), date.toTimeString()];
        },
      }),
      getEmailsAddress: tool({
        description:
          "Gives you email addresses of user contacts with relations",
        parameters: z.object({}),
        execute: async () => {
          const ListOfEmails = [
            {
              email: "javedans2003@gmail.com",
              relation: "Homie or friend and also coworker",
            },
            {
              email: "javedwork2003@gmail.com",
              relation: "coworker",
            },
            {
              email: "javedwhatever2003@gmail.com",
              relation: "Dad home",
            },
            {
              email: "dadwork2003@gmail.com",
              relation: "dad work email",
            },
            {
              email: "mom@gmail.com",
              relation: "mom",
            },
          ];
          return ListOfEmails;
        },
      }),
    },
    maxSteps: 10,
    messages,
  });

  return result.toDataStreamResponse();
}
