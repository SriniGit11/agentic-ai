'use client';

import React, { useState, useCallback, useEffect } from 'react';
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
  const [progressLogs, setProgressLogs] = useState<string[]>([]);
  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);

  useEffect(() => {
    if (!currentMessageId) return;

    const pollProgress = async () => {
      try {
        const response = await fetch('/api/progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messageid: currentMessageId }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.progress) {
            setProgressLogs((prev) => [...prev, data.progress]);
            if (data.progress === 'end') {
              // Make third API call for final response
              try {
                const finalResponse = await fetch('/api/progress', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ messageid: currentMessageId, topic: `${currentMessageId}final` }),
                });
                if (finalResponse.ok) {
                  const finalData = await finalResponse.json();
                  const finalMsg: ChatMessage = {
                    id: (Date.now() + 2).toString(),
                    role: 'assistant',
                    content: finalData.progress || JSON.stringify(finalData),
                    timestamp: new Date(),
                  };
                  setMessages((prev) => [...prev, finalMsg]);
                }
              } catch (error) {
                console.error('Final API error:', error);
              }
              setCurrentMessageId(null);
            }
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
        setCurrentMessageId(null);
      }
    };

    const interval = setInterval(pollProgress, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [currentMessageId]);

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
    setProgressLogs([]);
    setCurrentMessageId(null);
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
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setProgressLogs([]);
    setCurrentMessageId(null);

    const generateMessageId = (): string => {
      const timestampPart = Date.now().toString(36).slice(-4).padStart(4, '0');
      const randomPart = Math.random().toString(36).slice(2, 6);
      return `${timestampPart}${randomPart}`;
    };

    const messageid = generateMessageId();
    const topic = `${messageid}pub`;

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: '',
          messageid,
          extension: '',
          query: userMessage,
          topic,
          history: [],
          fileType: null,
          fileName: null,
          progress: null,
          state_tag: 0,
        }),
      });

      const text = await response.text();
      let reply = text;

      if (response.ok) {
        try {
          const json = JSON.parse(text);
          reply = typeof json.reply === 'string' ? json.reply : JSON.stringify(json, null, 2);
        } catch {
          reply = text;
        }
      } else {
        let errorData;
        try {
          errorData = JSON.parse(text);
        } catch {
          errorData = { error: 'Unknown API error' };
        }
        throw new Error(errorData.error || 'API request failed');
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Check if response has progress to start polling
      try {
        const json = JSON.parse(reply);
        if (json.progress) {
          setProgressLogs([json.progress]);
          setCurrentMessageId(messageid);
        }
      } catch {
        // Not JSON, ignore
      }
    } catch (error: unknown) {
      const errorContent = error instanceof Error ? error.message : 'Unknown error sending message';
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error sending message to API: ${errorContent}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
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
        <MetricsPanel data={mockMetricsData} progressLogs={progressLogs} onToggleMetrics={handleToggleMetrics} />
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
