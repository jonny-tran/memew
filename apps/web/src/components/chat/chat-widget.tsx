"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageCircle,
  Send,
  Smile,
  Paperclip,
  Minimize2,
  Maximize2,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
  isRead: boolean;
}

export function ChatWidget() {
  // Chat states
  const [showChat, setShowChat] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào! Tôi là admin của Memew. Tôi có thể giúp gì cho bạn? 😊",
      sender: "admin",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      isRead: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [adminOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Chat functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
        isRead: false,
      };

      setMessages([...messages, userMessage]);
      setNewMessage("");

      // Simulate admin typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const adminResponse: Message = {
          id: messages.length + 2,
          text: "Cảm ơn bạn đã liên hệ! Tôi đang xem xét câu hỏi của bạn và sẽ phản hồi chi tiết trong giây lát. Bạn có thể cho tôi biết thêm thông tin về vấn đề này không?",
          sender: "admin",
          timestamp: new Date(),
          isRead: true,
        };
        setMessages(prev => [...prev, adminResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hôm nay";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hôm qua";
    } else {
      return date.toLocaleDateString("vi-VN");
    }
  };

  return (
    <>
      {/* Chat Widget */}
      {showChat && (
        <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}>
          <Card className="h-full shadow-2xl border-2 border-primary/20">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  {adminOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">Memew Support</h3>
                  <p className="text-xs opacity-80">
                    {adminOnline ? "Đang hoạt động" : "Ngoại tuyến"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                  onClick={() => setShowChat(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 h-[480px] overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message, index) => {
                    const showDate = index === 0 || 
                      formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
                    
                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="text-center my-4">
                            <span className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 shadow-sm">
                              {formatDate(message.timestamp)}
                            </span>
                          </div>
                        )}
                        
                        <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                            <div className={`px-4 py-2 rounded-2xl ${
                              message.sender === 'user' 
                                ? 'bg-primary text-primary-foreground rounded-br-md' 
                                : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                            }`}>
                              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                            </div>
                            <div className={`text-xs text-gray-500 mt-1 ${
                              message.sender === 'user' ? 'text-right' : 'text-left'
                            }`}>
                              {formatTime(message.timestamp)}
                              {message.sender === 'user' && (
                                <span className="ml-1">
                                  {message.isRead ? '✓✓' : '✓'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-md shadow-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 bg-white border-t">
                  <div className="flex items-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Nhập tin nhắn..."
                        className="min-h-[40px] max-h-32 resize-none pr-10"
                        rows={1}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500"
                      >
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Chat Toggle Button */}
      {!showChat && (
        <Button
          onClick={() => setShowChat(true)}
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-2xl z-50"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </>
  );
}
