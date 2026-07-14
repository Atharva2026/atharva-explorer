import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, Bell, Phone, Video, Smile } from 'lucide-react';
import { motion } from 'framer-motion';
import { XPWindow } from '@/components/xp/XPWindow';
import { playErrorDing } from '@/lib/audioEngine';

interface MsnMessengerWindowProps {
  onClose: () => void;
  onMinimize: () => void;
  isActive?: boolean;
}

interface Message {
  sender: 'Atharva (Bot)' | 'You';
  text: string;
  time: string;
}

export function MsnMessengerWindow({ onClose, onMinimize, isActive }: MsnMessengerWindowProps) {
  // Read key securely from Vite environment variables
  const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
  const hasGroqKey = apiKey.trim() !== '' && apiKey !== 'your_groq_api_key_here';

  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: 'Atharva (Bot)', 
      text: hasGroqKey
        ? 'Hello! I am Atharva\'s MSN Resume Assistant. Ask me anything about Atharva\'s resume, skills, or projects. I am powered by live AI!'
        : 'Hello! I am Atharva\'s MSN Resume Assistant. Ask me anything about Atharva\'s projects, skills, education, work experience, or contact information!', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getSystemTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // System Prompt with resume facts to feed the Groq LLM
  const getSystemPrompt = () => `You are Atharva Shah's AI Portfolio Assistant, chatting inside a nostalgic MSN Messenger window.
Use the following resume details to answer visitor questions. Be friendly, accurate, and concise.

DEVELOPER SUMMARY:
AI Engineer and Full-Stack Developer specializing in Agentic AI, Multi-Agent Systems, and LLM-powered applications. Experienced in LangGraph workflows, RAG pipelines, and hybrid local/cloud AI systems.

WORK EXPERIENCE:
Technical Head – Ethicraft (2024 – Present)
• Led a 4–6 developer team building the official Next.js + TypeScript club portal with Supabase Auth/DB.
• Shipped 6+ features (auth, payments, admin dashboard, event management) serving 300+ active users.

PROJECTS:
1. Globe Express (Live Demo: https://globe-express.onrender.com/, Code: https://github.com/Atharva2026/Trip-mate)
- Multi-Agent Travel Orchestration Engine built on LangGraph & FastAPI.
- Stateful agent trip-planning coordinate flight, weather, and itinerary generation.
- Enforced structured LLM validation using Pydantic schemas.
2. Nivana (Live Demo: https://nivana-azure.vercel.app/, Code: https://github.com/SarangRao20/techfiesta_mentalhealth)
- Privacy-First AI Mental Health Platform with vector retrieval (FAISS).
- Combines local Ollama (Llama 3) and Gemini 1.5 Pro.
- Async Flask + Celery processing pipelines.
3. LinkedIn Post Generator (Live Demo: https://linkedingenaipostgenerator-n9zkj2o8riskrjx26edfan.streamlit.app/, Code: https://github.com/Atharva2026/LinkedIN_GENAI_PostGenerator)
- GenAI content generator built on Streamlit, LangChain, and Groq.
- Uses Tavily live search RAG layer keeping generated content relevant.
4. Ethicraft Club Website (Live Demo: https://ethicraft.vercel.app, Code: https://github.com/Atharva2026/website-)
- Next.js & Supabase full-stack platform serving 300+ students.

EDUCATION:
- B.Tech in Electronics & Telecommunication, Pune Institute of Computer Technology (SPPU) (2024 – 2028).
- Cumulative GPA: 8.9

TECHNICAL SKILLS:
- AI/GenAI: LangGraph, LangChain, RAG, FAISS, Multi-Agent, LLMs, Vector Databases, Prompt Engineering.
- Backend: FastAPI, Flask, Celery, Node.js, Express.js.
- Frontend: React.js, Next.js, TypeScript, React Native, Tailwind CSS.
- Databases: PostgreSQL, MongoDB, MySQL, Supabase, Firebase.
- Languages: Python, C++, Java, JavaScript, TypeScript.
- Tools: Git/GitHub, Vercel, Docker, Razorpay, Streamlit.

CONTACT CHANNELS:
- Email: shahatharva20@gmail.com
- Phone: +91 9021435346
- GitHub: github.com/Atharva2026
- LinkedIn: linkedin.com/in/atharva-shah-915a86324/

Answer questions in a helpful, retro-styled chat style. Keep replies concise and matching MSN messenger message lengths. Do not hallucinate details outside these guidelines.`;

  // Local Match Q&A Fallback Rules
  const getLocalBotReply = (userMsg: string): string => {
    const query = userMsg.toLowerCase().trim();

    if (query.includes('project') || query.includes('portfolio') || query.includes('build')) {
      return (
        "Here are Atharva Shah's key projects:\n\n" +
        "1. Globe Express: Stateful multi-agent travel orchestration engine in LangGraph & FastAPI.\n" +
        "2. Nivana: Privacy-first AI Mental Health platform with hybrid local/cloud Ollama & Gemini RAG.\n" +
        "3. LinkedIn Post Generator: Streamlit GenAI RAG tool using Tavily live search.\n" +
        "4. Ethicraft Club Website: Next.js + TypeScript full-stack platform serving 300+ students.\n\n" +
        "Type the name of any project (e.g. 'Globe Express') for more details, or click 'My Projects' on the desktop!"
      );
    }

    if (query.includes('globe express') || query.includes('trip-mate') || query.includes('travel')) {
      return (
        "Globe Express - Multi-Agent Travel Orchestration Engine:\n" +
        "- Engineered stateful multi-agent system in LangGraph with flight search, weather, and itinerary generation.\n" +
        "- Handled async requests with FastAPI & PostgreSQL, exporting PDF itineraries.\n" +
        "- Enforced structured LLM validation using Pydantic schema schemas."
      );
    }

    if (query.includes('nivana') || query.includes('mental health') || query.includes('therapy')) {
      return (
        "Nivana - Privacy-First AI Mental Health Platform:\n" +
        "- Hybrid local/cloud LLM with vector retrieval (FAISS), combining local Ollama (Llama 3) and Gemini 1.5 Pro.\n" +
        "- Built async Flask + Celery mood analysis processing pipelines.\n" +
        "- Designed interactive SPA for real-time mood visualization."
      );
    }

    if (query.includes('linkedin') && (query.includes('generator') || query.includes('post') || query.includes('genai'))) {
      return (
        "LinkedIn Post Generator - GenAI Content Tool:\n" +
        "- Generates posts using Python, Streamlit, LangChain, and Groq.\n" +
        "- Integrated Tavily live search RAG layer for keeping context current.\n" +
        "- Implemented few-shot prompting driving high quality post variations."
      );
    }

    if (query.includes('ethicraft') || query.includes('club') || query.includes('website')) {
      return (
        "Ethicraft Club Website - College Management Platform:\n" +
        "- Built Next.js + TypeScript, Supabase Auth/DB platform serving 300+ active users.\n" +
        "- Shipped dashboards, Razorpay payments, and online assessment portals."
      );
    }

    if (query.includes('skill') || query.includes('tech') || query.includes('code') || query.includes('language')) {
      return (
        "Atharva's Technical Skills:\n\n" +
        "🤖 AI/GenAI: LangGraph, LangChain, RAG, FAISS, Multi-Agent Systems, LLMs (Llama 3/3.1, Gemini), Prompt Engineering, Vector Databases\n" +
        "🌐 Backend: FastAPI, Flask, Celery, Node.js, Express.js, REST API Design\n" +
        "🎨 Frontend: React.js, Next.js, TypeScript, React Native, Tailwind CSS\n" +
        "💾 Databases: PostgreSQL, MongoDB, MySQL, Supabase, Firebase\n" +
        "🛠️ Tools: Git/GitHub, Vercel, Docker, Razorpay, Streamlit"
      );
    }

    if (query.includes('experience') || query.includes('work') || query.includes('job') || query.includes('career')) {
      return (
        "Atharva's Work Experience:\n\n" +
        "Technical Head – Ethicraft (2024 – Present):\n" +
        "- Led a 4–6 developer team building the official Next.js + TypeScript club portal.\n" +
        "- Directed technical decisions for 6+ shipped features (payments, dashboards, event portals) for 300+ active student users."
      );
    }

    if (query.includes('education') || query.includes('gpa') || query.includes('college') || query.includes('study') || query.includes('sppu') || query.includes('pict')) {
      return (
        "Atharva's Education:\n\n" +
        "- B.Tech in Electronics & Telecommunication (2024 – 2028)\n" +
        "- Pune Institute of Computer Technology (SPPU)\n" +
        "- Current Cumulative GPA: 8.9"
      );
    }

    if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('reach') || query.includes('hire')) {
      return (
        "You can contact Atharva Shah directly through these channels:\n\n" +
        "📧 Email: shahatharva20@gmail.com\n" +
        "📞 Phone: +91 9021435346\n" +
        "🐙 GitHub: github.com/Atharva2026\n" +
        "🔗 LinkedIn: linkedin.com/in/atharva-shah-915a86324/"
      );
    }

    if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('greetings')) {
      return "Hi there! Nice to meet you. Ask me about Atharva's skills, projects, work experience, or contact information!";
    }

    return (
      "I am not sure I understand that. You can ask me questions like:\n" +
      "- 'Tell me about your projects'\n" +
      "- 'What skills do you have?'\n" +
      "- 'Where did you study?'\n" +
      "- 'Show me your experience'\n" +
      "- 'How can I contact you?'"
    );
  };

  // call Groq LLM completions API
  const fetchGroqReply = async (userMsg: string): Promise<string> => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            { role: 'system', content: getSystemPrompt() },
            { role: 'user', content: userMsg }
          ],
          temperature: 0.3,
          max_tokens: 250
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const json = await response.json();
      return json.choices[0]?.message?.content || 'No reply generated.';
    } catch (err) {
      console.error(err);
      return '⚠️ Error connecting to Groq LLM. Standard local mode fallback active. Ask me about projects, skills, education, or experience!';
    }
  };

  const handleSend = async () => {
    if (!inputVal.trim()) return;
    
    const userMsg = inputVal.trim();
    setMessages((prev) => [...prev, { sender: 'You', text: userMsg, time: getSystemTime() }]);
    setInputVal('');
    
    setIsTyping(true);

    if (hasGroqKey) {
      // Live LLM mode
      const reply = await fetchGroqReply(userMsg);
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'Atharva (Bot)', text: reply, time: getSystemTime() }]);
    } else {
      // Free Local Q&A Fallback mode
      setTimeout(() => {
        setIsTyping(false);
        const reply = getLocalBotReply(userMsg);
        setMessages((prev) => [...prev, { sender: 'Atharva (Bot)', text: reply, time: getSystemTime() }]);
      }, 1000);
    }
  };

  const handleNudge = () => {
    playErrorDing();
    setShakeCount((prev) => prev + 1);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <XPWindow
      title="MSN Messenger - Atharva (Bot)"
      onClose={onClose}
      onMinimize={onMinimize}
      isActive={isActive}
      icon={<MessageSquare className="w-4 h-4 text-cyan-600" />}
      className="w-full max-w-lg"
      defaultPosition={{ x: 140, y: 50 }}
    >
      <div
        style={{ transform: shakeCount > 0 ? 'translate(0px, 0px)' : 'none' }}
        className="flex flex-col h-[400px] bg-[#dbe8f5] text-foreground font-sans text-xs relative"
      >
        <motion.div
          animate={shakeCount > 0 ? {
            x: [0, -10, 10, -10, 10, -5, 5, 0],
            y: [0, 5, -5, 5, -5, 2, -2, 0]
          } : {}}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => setShakeCount(0)}
          className="flex-1 flex flex-col min-h-0"
        >
          {/* MSN Top Status Bar */}
          <div className="bg-[#eff5fb] p-2 border-b border-blue-200 flex justify-between items-center select-none flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-green-500 rounded-full border border-teal-600 flex items-center justify-center text-white text-lg font-bold">
                {hasGroqKey ? '🧠' : '🤖'}
              </div>
              <div>
                <span className="font-bold text-gray-800 block text-sm">Atharva (Resume Bot)</span>
                <span className="text-[10px] text-green-700 block">
                  {hasGroqKey ? '"Live Groq AI Active"' : '"Local Standard Mode"'} &lt;Online&gt;
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="p-1 hover:bg-blue-100 rounded text-gray-500" title="Audio Call"><Phone className="w-4 h-4" /></button>
              <button className="p-1 hover:bg-blue-100 rounded text-gray-500" title="Video Call"><Video className="w-4 h-4" /></button>
              <button 
                onClick={handleNudge} 
                className="px-2 py-0.5 bg-yellow-400 hover:bg-yellow-500 text-black rounded border border-yellow-600 font-bold flex items-center gap-1 shadow-sm"
                title="Send Nudge"
              >
                <Bell className="w-3 h-3 animate-bounce" />
                Nudge
              </button>
            </div>
          </div>

          {/* Chat Logs */}
          <div className="flex-1 bg-white m-2 p-2 rounded border border-blue-200 overflow-y-auto space-y-2">
            <div className="text-center text-[10px] text-gray-400 select-none pb-1 border-b border-gray-100">
              Interactive MSN Resume Bot Session
            </div>
            
            {messages.map((msg, index) => (
              <div key={index} className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${msg.sender.includes('Bot') ? 'text-blue-700' : 'text-green-700'}`}>
                    {msg.sender} says:
                  </span>
                  <span className="text-[9px] text-gray-400">{msg.time}</span>
                </div>
                <p className="text-gray-800 bg-[#f7f9fc] p-1.5 rounded border border-gray-100 whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </p>
              </div>
            ))}
            
            {isTyping && (
              <div className="text-gray-400 italic text-[10px] animate-pulse">
                Atharva (Bot) is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-2 border-t border-blue-200 bg-[#eff5fb] flex gap-2 items-center flex-shrink-0">
            <button className="text-gray-500 hover:text-gray-700"><Smile className="w-4 h-4" /></button>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask about projects, skills, education..."
              className="flex-1 px-2 py-1.5 rounded border border-blue-300 bg-white focus:outline-none focus:border-blue-500 text-xs text-black"
            />
            <button
              onClick={handleSend}
              className="px-3 py-1.5 bg-[#4c84c4] hover:bg-[#3668a0] text-white font-bold rounded border border-[#2d527a] flex items-center gap-1 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </button>
          </div>
        </motion.div>
      </div>
    </XPWindow>
  );
}
