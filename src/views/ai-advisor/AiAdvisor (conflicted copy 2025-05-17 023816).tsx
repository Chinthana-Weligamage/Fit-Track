import { SetStateAction, useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/ask";

const initialMessages = [
  {
    id: Date.now(),
    text: "Hello! I am Fit-Track AI Fitness Advisor. How can I assist you today?",
    sender: "ai",
    ttres: 0,
  },
];

const AiAdvisor = () => {
  const [chat, setChat] = useState([...initialMessages]);
  const [waiting, setWaiting] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    if (userMessage.length > 300) {
      alert("Message is too long");
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: userMessage,
      sender: "user",
      ttres: 0,
    };

    setChat((prev) => [...prev, newMessage]);
    setUserMessage("");
    setWaiting(true);
    scrollToBottom();

    await askFromAi(userMessage);
  };

  const askFromAi = async (question: string) => {
    try {
      const response = await axios.post(API_URL, { question });
      const { answer, time_taken } = response.data;

      const aiMessageId = Date.now();

      // Append placeholder message
      setChat((prev) => [
        ...prev,
        {
          id: aiMessageId,
          text: "",
          sender: "ai",
          ttres: time_taken,
        },
      ]);

      let index = 0;
      const delay = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

      typingIntervalRef.current = setInterval(() => {
        index++;
        setChat((prevChat) =>
          prevChat.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  text: answer.slice(0, index),
                }
              : msg
          )
        );

        if (index >= answer.length && typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
          setWaiting(false);
          scrollToBottom();
        }
      }, delay);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setWaiting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className="flex flex-col w-full max-w-2xl h-[80vh] mx-auto my-10 border border-zinc-600 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-amber-300 text-center py-4 border-b">
        <p className="text-lg font-semibold text-black">
          Fit-Track AI Fitness Advisor
        </p>
      </div>

      {/* Messages */}
      <div
        ref={chatBoxRef}
        id="chatbox"
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900"
      >
        {chat.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-amber-300 text-black rounded-br-none"
                  : "bg-zinc-300 text-black rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {waiting && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg max-w-xs bg-zinc-300 text-black rounded-bl-none italic">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center p-4 border-t bg-zinc-700">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-full mr-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
          placeholder="Type your message..."
          value={userMessage}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={waiting}
        />
        <button
          onClick={handleSendMessage}
          className="bg-amber-300 text-black px-4 py-2 pr-5 rounded-full hover:bg-amber-400 disabled:opacity-50"
          disabled={waiting}
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default AiAdvisor;
