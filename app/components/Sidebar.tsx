'use client';

import React, { useState } from 'react';
import { ChatHistory, UserProfile } from '@/app/types';
import { formatDate } from '@/app/lib/utils';

interface SidebarProps {
  chatHistory: ChatHistory[];
  userProfile: UserProfile;
  onNewChat?: () => void;
  onSelectChat?: (id: string) => void;
  onToggleSidebar?: () => void;
  activeChatId?: string;
}

export default function Sidebar({
  chatHistory,
  userProfile,
  onNewChat,
  onSelectChat,
  onToggleSidebar,
  activeChatId,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = chatHistory.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen border-r border-gray-800">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between gap-3">
        <button
          onClick={onNewChat}
          className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2"
        >
          <span>+</span>
          <span>New Chat</span>
        </button>
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-white transition-colors"
            aria-label="Collapse sidebar"
          >
            <span className="text-lg">‹</span>
          </button>
        )}
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-800">
        <input
          type="text"
          placeholder="Search history..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
        />
      </div>

      {/* Conversation History */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Your Conversation History
        </div>
        <nav className="space-y-1 px-2">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat?.(chat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex flex-col gap-1 ${
                  activeChatId === chat.id
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
              >
                <span className="font-medium truncate">{chat.title}</span>
                <span className="text-xs text-gray-500 truncate">{formatDate(chat.createdAt)}</span>
              </button>
            ))
          ) : (
            <div className="px-3 py-4 text-xs text-gray-500 text-center">No conversations found</div>
          )}
        </nav>
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {userProfile.avatar || userProfile.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{userProfile.name}</div>
            <div className="text-xs text-gray-400 truncate">{userProfile.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
