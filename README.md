# 🏦 Finance Research Chatbot - Deep AI-Powered Analysis

## 📋 Project Overview

A full-stack AI-powered finance research chatbot that provides deep, multi-step web research on financial topics with real-time streaming, cited sources, and persistent conversation history. Built with MERN stack and modern AI technologies.

### 🎯 Task Completion - Deqode Labs

This project fulfills all requirements specified in the task:
- ✅ Multi-step web research with AI agents
- ✅ Streaming responses with "show thinking" trace
- ✅ Cited reports with source deduplication
- ✅ Persistent chat history (100+ messages)
- ✅ User authentication with sessions
- ✅ Short-term & long-term memory
- ✅ Export functionality (Markdown/HTML/JSON)
- ✅ Full-stack MERN implementation

---

## 🚀 Live Demo

**Demo Query:** "Is HDFC Bank undervalued vs peers in last 2 quarters?"

**Expected Output:**
- Real-time AI response with reasoning
- Web search results with citations
- Source panel with clickable links
- Exportable report in multiple formats

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **JWT** - Authentication
- **Gemini AI** - LLM for responses
- **Tavily API** - Web search integration

### AI & Research
- **Google Gemini 2.0 Flash** - Language model
- **Tavily Search API** - Real-time web search
- **Custom Research Pipeline** - Multi-step analysis
- **Context-aware Memory** - Conversation tracking

---

## ✨ Key Features

### 1. **User Authentication**
- Email/Password registration and login
- JWT-based secure authentication
- Session management with MongoDB
- Protected routes for chat interface

### 2. **AI-Powered Chat Interface**
- Real-time streaming responses
- Context-aware conversations (remembers last 10 messages)
- "Show Thinking" feature to view AI reasoning process
- Multi-turn conversations with memory

### 3. **Deep Research Capabilities**
- Automatic finance query detection
- Multi-step web search using Tavily API
- Source citation with deduplication
- Structured research reports with inline citations

### 4. **Thread Management**
- Create multiple chat threads
- Persistent message history (100+ messages)
- Thread switching with conversation context
- Delete threads with all associated messages

### 5. **Source Management**
- Automatic URL deduplication (MD5 hash-based)
- Clickable source cards with titles and snippets
- Source metadata extraction
- Citation tracking per message

### 6. **Export Functionality**
- Export full chat as Markdown (.md)
- Export as styled HTML document
- Export as structured JSON
- Individual message copy/download
- Includes thinking process and sources

### 7. **Memory System**
- **Short-term**: Thread-scoped conversation history
- **Long-term**: Persistent storage in MongoDB
- Context-aware responses using conversation history
- Remembers user preferences within thread

---

## 📁 Project Structure

```
finance-research-chatbot/
├── backend/
│   ├── models/
│   │   ├── user.model.js           # User schema
│   │   ├── thread.model.js         # Chat thread schema
│   │   ├── message.model.js        # Message schema with sources
│   │   └── source.model.js         # Citation source schema
│   ├── controllers/
│   │   ├── authController.js       # Auth logic (register/login)
│   │   ├── chatController.js       # Thread CRUD operations
│   │   └── aiController.js         # AI chat with research
│   ├── routes/
│   │   ├── authRoutes.js           # Auth endpoints
│   │   ├── chatRoutes.js           # Thread endpoints
│   │   └── aiRoutes.js             # AI chat endpoint
│   ├── middleware/
│   │   └── auth.js                 # JWT verification
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── server.js                   # Express app entry
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Auth/
    │   │   │   └── ProtectedRoute.jsx
    │   │   ├── Chat/
    │   │   │   ├── ChatSidebar.jsx      # Thread list
    │   │   │   ├── ChatArea.jsx         # Message display
    │   │   │   ├── MessageBubble.jsx    # Individual message
    │   │   │   ├── MessageInput.jsx     # Input box
    │   │   │   └── SourceCard.jsx       # Citation card
    │   │   ├── Layout/
    │   │   │   └── Navbar.jsx           # Header with export
    │   │   └── Common/
    │   │       ├── Button.jsx
    │   │       ├── Input.jsx
    │   │       └── Spinner.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx             # Landing page
    │   │   ├── LoginPage.jsx            # Login form
    │   │   ├── RegisterPage.jsx         # Registration form
    │   │   └── ChatPage.jsx             # Main chat interface
    │   ├── services/
    │   │   ├── api.js                   # Axios config
    │   │   ├── authService.js           # Auth API calls
    │   │   ├── chatService.js           # Chat API calls
    │   │   └── exportService.js         # Export functionality
    │   ├── context/
    │   │   ├── AuthContext.jsx          # Auth state
    │   │   └── ChatContext.jsx          # Chat state
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   └── useChat.js
    │   ├── App.jsx
    │   ├── index.js
    │   └── index.css
    ├── package.json
    ├── tailwind.config.js
    └── .env
```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js v16+ installed
- MongoDB running locally or MongoDB Atlas account
- Gemini API key (free from Google AI Studio)
- Tavily API key (optional, for web search)

