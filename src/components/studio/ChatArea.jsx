import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/ChatArea.module.css";
import ReactMarkdown from "react-markdown";
import { io } from "socket.io-client";

export default function ChatArea({ chat, activeChatId, chats, setChats, refreshHistory, setActiveChatId }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [chatMessage, setChatMessage] = useState(null);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const responseTimeoutRef = useRef(null);

  const clearResponseTimeout = () => {
    if (responseTimeoutRef.current) {
      clearTimeout(responseTimeoutRef.current);
      responseTimeoutRef.current = null;
    }
  };

  // 🔹 Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessage, loading]);

  // 🔹 Fetch chat messages
  const fetchChatMessages = async (id) => {
    if (!id) return;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/${id}`;
      console.log("Fetching chat details from:", url);
      const res = await axios.get(
        url,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log("Chat details response:", res.data);
      // Attempt to find messages in common locations if direct path fails, or just log for now to see structure.
      // If the structure is res.data.data, we should adjust.
      // For now, let's just log it.
      setChatMessage(res.data);
    } catch (err) {
      console.error("Failed to fetch chat messages:", err);
    }
  };

  // 🔹 Socket Connection (Persistent)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) return;

    // Connect Once
    console.log("Using token for socket:", user.token?.substring(0, 10) + "...");

    // Remove strict transport forcing to allow polling -> upgrade (more robust)
    const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
      auth: {
        token: user.token
      },
      // transports: ["polling", "websocket"], // Let default happen
      // withCredentials: true,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected successfully. ID:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err);
    });

    // DEBUG: Listen to ALL events
    socket.onAny((event, ...args) => {
      console.log(`🔍 [DEBUG] RAW SOCKET EVENT: "${event}"`, args);
    });

    // Clean up connection on unmount
    return () => {
      console.log("🧹 Cleaning up socket connection...");
      socket.disconnect();
    };
  }, []);

  // 🔹 Handle Active Chat Subscription
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !activeChatId) return;

    const roomId = `chat_${activeChatId}`;
    console.log(`🔗 Joining room: "${roomId}"`);

    // Emit join event - trying common patterns since backend join logic wasn't provided
    // We send both to cover bases if we can't verify backend 'on connection' logic
    socket.emit("join", roomId);
    socket.emit("join_room", roomId);

    // Handler for pipeline steps (streaming stages)
    const handlePipelineStep = (response) => {
      clearResponseTimeout();
      console.log("🌊 Pipeline Step:", response);
      const { step, content } = response;

      setChatMessage((prev) => {
        const isNested = !!prev?.data?.messages;
        const msgList = isNested ? prev.data.messages : (prev?.messages || []);

        const lastMsg = msgList[msgList.length - 1];
        let newMsgList = [...msgList];

        if (lastMsg && (lastMsg.role === "assistant" || lastMsg.role === "ai")) {
          // Append to thoughts array
          const currentThoughts = lastMsg.thoughts || [];

          let stepTitle = step;
          if (step === 'ideas') stepTitle = "Generating Ideas";
          if (step === 'critiques') stepTitle = "Critiquing Content";
          if (step === 'refined_ideas') stepTitle = "Refining Output";
          if (step === 'final_output') stepTitle = "Finalizing";
          if (step === 'image_gen') stepTitle = "Creating Image";

          const newThought = { step: stepTitle, content: content };

          const updatedMsg = {
            ...lastMsg,
            content: "Thinking...",
            thoughts: [...currentThoughts, newThought],
            isThinking: true
          };
          newMsgList[newMsgList.length - 1] = updatedMsg;
        } else {
          newMsgList.push({
            role: "assistant",
            content: "Thinking...",
            thoughts: [{ step: step, content: content }],
            isThinking: true
          });
        }

        return isNested
          ? { ...prev, data: { ...prev.data, messages: newMsgList } }
          : { ...prev, messages: newMsgList };
      });
      setLoading(false);
    };

    // Handler for final response (DB saved)
    const handleResponseReady = (response) => {
      clearResponseTimeout();
      console.log("✅ Response Ready:", response);
      if (response.data && response.data.aiMessage) {
        const aiMessage = response.data.aiMessage;
        setChatMessage((prev) => {
          const isNested = !!prev?.data?.messages;
          const msgList = isNested ? prev.data.messages : (prev?.messages || []);
          let newMsgList = [...msgList];
          const lastMsg = msgList[msgList.length - 1];

          // Replace the last "thinking" message with the final one
          if (lastMsg && (lastMsg.role === "assistant" || lastMsg.role === "ai")) {
            // Remove thoughts, just show final content
            newMsgList[newMsgList.length - 1] = { ...aiMessage, isThinking: false };
          } else {
            newMsgList.push(aiMessage);
          }

          return isNested
            ? { ...prev, data: { ...prev.data, messages: newMsgList } }
            : { ...prev, messages: newMsgList };
        });
      }
      setLoading(false);
    };

    const handleStop = (response) => {
      clearResponseTimeout();
      setLoading(false);
    };

    const handleError = (response) => {
      clearResponseTimeout();
      setLoading(false);
    };

    // Subscribe to events
    socket.on("pipeline_step", handlePipelineStep);
    socket.on("response_ready", handleResponseReady);
    socket.on("generation_stopped", handleStop);
    socket.on("processing_error", handleError);

    return () => {
      console.log(`🔌 Leaving room: "${roomId}"`);
      socket.emit("leave", roomId);
      socket.off("pipeline_step", handlePipelineStep);
      socket.off("response_ready", handleResponseReady);
      socket.off("generation_stopped", handleStop);
      socket.off("processing_error", handleError);
    };
  }, [activeChatId]);

  // 🔹 Trigger fetch when activeChatId changes
  useEffect(() => {
    if (activeChatId) {
      fetchChatMessages(activeChatId);
    } else {
      setChatMessage(null); // Clear for new chat
    }
  }, [activeChatId]);

  // Helper component for thinking process
  const ThinkingBlock = ({ thoughts }) => {
    const [isOpen, setIsOpen] = useState(false);
    const lastThought = thoughts[thoughts.length - 1];
    const displayStep = lastThought ? lastThought.step : "Thinking Process";

    return (
      <div className={styles.thinkingWrapper}>
        <div className={styles.thinkingToggle} onClick={() => setIsOpen(!isOpen)}>
          <span className={`${styles.thinkingChevron} ${isOpen ? styles.open : ''}`}>▶</span>
          <span>{displayStep}...</span>
        </div>
        {isOpen && (
          <div className={styles.thinkingContent}>
            {thoughts.map((t, idx) => (
              <div key={idx} style={{ marginBottom: '8px' }}>
                <strong>{t.step}:</strong>
                <div style={{ marginTop: '4px', whiteSpace: 'pre-wrap' }}>{typeof t.content === 'string' ? t.content : JSON.stringify(t.content)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const sendMessage = async () => {
    if ((!input.trim() && !image)) return;

    setLoading(true);
    const userMsg = { role: "user", content: input, img: image || null };
    const optimisticAiMsg = { role: "assistant", content: "Thinking...", thoughts: [], isThinking: true };

    // Optimistic update
    setChatMessage(prev => {
      const isNested = !!prev?.data?.messages;
      const msgs = isNested ? prev.data.messages : (prev?.messages || []);
      const newMsgs = [...msgs, userMsg, optimisticAiMsg];

      return isNested
        ? { ...prev, data: { ...prev.data, messages: newMsgs } }
        : { ...prev, messages: newMsgs };
    });

    setInput("");
    setImage(null);
    clearResponseTimeout();

    // Start 30s Timeout
    responseTimeoutRef.current = setTimeout(() => {
      console.warn("⏳ Response timeout reached (30s)");
      setLoading(false);
      setChatMessage(prev => {
        const isNested = !!prev?.data?.messages;
        const msgList = isNested ? prev.data.messages : (prev?.messages || []);
        let newMsgList = [...msgList];
        const lastMsg = msgList[msgList.length - 1];

        const errorContent = "Currently our server is busy please try again later";

        if (lastMsg && (lastMsg.role === "assistant" || lastMsg.role === "ai")) {
          newMsgList[newMsgList.length - 1] = { ...lastMsg, content: errorContent, isThinking: false };
        } else {
          newMsgList.push({ role: "assistant", content: errorContent });
        }
        return isNested ? { ...prev, data: { ...prev.data, messages: newMsgList } } : { ...prev, messages: newMsgList };
      });
    }, 30000);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();
      formData.append("prompt", input);
      if (image) formData.append("files", image);
      if (activeChatId) formData.append("conversationId", activeChatId);
      const logicalTitle = input.split(/\s+/).slice(0, 3).join(" ");
      formData.append("title", logicalTitle);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/message`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (refreshHistory) {
        await refreshHistory();
      }

      // If New Chat, update active ID from response to trigger socket subscription
      const newChatId = res.data.conversationId || res.data._id || res.data?.data?._id;
      if (!activeChatId && newChatId) {
        console.log("🆕 New Chat Created, ID:", newChatId);
        setActiveChatId(newChatId);
      }
      // NOTE: We do NOT clear timeout here, we wait for socket response

    } catch (err) {
      console.error("Error sending message:", err);
      setLoading(false);
      clearResponseTimeout();
    }
  };



  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const removeImage = () => setImage(null);

  // Use chatMessage (fetched detailed view) or fallback to chat (prop from history) or empty
  // Handle nested 'data' if the API wraps the response. 
  // Based on user log: { status: "success", data: { messages: [...] } }
  // So we look for chatMessage.data.messages
  const currentMessages = chatMessage?.data?.messages || chatMessage?.messages || chat?.messages || [];

  return (
    <div className={styles.chatArea}>
      <div className={styles.messages}>
        {currentMessages.length === 0 && !loading && (
          <div className={styles.empty}>Start a new creative session ✨</div>
        )}

        {currentMessages.map((msg, i) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={i}
              className={`${styles.message} ${isUser ? styles.user : styles.ai
                }`}
            >
              {msg.img && (
                <div className={styles.msgImgWrapper}>
                  <img
                    src={
                      typeof msg.img === "string"
                        ? msg.img
                        : URL.createObjectURL(msg.img)
                    }
                    alt="uploaded"
                    className={styles.msgImg}
                  />
                </div>
              )}
              {/* Backend uses 'content', frontend optimistic uses 'text' */}
              <div className={styles.markdownContent}>
                {isUser ? (
                  <span>{msg.content || msg.text}</span>
                ) : (
                  <>
                    {/* If it's a thinking (processing) message, show the Dropdown */}
                    {msg.isThinking && msg.thoughts ? (
                      <ThinkingBlock thoughts={msg.thoughts} />
                    ) : (
                      // Otherwise show final markdown
                      <ReactMarkdown>{msg.content || msg.text}</ReactMarkdown>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}

        {/* Removed redundant loading indicator since we have optimistic 'Thinking...' message */}

        <div ref={messagesEndRef} />
      </div>

      {/* Image preview */}
      {image && (
        <div className={styles.imagePreview}>
          <img src={URL.createObjectURL(image)} alt="preview" />
          <button onClick={removeImage}>✕</button>
        </div>
      )}

      <div className={styles.inputBar}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Describe your creative challenge..."
        />
        <label className={styles.uploadBtn}>
          📎
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
