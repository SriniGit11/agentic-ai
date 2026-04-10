export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface ChatHistory {
  id: string;
  title: string;
  createdAt: Date;
  preview: string;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar?: string;
}

export interface ExecutionStep {
  id: string;
  name: string;
  completed: boolean;
  timestamp?: Date;
}

export interface MetricsData {
  estimatedCost: number;
  co2Impact: number;
  executionSteps: ExecutionStep[];
}