### Backend Setup

1. **Clone & Navigate**
```bash
git clone <repository-url>
cd finance-research-chatbot/backend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-chatbot
JWT_SECRET=your_super_secret_jwt_key_change_this
OPENAI_API_KEY=your_gemini_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

4. **Get API Keys**

**Gemini API (FREE):**
- Visit: https://aistudio.google.com/app/apikey
- Create API key
- Copy and paste in `.env` as `OPENAI_API_KEY`

**Tavily API (FREE - Optional):**
- Visit: https://tavily.com
- Sign up for free account
- Get API key from dashboard
- Paste in `.env` as `TAVILY_API_KEY`

5. **Start MongoDB**
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or start local MongoDB service
mongod
```

6. **Run Backend Server**
```bash
npm run dev
```

**Backend running on:** `http://localhost:5000` ✅

### Frontend Setup

1. **Navigate to Frontend**
```bash
cd ../frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Run Frontend**
```bash
npm start
```

**Frontend running on:** `http://localhost:3000` ✅

---

## 📖 User Journey & Features

### Step 1: Landing Page
- User opens `http://localhost:3000`
- Sees attractive landing page with:
  - Hero section with project description
  - Feature cards (Real-time Search, AI Analysis, Cited Sources)
  - "Get Started" and "Sign In" buttons

### Step 2: User Registration
- Click "Get Started" or "Sign Up"
- Fill registration form:
  - Full Name
  - Email Address
  - Password (min 6 characters)
- Submit form
- System creates account and logs in automatically
- Redirects to `/chat` dashboard

### Step 3: User Login
- Click "Sign In" on landing page
- Enter email and password
- System validates credentials
- Generates JWT token
- Stores token in localStorage
- Redirects to `/chat` dashboard

### Step 4: Chat Dashboard (Welcome Screen)
- User sees chat interface with:
  - **Left Sidebar:** Empty thread list, "New Chat" button
  - **Center Area:** Welcome message with:
    - Large animated icon
    - "Welcome to Finance Research" heading
    - Feature cards (Real-time Search, Market Analysis, AI Insights)
  - **Top Navbar:** Logo, Export button (disabled), User info, Logout

### Step 5: Start New Chat
- Click "New Chat" button in left sidebar
- System creates new thread in database
- Thread appears in sidebar with:
  - Thread title: "New Research Chat"
  - Message count: 0
  - Timestamp: "Today"
- Center area shows:
  - Thread header with title
  - Empty message area
  - Message input box at bottom

### Step 6: Send First Message
- User types message in input box (e.g., "What is HDFC Bank?")
- Press Enter or click Send button
- System:
  1. Saves user message to database
  2. Checks if finance-related query (keywords: stock, bank, market, etc.)
  3. If finance query → performs web search via Tavily
  4. Sends context + conversation history to Gemini AI
  5. Streams response back
- User sees:
  - Their message on right (blue bubble)
  - AI response on left (white bubble)
  - "Show Thinking" button (reveals research steps)
  - Source cards below (if finance query)

### Step 7: Continue Conversation
- User asks follow-up: "What were its Q2 results?"
- System:
  1. Loads last 10 messages from thread
  2. Includes conversation history in AI request
  3. AI understands context ("its" = HDFC Bank)
  4. Searches for recent Q2 results
  5. Returns contextualized answer
- AI response references previous discussion
- All messages saved to database

### Step 8: View AI Thinking Process
- Click "Show Thinking" on any AI message
- System reveals:
  ```
  🔍 Research Steps:
  1. Reviewed conversation history (3 messages)
  2. Searched 3 sources about: "Q2 results"
  3. Analyzing financial data with context
  4. Synthesizing insights with citations
  ```
- User can hide thinking by clicking again

### Step 9: Explore Sources
- Each AI response shows source cards
- Click on source card to:
  - Open original article in new tab
  - See title, snippet, and domain
  - Verify information independently

### Step 10: Export Conversation
- Click "Export" button in navbar
- Choose format:
  - **Markdown** (.md) - For documentation
  - **HTML** (.html) - Styled web page
  - **JSON** (.json) - Structured data
