// Export chat to Markdown
export const exportToMarkdown = (thread, messages) => {
  let markdown = `# ${thread.title}\n\n`;
  markdown += `Generated on: ${new Date().toLocaleString()}\n\n`;
  markdown += `---\n\n`;

  messages.forEach((msg, idx) => {
    if (msg.role === 'user') {
      markdown += `## 💬 User\n\n${msg.content}\n\n`;
    } else {
      markdown += `## 🤖 AI Assistant\n\n${msg.content}\n\n`;
      
      // Add thinking if available
      if (msg.thinking) {
        markdown += `### 🧠 Thinking Process\n\n${msg.thinking}\n\n`;
      }
      
      // Add sources if available
      if (msg.sources && msg.sources.length > 0) {
        markdown += `### 📚 Sources\n\n`;
        msg.sources.forEach((source, idx) => {
          markdown += `${idx + 1}. **${source.title}**\n`;
          markdown += `   - URL: ${source.url}\n`;
          if (source.snippet) {
            markdown += `   - Summary: ${source.snippet}\n`;
          }
          markdown += `\n`;
        });
      }
    }
    
    markdown += `---\n\n`;
  });

  return markdown;
};

// Export chat to HTML
export const exportToHTML = (thread, messages) => {
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${thread.title}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 900px;
            margin: 40px auto;
            padding: 20px;
            background: #f9fafb;
            color: #1f2937;
        }
        .header {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            padding: 30px;
            border-radius: 16px;
            margin-bottom: 30px;
        }
        .message {
            background: white;
            padding: 20px;
            margin: 20px 0;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .user { border-left: 4px solid #3b82f6; }
        .assistant { border-left: 4px solid #8b5cf6; }
        .label {
            font-weight: bold;
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .thinking {
            background: #fef3c7;
            padding: 15px;
            border-radius: 8px;
            margin-top: 15px;
            border-left: 3px solid #f59e0b;
        }
        .sources {
            margin-top: 20px;
            padding: 15px;
            background: #eff6ff;
            border-radius: 8px;
        }
        .source {
            margin: 10px 0;
            padding: 10px;
            background: white;
            border-radius: 6px;
        }
        .source a {
            color: #3b82f6;
            text-decoration: none;
        }
        .source a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${thread.title}</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
    </div>
`;

  messages.forEach((msg) => {
    html += `<div class="message ${msg.role}">`;
    html += `<div class="label">${msg.role === 'user' ? '💬 You' : '🤖 AI Assistant'}</div>`;
    html += `<div>${msg.content.replace(/\n/g, '<br>')}</div>`;
    
    if (msg.thinking) {
      html += `<div class="thinking"><strong>🧠 Thinking:</strong><br>${msg.thinking.replace(/\n/g, '<br>')}</div>`;
    }
    
    if (msg.sources && msg.sources.length > 0) {
      html += `<div class="sources"><strong>📚 Sources:</strong>`;
      msg.sources.forEach((source, idx) => {
        html += `<div class="source">
          <strong>${idx + 1}. ${source.title}</strong><br>
          <a href="${source.url}" target="_blank">${source.url}</a><br>
          ${source.snippet ? `<small>${source.snippet}</small>` : ''}
        </div>`;
      });
      html += `</div>`;
    }
    
    html += `</div>`;
  });

  html += `
</body>
</html>`;

  return html;
};

// Export chat to JSON
export const exportToJSON = (thread, messages) => {
  return JSON.stringify({
    title: thread.title,
    exported_at: new Date().toISOString(),
    message_count: messages.length,
    messages: messages.map(msg => ({
      role: msg.role,
      content: msg.content,
      thinking: msg.thinking || null,
      sources: msg.sources || [],
      timestamp: msg.createdAt
    }))
  }, null, 2);
};

// Download file
export const downloadFile = (content, filename, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Main export function
export const exportChat = (thread, messages, format = 'markdown') => {
  const timestamp = new Date().toISOString().split('T')[0];
  const sanitizedTitle = thread.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  
  let content, filename, mimeType;
  
  switch (format) {
    case 'markdown':
      content = exportToMarkdown(thread, messages);
      filename = `${sanitizedTitle}_${timestamp}.md`;
      mimeType = 'text/markdown';
      break;
    case 'html':
      content = exportToHTML(thread, messages);
      filename = `${sanitizedTitle}_${timestamp}.html`;
      mimeType = 'text/html';
      break;
    case 'json':
      content = exportToJSON(thread, messages);
      filename = `${sanitizedTitle}_${timestamp}.json`;
      mimeType = 'application/json';
      break;
    default:
      throw new Error('Invalid format');
  }
  
  downloadFile(content, filename, mimeType);
};