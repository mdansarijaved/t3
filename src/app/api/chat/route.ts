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
  console.log("Message length", messages?.length);

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
    tools: {},

    maxSteps: 10,
    messages,
  });

  return result.toDataStreamResponse();
}
