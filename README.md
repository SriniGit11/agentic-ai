# AI Assistant Dashboard

Enterprise-grade AI chatbot interface built with React, Next.js, TypeScript, and Tailwind CSS.

## Overview

A production-ready frontend implementation of a modern AI assistant dashboard featuring a professional three-panel layout inspired by tools like ChatGPT Enterprise and Azure AI Studio.

## Features

- **Three-Panel Layout**
  - Left Sidebar: Chat history, search, and user profile
  - Center Chat Panel: Conversation area with message history
  - Right Metrics Panel: Operational metrics and execution logs

- **Modern UI/UX**
  - Responsive message styling (user vs. assistant)
  - Real-time message scrolling
  - Loading indicators
  - Professional color scheme

- **Strong TypeScript Typing**
  - Fully typed components and hooks
  - Type-safe message structures
  - Reusable interfaces

- **Production-Ready**
  - Next.js 14+ with App Router
  - Tailwind CSS for styling
  - Component-based architecture
  - Mock data for immediate development

## Project Structure

```
agentic-ai/
├── app/
│   ├── components/
│   │   ├── Sidebar.tsx          # Left navigation panel
│   │   ├── ChatPanel.tsx        # Main chat interface
│   │   └── MetricsPanel.tsx     # Right metrics display
│   ├── lib/
│   │   ├── mockData.ts          # Sample data for development
│   │   └── utils.ts             # Helper functions
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd agentic-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Component APIs

### Sidebar Component
```typescript
interface SidebarProps {
  chatHistory: ChatHistory[];
  userProfile: UserProfile;
  onNewChat?: () => void;
  onSelectChat?: (id: string) => void;
  activeChatId?: string;
}
```

### ChatPanel Component
```typescript
interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}
```

### MetricsPanel Component
```typescript
interface MetricsPanelProps {
  data: MetricsData;
}
```

## Type Definitions

All types are defined in `app/types/index.ts`:

- `ChatMessage` - Individual message in conversation
- `ChatHistory` - Summary of previous conversations
- `UserProfile` - User information
- `MetricsData` - Operational metrics and logs
- `ExecutionStep` - Individual step in execution log

## Styling

The project uses Tailwind CSS with a carefully chosen color palette:

- **Grays**: Neutral backgrounds and borders
- **Blue**: Primary action colors and user messages
- **Green**: Success states and completed actions
- **Emerald**: Environmental metrics

Custom variables and animations are defined in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Global styles and animations

## Mock Data

Mock data is provided in `app/lib/mockData.ts` for immediate development:

- Sample chat messages
- Chat history with timestamps
- User profile information
- Operational metrics
- Execution logs

Replace these with real API calls when building the backend.

## Integration Guide

### Connecting to a Backend API

1. **Replace mock data** with API calls in the main page component
2. **Add state management** (Redux, Zustand, etc.) for complex state
3. **Create API service** in `app/lib/api.ts`
4. **Update component props** to accept API-controlled state

Example:
```typescript
// app/lib/api.ts
export async function sendMessage(message: string) {
  const response = await fetch('/api/messages', {
    method: 'POST',
    body: JSON.stringify({ content: message }),
  });
  return response.json();
}
```

## Best Practices Followed

✅ **Component Architecture**: Modular, reusable components
✅ **Type Safety**: Full TypeScript with strict mode
✅ **Performance**: Optimized rendering and scrolling
✅ **Accessibility**: Semantic HTML and keyboard navigation
✅ **Responsive Design**: Flexible layouts (easily adaptable)
✅ **Code Quality**: Clean, readable, well-documented code

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Client-side routing with Next.js
- CSS-in-JS with Tailwind (minimal bundle size)
- Optimized re-renders with React hooks
- Custom scrollbar implemented for smooth UX

## Future Enhancements

- [ ] Message persistence with database
- [ ] User authentication
- [ ] Real-time updates with WebSockets
- [ ] File upload support
- [ ] Message markdown rendering
- [ ] Dark mode toggle
- [ ] Mobile responsive improvements
- [ ] Analytics integration

## License

MIT License - feel free to use this as a foundation for your project

## Support

For questions or issues, please refer to the component documentation or create an issue in the repository.
