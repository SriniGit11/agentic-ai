'use client';

import React, { useState, useCallback } from 'react';
import Sidebar from '@/app/components/Sidebar';
import ChatPanel from '@/app/components/ChatPanel';
import MetricsPanel from '@/app/components/MetricsPanel';
import { mockChatMessages, mockChatHistory, mockUserProfile, mockMetricsData } from '@/app/lib/mockData';
import { ChatMessage } from '@/app/types';

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMetricsOpen, setIsMetricsOpen] = useState(true);

  const handleNewChat = useCallback(() => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content:
          'Hello! I\'m your AI assistant. I can help you with analysis, code reviews, documentation, and much more. How can I assist you today?',
        timestamp: new Date(),
      },
    ]);
    setActiveChatId(undefined);
  }, []);

  const handleSelectChat = useCallback((id: string) => {
    setActiveChatId(id);
    // In a real app, this would fetch the full conversation
    // For now, just show a placeholder message
    const selectedChat = mockChatHistory.find((c) => c.id === id);
    if (selectedChat) {
      setMessages([
        {
          id: 'placeholder',
          role: 'assistant',
          content: `Loading conversation: "${selectedChat.title}"...`,
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  const handleSendMessage = useCallback(async (userMessage: string) => {
    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Add assistant response
    const assistantMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `I received your message: "${userMessage}". In a production environment, this would be processed by your AI backend API and you'd receive a meaningful response here.`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoading(false);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((open) => !open);
  }, []);

  const handleToggleMetrics = useCallback(() => {
    setIsMetricsOpen((open) => !open);
  }, []);

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      {isSidebarOpen ? (
        <Sidebar
          chatHistory={mockChatHistory}
          userProfile={mockUserProfile}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          activeChatId={activeChatId}
          onToggleSidebar={handleToggleSidebar}
        />
      ) : (
        <button
          type="button"
          onClick={handleToggleSidebar}
          className="w-14 bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
          aria-label="Open sidebar"
        >
          <span className="text-xl">›</span>
        </button>
      )}

      <ChatPanel
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />

      {isMetricsOpen ? (
        <MetricsPanel data={mockMetricsData} onToggleMetrics={handleToggleMetrics} />
      ) : (
        <button
          type="button"
          onClick={handleToggleMetrics}
          className="w-14 bg-gray-50 text-gray-900 flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Open metrics panel"
        >
          <span className="text-xl">‹</span>
        </button>
      )}
    </div>
  );
}
