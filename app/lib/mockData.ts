import { ChatMessage, ChatHistory, UserProfile, MetricsData } from '@/app/types';

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      'Hello! I\'m your AI assistant. I can help you with analysis, code reviews, documentation, and much more. How can I assist you today?',
    timestamp: new Date('2024-04-09T10:00:00Z'),
  },
];

export const mockChatHistory: ChatHistory[] = [
  {
    id: '1',
    title: 'Q3 Performance Review Analysis',
    createdAt: new Date('2024-04-08T10:00:00Z'),
    preview: 'Analyzed Q3 metrics and provided insights...',
  },
  {
    id: '2',
    title: 'API Documentation Generation',
    createdAt: new Date('2024-04-07T10:00:00Z'),
    preview: 'Generated comprehensive API docs for the new service...',
  },
  {
    id: '3',
    title: 'Database Optimization Strategy',
    createdAt: new Date('2024-04-04T10:00:00Z'),
    preview: 'Reviewed current schema and suggested improvements...',
  },
  {
    id: '4',
    title: 'Incident Root Cause Analysis',
    createdAt: new Date('2024-04-02T10:00:00Z'),
    preview: 'Helped diagnose the production issue from last week...',
  },
  {
    id: '5',
    title: 'Code Quality Metrics',
    createdAt: new Date('2024-03-30T10:00:00Z'),
    preview: 'Provided detailed code review and recommendations...',
  },
];

export const mockUserProfile: UserProfile = {
  name: 'Alexandra Chen',
  role: 'Senior DevOps Engineer',
  avatar: 'AC',
};

export const mockMetricsData: MetricsData = {
  estimatedCost: 0.0003,
  co2Impact: 0.000015,
  executionSteps: [
    {
      id: '1',
      name: 'Parsing user intent',
      completed: true,
      timestamp: new Date('2024-04-09T10:00:00Z'),
    },
    {
      id: '2',
      name: 'Generating response',
      completed: true,
      timestamp: new Date('2024-04-09T10:00:05Z'),
    },
    {
      id: '3',
      name: 'Preparing next step',
      completed: false,
    },
  ],
};