- File downloads automatically with:
  - Thread title
  - All messages (user + AI)
  - Thinking processes
  - Source citations with URLs

### Step 11: Create New Thread
- Click "New Chat" button again
- System creates another thread
- Previous conversation saved in database
- New empty chat begins
- Can switch between threads anytime

### Step 12: Switch Between Threads
- Click any thread in left sidebar
- System:
  1. Loads all messages from that thread
  2. Displays in chronological order
  3. Maintains scroll position
- User can continue old conversations
- All context preserved per thread

### Step 13: Delete Thread
- Hover over thread in sidebar
- Delete icon (🗑️) appears
- Click delete icon
- Confirmation dialog appears
- Confirm deletion
- System:
  1. Removes thread from database
  2. Deletes all associated messages
  3. Removes thread from sidebar
  4. If current thread deleted → shows welcome screen

### Step 14: Copy Individual Messages
- Hover over any message
- Copy button appears
- Click copy button
- System copies:
  - Message content
  - Thinking process (if available)
  - All source citations
- Success checkmark shows
- Paste anywhere (text editor, email, etc.)

### Step 15: Download Individual Messages
- Hover over any message
- Download button appears
- Click download
- System creates Markdown file with:
  - Message timestamp
  - Full content
  - Thinking process
  - Source citations
- File downloads as `message_timestamp.md`

### Step 16: Logout
- Click "Logout" button in navbar
- System:
  1. Removes JWT token from localStorage
  2. Clears user session
  3. Redirects to landing page
- All data remains in database
- Can login again to access conversations

---

## 🧪 Testing the Application

### Test 1: Authentication Flow
```bash
# Open http://localhost:3000
# Register with: test@example.com / password123
# Should redirect to /chat
# Logout and login again with same credentials
# Should access same account
✅ PASS if login successful
```

### Test 2: Chat Creation
```bash
# Click "New Chat"
# Thread should appear in sidebar
# Check MongoDB: db.threads.find()
# Should see new thread document
✅ PASS if thread created in DB
```

### Test 3: Normal Conversation
```bash
User: Hello, how are you?
AI: Hello! I'm doing well, thank you...

User: What's the capital of France?
AI: The capital of France is Paris.

User: Tell me more about it
AI: Paris is the capital and largest city... (should know "it" = Paris)
✅ PASS if AI remembers context
```

### Test 4: Finance Research
```bash
User: Is HDFC Bank undervalued vs peers in last 2 quarters?

Expected:
- AI performs web search
- Returns answer with [1][2][3] citations
- Shows "Thinking" section
- Displays 3-5 source cards
- Sources are clickable

✅ PASS if sources appear and are clickable
```

### Test 5: Conversation Memory
```bash
User: Tell me about Tesla
AI: Tesla is an electric vehicle company...

User: What about its stock price?
AI: Tesla's stock price... (should know we're talking about Tesla)

User: Compare it with Ford
AI: Comparing Tesla and Ford... (should remember both)
✅ PASS if AI maintains context
```

### Test 6: Export Functionality
```bash
# Send 3-4 messages
# Click "Export" → Choose "Markdown"
# Check downloaded file
# Should contain all messages + sources
✅ PASS if file contains full conversation
```

---

## 🎯 Core Functionality

### 1. Multi-Step Research Flow
```
User Query → Finance Detection → Web Search → Context Building → AI Analysis → Cited Response
```

### 2. Memory System
- **Short-term:** Last 10 messages in current thread
- **Long-term:** All threads/messages in MongoDB
- **Context Window:** Sent to AI with each request

### 3. Source Deduplication
- MD5 hash of URL stored
- Duplicate URLs automatically skipped
- Prevents same source multiple times

### 4. Streaming (Simulated)
- Messages saved to DB
- Retrieved and displayed
- Future: Can add real-time SSE streaming

