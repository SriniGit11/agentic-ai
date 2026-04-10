'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ChatMessage } from '@/app/types';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}

export default function ChatPanel({ messages, onSendMessage, isLoading = false }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [uploadedImageName, setUploadedImageName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImageName(file.name);
    }
  };

  const handleMicClick = () => {
    console.log('Mic button pressed');
  };

  return (
    <main className="flex-1 flex flex-col bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto w-full max-w-4xl space-y-6">
          {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to AI Assistant</h2>
              <p className="text-gray-600">Start a new conversation to get started</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'user' ? (
                  <>
                    <div className="max-w-4xl px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <div className="flex-shrink-0 ml-3 mt-1">
                      <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-shrink-0 mr-3 mt-1">
                      <svg className="w-8 h-8 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4V5H16V4C16 1.79 14.21 0 12 0S8 1.79 8 4V5H10V4C10 2.9 10.9 2 12 2ZM21 9V7L19 6.6C18.8 6.3 18.5 6.1 18.2 6L17 7.8L15.8 6C15.5 6.1 15.2 6.3 15 6.6L13 7V9H15V8.4L16 9.4L17 8.4V9H21ZM3 9V7L5 6.6C5.2 6.3 5.5 6.1 5.8 6L7 7.8L8.2 6C8.5 6.1 8.8 6.3 9 6.6L11 7V9H9V8.4L8 9.4L7 8.4V9H3ZM12 10C13.66 10 15 11.34 15 13V16H9V13C9 11.34 10.34 10 12 10ZM18 13C18 10.79 16.21 9 14 9H10C7.79 9 6 10.79 6 13V18H18V13Z"/>
                      </svg>
                    </div>
                    <div className="max-w-4xl px-4 py-3 rounded-lg bg-gray-100 text-gray-900 border border-gray-200 rounded-bl-none">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex-shrink-0 mr-3 mt-1">
                  <svg className="w-8 h-8 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C13.1 2 14 2.9 14 4V5H16V4C16 1.79 14.21 0 12 0S8 1.79 8 4V5H10V4C10 2.9 10.9 2 12 2ZM21 9V7L19 6.6C18.8 6.3 18.5 6.1 18.2 6L17 7.8L15.8 6C15.5 6.1 15.2 6.3 15 6.6L13 7V9H15V8.4L16 9.4L17 8.4V9H21ZM3 9V7L5 6.6C5.2 6.3 5.5 6.1 5.8 6L7 7.8L8.2 6C8.5 6.1 8.8 6.3 9 6.6L11 7V9H9V8.4L8 9.4L7 8.4V9H3ZM12 10C13.66 10 15 11.34 15 13V16H9V13C9 11.34 10.34 10 12 10ZM18 13C18 10.79 16.21 9 14 9H10C7.79 9 6 10.79 6 13V18H18V13Z"/>
                  </svg>
                </div>
                <div className="bg-gray-100 text-gray-900 border border-gray-200 px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-delay-1"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-delay-2"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto w-full max-w-4xl relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Shift+Enter for new line)"
            disabled={isLoading}
            className="w-full min-h-[80px] max-h-[120px] resize-none rounded-[28px] border border-gray-200 bg-white px-4 py-3 pb-16 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:cursor-not-allowed overflow-y-auto"
            rows={2}
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMicClick}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
                aria-label="Start voice input"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 1.75a3.75 3.75 0 0 1 3.75 3.75v5.25a3.75 3.75 0 1 1-7.5 0V5.5A3.75 3.75 0 0 1 12 1.75z" />
                  <path d="M19.5 11.25a7.5 7.5 0 0 1-15 0" />
                  <path d="M12 19.25v3.5" />
                  <path d="M8.25 22.75h7.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleUploadButtonClick}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
                aria-label="Upload image"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.5 19.5h15a1.5 1.5 0 0 0 1.5-1.5V8.25a1.5 1.5 0 0 0-1.5-1.5h-15A1.5 1.5 0 0 0 3 8.25v9.75a1.5 1.5 0 0 0 1.5 1.5z" />
                  <path d="M8.25 12.75l2.25 2.25L12.75 11.25l4.5 4.5" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white transition hover:from-blue-700 hover:to-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Send message"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
