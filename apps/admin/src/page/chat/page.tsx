import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useChatStore, type Message } from "@/store/chatStore";
import { IconSend } from "@/components/icons";
import { DashboardLayout } from "@/layouts/dashboard-layout";

/**
 * ChatPage - admin chat with customers
 * - Left: conversations list
 * - Right: messages + composer
 */
export default function ChatPage() {
  const {
    conversations,
    fetchConversations,
    selectConversation,
    sendMessage,
    markAsRead,
  } = useChatStore();
  const [query, setQuery] = useState("");
  const selected = useChatStore((s) => s.selectedConversationId);
  const conv = conversations.find((c) => c.id === selected) ?? null;

  useEffect(() => {
    fetchConversations();
    // optional: start polling mock new messages inside store
  }, [fetchConversations]);

  const filtered = useMemo(
    () =>
      conversations.filter((c) =>
        c.customerName.toLowerCase().trim().includes(query.toLowerCase().trim())
      ),
    [conversations, query]
  );

  return (
    <DashboardLayout>
      <div className="p-6 min-h-screen">
        <Card className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4 min-h-[600px]">
          <div className="border-r">
            <CardHeader className="px-4 py-3">
              <CardTitle className="text-lg">Chat với khách</CardTitle>
              <div className="mt-2">
                <Input
                  placeholder="Tìm khách..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-auto max-h-[560px]">
              <div className="space-y-0">
                {filtered.map((c) => (
                  <div
                    key={c.id}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      c.id === selected ? "bg-white dark:bg-gray-800" : ""
                    }`}
                    onClick={() => {
                      selectConversation(c.id);
                      markAsRead(c.id);
                    }}
                    role="button"
                    aria-label={`Open conversation ${c.customerName}`}
                  >
                    <Avatar>
                      <AvatarImage
                        src={c.avatarUrl || undefined}
                        alt={c.customerName}
                      />
                      <AvatarFallback>
                        {c.customerName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-medium truncate">
                          {c.customerName}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-600">
                          {new Date(c.lastMessageAt).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 truncate mt-1">
                        {c.lastMessagePreview}
                      </div>
                    </div>
                    {c.unreadCount > 0 && (
                      <div className="ml-2 text-xs bg-red-500 text-white dark:text-white px-2 py-0.5 rounded-full">
                        {c.unreadCount}
                      </div>
                    )}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="p-4 text-sm text-gray-500 dark:text-gray-400">
                    Không tìm thấy cuộc trò chuyện
                  </div>
                )}
              </div>
            </CardContent>
          </div>

          <div className="flex flex-col">
            <CardHeader className="px-4 py-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {conv ? (
                    <Avatar>
                      <AvatarImage
                        src={conv.avatarUrl || undefined}
                        alt={conv.customerName}
                      />
                      <AvatarFallback>
                        {conv.customerName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded" />
                  )}
                  <div>
                    <div className="font-medium">
                      {conv?.customerName ?? "Chọn cuộc trò chuyện"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {conv
                        ? conv.online
                          ? "Đang hoạt động"
                          : "Ngoại tuyến"
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {conv ? `#${conv.id}` : ""}
                </div>
              </div>
            </CardHeader>

            <CardContent
              className="flex-1 p-4 overflow-auto"
              id="chat-scroll"
              aria-live="polite"
            >
              {conv ? (
                <div className="space-y-3">
                  {conv.messages.map((m) => (
                    <ChatBubble key={m.id} message={m} />
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                  Chọn một cuộc trò chuyện để hiển thị tin nhắn.
                </div>
              )}
            </CardContent>

            <div className="px-4 py-3 border-t">
              <Composer
                onSend={(text, file) =>
                  conv && sendMessage(conv.id, text, file)
                }
                disabled={!conv}
              />
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

/** ChatBubble component */
function ChatBubble({ message }: { message: Message }) {
  const isAdmin = message.from === "admin";
  return (
    <div className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}>
      <div
        className={`${
          isAdmin
            ? "bg-blue-400 text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        } max-w-[70%] px-4 py-2 rounded-lg`}
      >
        <div className="text-sm whitespace-pre-wrap">{message.text}</div>
        {message.file && (
          <div className="text-xs text-gray-200 dark:text-gray-600 mt-1">
            📎 {message.file.name}
          </div>
        )}
        <div className="text-xs text-gray-200 dark:text-gray-600 mt-1 text-right">
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

/** Composer */
function Composer({
  onSend,
  disabled,
}: {
  onSend: (text: string, file?: File | null) => void;
  disabled?: boolean;
}) {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim(), file);
      setText("");
      setFile(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        ref={inputRef}
        className="flex-1"
        placeholder={
          disabled ? "Chọn cuộc trò chuyện trước" : "Nhập tin nhắn..."
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && text.trim()) {
            handleSend();
          }
        }}
        disabled={disabled}
        aria-label="message-input"
      />
      <input
        type="file"
        className="hidden"
        id="file-input"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        disabled={disabled}
      />
      <label
        htmlFor="file-input"
        className={`text-sm px-3 py-2 border rounded cursor-pointer ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        📎
      </label>
      {file && (
        <div className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-32">
          {file.name}
        </div>
      )}
      <Button
        aria-label="Send message"
        disabled={disabled || text.trim() === ""}
        onClick={handleSend}
        size="sm"
      >
        <IconSend className="w-4 h-4" />
      </Button>
    </div>
  );
}
