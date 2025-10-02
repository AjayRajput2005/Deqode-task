const Thread = require("../models/thread.model");
const Message = require("../models/message.model");
const Source = require("../models/source.model");
const OpenAI = require("openai");
const axios = require("axios");

// Initialize OpenAI
const AI = new OpenAI({
  apiKey: "AIzaSyCBtO03Gx-wFm2pf6QA6zF26WKObojOOsc",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

// Send Message
exports.sendMessage = async (req, res) => {
  try {
    const { thread_id, content } = req.body;

    await Message.create({ thread_id, role: "user", content });

    // Get conversation history (last 10 messages for context)
    const history = await Message.find({ thread_id })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("role content");

    const conversationHistory = history.reverse();

    const messages = conversationHistory.map(msg => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content
    }));

    const isFinance = checkFinanceQuery(content);
    let assistantContent = "";
    let thinking = "";
    let sources = [];

    if (isFinance) {
      const results = await searchWeb(content);
      sources = await saveSources(thread_id, results);

      const context = results.map((r, i) => 
        `[${i + 1}] ${r.title}: ${r.snippet}`
      ).join("\n");

      thinking = `🔍 Research Steps:
1. Reviewed conversation history (${conversationHistory.length} messages)
2. Searched ${results.length} sources about: "${content}"
3. Analyzing financial data with context
4. Synthesizing insights with citations`;

      // Ask AI with context AND conversation history
      const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash-exp",
        messages: [
          {
            role: "system",
            content: "You are a financial research assistant. Use the conversation history to provide contextual responses. Always cite sources using [1], [2] format."
          },
          ...messages.slice(0, -1), 
          {
            role: "user",
            content: `Based on our previous conversation and these sources:\n${context}\n\nQuestion: ${content}`
          }
        ],
        temperature: 0.7,
      });

      assistantContent = response.choices[0].message.content;
    } else {
  // Normal chat with history
      const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash-exp",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant. Remember the conversation context and provide relevant responses."
          },
          ...messages 
        ],
        temperature: 0.7,
      });

      assistantContent = response.choices[0].message.content;
    }

    // Save AI message
    const aiMessage = await Message.create({
      thread_id,
      role: "assistant",
      content: assistantContent,
      thinking,
      sources: sources.map(s => s._id),
    });

    // Update thread
    await Thread.findByIdAndUpdate(thread_id, {
      last_message_at: new Date(),
      $inc: { message_count: 2 },
    });

    await aiMessage.populate("sources");
    res.json({ success: true, message: aiMessage });
  } catch (error) {
    console.error("AI Error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Check if finance query
function checkFinanceQuery(text) {
  const keywords = ["stock", "bank", "market", "finance", "invest", "trading"];
  return keywords.some(k => text.toLowerCase().includes(k));
}

// Search web
async function searchWeb(query) {
  try {
    const { data } = await axios.post("https://api.tavily.com/search", {
      api_key: process.env.TAVILY_API_KEY,
      query,
      max_results: 3,
    });
    return data.results || [];
  } catch (error) {
    return [];
  }
}

// Save sources
async function saveSources(threadId, results) {
  const sources = [];
  for (const r of results) {
    try {
      const source = await Source.create({
        thread_id: threadId,
        url: r.url,
        title: r.title,
        snippet: r.content || r.snippet || "",
      });
      sources.push(source);
    } catch (err) {
      
    }
  }
  return sources;
}