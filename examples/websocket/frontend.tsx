"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  type: "system" | "user";
  username?: string;
  content: string;
  timestamp: string;
}

export default function WebSocketChat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect through Caddy proxy with XTransformPort
    const newSocket = io({
      path: "/socket.io",
      query: { XTransformPort: "3003" },
    });

    newSocket.on("connect", () => setConnected(true));
    newSocket.on("disconnect", () => setConnected(false));
    newSocket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleJoin = () => {
    if (username.trim() && socket) {
      socket.emit("join", username.trim());
      setJoined(true);
    }
  };

  const handleSend = () => {
    if (message.trim() && socket) {
      socket.emit("message", message.trim());
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      {/* Status indicator */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-3 h-3 rounded-full ${
            connected ? "bg-green-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm text-muted-foreground">
          {connected ? "Connected" : "Disconnected"}
        </span>
      </div>

      {!joined ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex gap-2 w-full max-w-sm">
            <Input
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            />
            <Button onClick={handleJoin} disabled={!connected}>
              Join
            </Button>
          </div>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-1 border rounded-lg p-4 mb-4">
            <div className="space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm ${
                    msg.type === "system"
                      ? "text-muted-foreground italic text-center"
                      : ""
                  }`}
                >
                  {msg.type === "user" && (
                    <span className="font-semibold">{msg.username}: </span>
                  )}
                  {msg.content}
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend} disabled={!connected}>
              Send
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