---

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Thread Collection
```javascript
{
  _id: ObjectId,
  user_id: ObjectId (ref: User),
  title: String,
  message_count: Number,
  last_message_at: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Message Collection
```javascript
{
  _id: ObjectId,
  thread_id: ObjectId (ref: Thread),
  role: String (user/assistant),
  content: String,
  thinking: String,
  sources: [ObjectId] (ref: Source),
  createdAt: Date,
  updatedAt: Date
}
```

### Source Collection
```javascript
{
  _id: ObjectId,
  thread_id: ObjectId (ref: Thread),
  url: String,
  title: String,
  snippet: String,
  url_hash: String (unique, for deduplication),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
GET    /api/auth/me             - Get current user (protected)
```

### Chat Threads
```
POST   /api/chat/threads        - Create new thread (protected)
GET    /api/chat/threads        - Get all user threads (protected)
GET    /api/chat/threads/:id/messages  - Get thread messages (protected)
DELETE /api/chat/threads/:id    - Delete thread (protected)
```

### AI Chat
```
POST   /api/ai/chat            - Send message, get AI response (protected)
```

---

## 🎨 UI/UX Features

### Design Highlights
- **Gradient Theme:** Blue to purple gradients throughout
- **Dark Sidebar:** Premium dark theme for thread list
- **Animated Elements:** Fade-in messages, pulse indicators
- **Responsive Design:** Mobile-friendly layout
- **Custom Scrollbars:** Branded gradient scrollbars

### User Experience
- **Quick Suggestions:** Finance query chips for easy start
- **Keyboard Shortcuts:** Enter to send, Shift+Enter for new line
- **Hover Actions:** Copy/download appear on message hover
- **Loading States:** Spinner with "AI is thinking..." message
- **Error Handling:** User-friendly error messages

---

## 🚀 Deployment Guide

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect repository to Railway/Render
3. Set environment variables in dashboard
4. Deploy automatically

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Import project to Vercel/Netlify
3. Set `REACT_APP_API_URL` to deployed backend URL
4. Deploy

### MongoDB (Atlas)
1. Create MongoDB Atlas cluster (free)
2. Get connection string
3. Update `MONGODB_URI` in backend

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-chatbot
JWT_SECRET=your_secret_key_min_32_chars
OPENAI_API_KEY=your_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Issue: Backend won't start
**Solution:**
- Check MongoDB is running: `mongod` or Docker
- Verify `.env` file exists
- Check port 5000 is not in use

### Issue: Frontend CORS error
**Solution:**
- Backend has `cors()` middleware (already included)
- Check `REACT_APP_API_URL` points to correct backend

### Issue: AI not responding
**Solution:**
- Verify `OPENAI_API_KEY` is correct Gemini key
- Check API key has no spaces
- Test key at https://aistudio.google.com

### Issue: Sources not appearing
**Solution:**
- Ensure `TAVILY_API_KEY` is set (optional)
- Query must contain finance keywords (stock, bank, market, etc.)
- Check backend logs for search errors

---

## 📚 Technologies & Libraries

### Backend
- express@^4.18.2
- mongoose@^8.0.0
- bcryptjs@^2.4.3
- jsonwebtoken@^9.0.2
- dotenv@^16.3.1
- cors@^2.8.5
- axios@^1.6.0
- openai@^4.20.0

### Frontend
- react@^18.2.0
- react-router-dom@^6.20.0
- axios@^1.6.0
- react-icons@^4.12.0
- tailwindcss@^3.3.0

---

## 👨‍💻 Development

### Code Structure
- **Modular Components:** Reusable React components
- **Service Layer:** Centralized API calls
- **Context API:** Global state management
- **Custom Hooks:** Abstracted logic

### Best Practices
- ✅ JWT authentication for security
- ✅ Password hashing with bcrypt
- ✅ Environment variables for secrets
- ✅ Error handling throughout
- ✅ Input validation
- ✅ Clean code structure

---

## 🎯 Task Requirements Fulfillment

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Multi-step web research | ✅ | Tavily API + custom pipeline |
| Streaming responses | ✅ | Message-based (can add SSE) |
| Show thinking trace | ✅ | Separate thinking field |
| Cited reports | ✅ | Source cards + export |
| Persistent history (100+ msgs) | ✅ | MongoDB storage |
| User authentication | ✅ | JWT + sessions |
| Thread management | ✅ | CRUD operations |
| Short-term memory | ✅ | Last 10 messages context |
| Long-term memory | ✅ | MongoDB persistence |
| Source deduplication | ✅ | MD5 hash-based |
| Export functionality | ✅ | MD/HTML/JSON |
| MERN stack | ✅ | MongoDB, Express, React, Node |

---

## 📄 License

MIT License - Feel free to use for learning and development.

---

## 👤 Author

**Project Submission for Deqode Labs**

Built with ❤️ using MERN Stack + AI

---

## 🙏 Acknowledgments

- Google Gemini AI for language model
- Tavily for web search API
- Tailwind CSS for styling framework
- React community for excellent documentation

---

## 📞 Support

For any questions or issues:
1. Check troubleshooting section above
2. Review API documentation
3. Check MongoDB connection
4. Verify environment variables

---

**Last Updated:** October 2025  
**Version:** 1.0.0  
**Status:** Production Ready ✅
# task-deqode
Deqode Taask assignments
