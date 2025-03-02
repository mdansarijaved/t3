"use client";
import { Send } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { cn } from "~/lib/utils";
import { ScrollArea } from "~/app/_components/ui/scroll-area";
import Markdown from "react-markdown";

function ChatPage() {
  const { handleSubmit, handleInputChange, input, messages } = useChat({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderMessageContent = (message: { role: string; content: string }) => {
    if (message.role === "user") {
      return <div className="text-sm leading-relaxed">{message.content}</div>;
    }
    return (
      <div className="prose prose-sm">
        <Markdown>{message.content}</Markdown>
      </div>
    );
  };

  console.log("messages: ", messages);
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="w-full border-b py-4 text-center text-3xl font-semibold capitalize">
        Ai chat
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-full",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900",
                )}
              >
                <div className="mb-1 text-xs font-medium opacity-75">
                  {message.role === "user" ? "You" : "AI Assistant"}
                </div>
                {renderMessageContent(message)}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="border-t bg-white p-4">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 rounded-lg border bg-white p-2"
        >
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-1 px-3 py-2 focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
            type="submit"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
