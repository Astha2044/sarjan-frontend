/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/ChatArea.module.css";
import ReactMarkdown from "react-markdown";
import { io } from "socket.io-client";
import {
  FaUser,
  FaRobot,
  FaCode,
  FaPenNib,
  FaLightbulb,
  FaGraduationCap,
  FaRegCopy,
  FaRepeat,
  FaPenToSquare,
} from "react-icons/fa6";
import PricingModal from "./PricingModal";

export default function ChatArea({
  chat,
  activeChatId,
  chats,
  setChats,
  refreshHistory,
  setActiveChatId,
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [chatMessage, setChatMessage] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [imageRestrictedMsg, setImageRestrictedMsg] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const responseTimeoutRef = useRef(null);
  const socketReadyRef = useRef(false);

  const clearResponseTimeout = () => {
    if (responseTimeoutRef.current) {
      clearTimeout(responseTimeoutRef.current);
      responseTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessage, loading]);

  const fetchChatMessages = async (id) => {
    if (!id) return;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/${id}`;
      console.log("Fetching chat details from:", url);
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log("Chat details response:", res.data);
      setChatMessage(res.data);
    } catch (err) {
      console.error("Failed to fetch chat messages:", err);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) return;

    console.log(
      "Using token for socket:",
      user.token?.substring(0, 10) + "...",
    );

    const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
      auth: { token: user.token },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      socketReadyRef.current = true;
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err);
    });

    socket.onAny((event, ...args) => {
      console.log(`🔍 [DEBUG] RAW SOCKET EVENT: "${event}"`, args);
    });

    return () => {
      console.log("🧹 Cleaning up socket connection...");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !activeChatId) return;

    const roomId = `chat_${activeChatId}`;
    console.log(`🔗 Joining room: "${roomId}"`);

    socket.emit("join", roomId);
    socket.emit("join_room", roomId);

    const handlePipelineStep = (response) => {
      clearResponseTimeout();
      console.log("🌊 Pipeline Step:", response);
      const { step, content } = response;

      setChatMessage((prev) => {
        const isNested = !!prev?.data?.messages;
        const msgList = isNested ? prev.data.messages : prev?.messages || [];
        const lastMsg = msgList[msgList.length - 1];
        let newMsgList = [...msgList];

        if (lastMsg && (lastMsg.role === "assistant" || lastMsg.role === "ai")) {
          const currentThoughts = lastMsg.thoughts || [];
          let stepTitle = step;
          const mappings = {
            idea_agent: "Conceptualizing",
            ideas: "Brainstorming Ideas",
            critic_agent: "Evaluating Concepts",
            critiques: "Selecting Best Direction",
            refiner_agent: "Polishing Response",
            refined_ideas: "Finalizing Draft",
            presenter_agent: "Formatting Report",
            final_output: "Delivering",
            image_gen: "Generating Visuals",
          };
          if (mappings[step]) stepTitle = mappings[step];

          const newThought = { step: stepTitle, content: content };
          const updatedMsg = {
            ...lastMsg,
            content: "Thinking...",
            thoughts: [...currentThoughts, newThought],
            isThinking: true,
          };
          newMsgList[newMsgList.length - 1] = updatedMsg;
        } else {
          newMsgList.push({
            role: "assistant",
            content: "Thinking...",
            thoughts: [{ step: step, content: content }],
            isThinking: true,
          });
        }

        return isNested
          ? { ...prev, data: { ...prev.data, messages: newMsgList } }
          : { ...prev, messages: newMsgList };
      });
    };

    const handleResponseReady = (response) => {
      clearResponseTimeout();
      console.log("✅ Response Ready:", response);
      if (response.data && response.data.aiMessage) {
        const aiMessage = response.data.aiMessage;
        setChatMessage((prev) => {
          const isNested = !!prev?.data?.messages;
          const msgList = isNested ? prev.data.messages : prev?.messages || [];
          let newMsgList = [...msgList];
          const lastMsg = msgList[msgList.length - 1];

          if (lastMsg && (lastMsg.role === "assistant" || lastMsg.role === "ai")) {
            newMsgList[newMsgList.length - 1] = {
              ...aiMessage,
              isThinking: false,
            };
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

    const handleStop = () => {
      clearResponseTimeout();
      setLoading(false);
    };

    const handleError = () => {
      clearResponseTimeout();
      setLoading(false);
    };

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

  useEffect(() => {
    if (activeChatId) {
      fetchChatMessages(activeChatId);
    } else {
      setChatMessage(null);
    }
  }, [activeChatId]);

  const ThinkingBlock = ({ thoughts }) => {
    const [isOpen, setIsOpen] = useState(false);
    const lastThought = thoughts[thoughts.length - 1];
    const displayStep = lastThought ? lastThought.step : "Thinking Process";

    return (
      <div className={styles.thinkingWrapper}>
        <div
          className={styles.thinkingToggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`${styles.thinkingChevron} ${isOpen ? styles.open : ""}`}
          >
            ▶
          </span>
          <span>{displayStep}...</span>
        </div>
        {isOpen && (
          <div className={styles.thinkingContent}>
            {thoughts.map((t, idx) => (
              <div key={idx} style={{ marginBottom: "8px" }}>
                <strong>{t.step}:</strong>
                <div style={{ marginTop: "4px", whiteSpace: "pre-wrap" }}>
                  {typeof t.content === "string"
                    ? t.content
                    : JSON.stringify(t.content)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleDownload = async (url) => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `sarjan-ai-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback
      window.open(url, "_blank");
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEditStart = (index, content) => {
    setEditingIndex(index);
    setEditInput(content);
  };

  const handleEditSave = () => {
    if (!editInput.trim()) return;
    setEditingIndex(null);
    sendMessage(editInput);
  };

  const stopGeneration = () => {
    if (!activeChatId || !socketRef.current) return;
    console.log("🛑 Requesting to stop generation for:", activeChatId);
    socketRef.current.emit("stop_generation", { conversationId: activeChatId });
    setLoading(false);
    clearResponseTimeout();
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditInput("");
  };

  const sendMessage = async (textOverride = null) => {
    const textToSend = typeof textOverride === "string" ? textOverride : input;
    if (!textToSend.trim() && !image) return;

    setLoading(true);
    const userMsg = { role: "user", content: textToSend, img: image || null };
    const optimisticAiMsg = {
      role: "assistant",
      content: "Thinking...",
      thoughts: [],
      isThinking: true,
    };

    setChatMessage((prev) => {
      const isNested = !!prev?.data?.messages;
      const msgs = isNested ? prev.data.messages : prev?.messages || [];
      const newMsgs = [...msgs, userMsg, optimisticAiMsg];
      return isNested
        ? { ...prev, data: { ...prev.data, messages: newMsgs } }
        : { ...prev, messages: newMsgs };
    });

    setInput("");
    setImage(null);
    clearResponseTimeout();

    responseTimeoutRef.current = setTimeout(() => {
      console.warn("⏳ Response timeout reached (60s)");
      setLoading(false);
      setChatMessage((prev) => {
        const isNested = !!prev?.data?.messages;
        const msgList = isNested ? prev.data.messages : prev?.messages || [];
        let newMsgList = [...msgList];
        const lastMsg = msgList[msgList.length - 1];
        const errorContent = "Currently our server is busy please try again later";

        if (lastMsg && (lastMsg.role === "assistant" || lastMsg.role === "ai")) {
          newMsgList[newMsgList.length - 1] = {
            ...lastMsg,
            content: errorContent,
            isThinking: false,
          };
        } else {
          newMsgList.push({ role: "assistant", content: errorContent });
        }
        return isNested
          ? { ...prev, data: { ...prev.data, messages: newMsgList } }
          : { ...prev, messages: newMsgList };
      });
    }, 60000); // 60 seconds timeout to allow slow multi-agent pipelines

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();
      formData.append("prompt", textToSend);
      if (image) formData.append("files", image);
      if (activeChatId) formData.append("conversationId", activeChatId);
      const logicalTitle = textToSend.split(/\s+/).slice(0, 3).join(" ");
      formData.append("title", logicalTitle);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/message`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const newChatId =
        res.data?.data?.conversationId || res.data.data?.userMessage?._id;
      if (!activeChatId && newChatId) {
        setActiveChatId(newChatId);
        setTimeout(() => {
          console.log("🔁 Socket ready for new chat:", newChatId);
        }, 0);
      }

      refreshHistory?.();

    } catch (err) {
      console.error("Error sending message:", err);

      if (err.response?.data?.error === "limit_reached") {
        setShowUpgradeBanner(true);
        setLoading(false);
        clearResponseTimeout();
        return;
      }

      if (err.response?.data?.error === "image_restricted") {
        setImageRestrictedMsg(true);
        setLoading(false);
        clearResponseTimeout();
        return;
      }

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

  const handleRetry = () => {
    const reversedMessages = [...currentMessages].reverse();
    const lastUserMessage = reversedMessages.find((m) => m.role === "user");
    if (lastUserMessage && lastUserMessage.content) {
      sendMessage(lastUserMessage.content);
    }
  };

  const currentMessages =
    chatMessage?.data?.messages ||
    chatMessage?.messages ||
    chat?.messages ||
    [];

  useEffect(() => {
    const pending = localStorage.getItem("pending_prompt");
    if (pending) {
      try {
        const parsed = JSON.parse(pending);
        if (parsed?.message) {
          // 🔥 Automatically send the message
          setTimeout(() => {
            sendMessage(parsed.message);
          }, 500);
        }
        localStorage.removeItem("pending_prompt");
      } catch (err) {
        console.error("Invalid pending_prompt data");
        localStorage.removeItem("pending_prompt");
      }
    }
  }, []);

  return (
    <div className={styles.chatArea}>

      {/* ── Upgrade limit banner ── */}
      {showUpgradeBanner && (
        <div className={styles.upgradeBanner}>
          <span>You have reached your 10 message free limit.</span>
          <button onClick={() => setShowPricing(true)}>
            Upgrade to Pro — Free
          </button>
        </div>
      )}

      {/* ── Image restricted banner ── */}
      {imageRestrictedMsg && (
        <div className={styles.imageBanner}>
          <span>🖼️ Image generation is a Pro only feature.</span>
          <button
            type="button"
            onClick={() => {
              setShowPricing(true);
              setImageRestrictedMsg(false);
            }}
          >
            Upgrade to Pro — Free
          </button>
          <button
            type="button"
            className={styles.dismissBtn}
            onClick={() => setImageRestrictedMsg(false)}
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Pricing Modal ── */}
      {showPricing && (
        <PricingModal
          onClose={() => setShowPricing(false)}
          onUpgradeSuccess={() => {
            setShowUpgradeBanner(false);
            setImageRestrictedMsg(false);
            setShowPricing(false);
          }}
        />
      )}

      <div className={styles.messages}>
        {currentMessages.length === 0 && !loading && (
          <div className={styles.emptyStateContainer}>
            <h2 className={styles.emptyTitle}>Unlock Your Creativity</h2>
            <p className={styles.emptySubtitle}>
              Sarjan AI is ready to assist. Choose a starter prompt below or
              type your own idea to begin.
            </p>
            <div className={styles.quickPromptsGrid}>
              <div
                className={styles.promptCard}
                onClick={() =>
                  setInput("Write a creative blog post about AI trends")
                }
              >
                <FaPenNib className={styles.promptIcon} />
                <div className={styles.promptTitle}>Draft Content</div>
                <div className={styles.promptDesc}>
                  Write creative blog posts or articles
                </div>
              </div>
              <div
                className={styles.promptCard}
                onClick={() =>
                  setInput("Explain how Neural Networks work in simple terms")
                }
              >
                <FaGraduationCap className={styles.promptIcon} />
                <div className={styles.promptTitle}>Learn a Concept</div>
                <div className={styles.promptDesc}>
                  Explain complex topics simply
                </div>
              </div>
              <div
                className={styles.promptCard}
                onClick={() => setInput("Debug this React useEffect code: ")}
              >
                <FaCode className={styles.promptIcon} />
                <div className={styles.promptTitle}>Debug Code</div>
                <div className={styles.promptDesc}>
                  Fix errors and optimize scripts
                </div>
              </div>
              <div
                className={styles.promptCard}
                onClick={() =>
                  setInput("Brainstorm 5 marketing ideas for a coffee shop")
                }
              >
                <FaLightbulb className={styles.promptIcon} />
                <div className={styles.promptTitle}>Brainstorming</div>
                <div className={styles.promptDesc}>
                  Generate unique ideas instantly
                </div>
              </div>
            </div>
          </div>
        )}

        {currentMessages.map((msg, i) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={i}
              className={`${styles.messageWrapper} ${
                isUser ? styles.userWrapper : styles.aiWrapper
              }`}
            >
              <div
                className={`${styles.avatar} ${
                  isUser ? styles.userAvatar : styles.aiAvatar
                }`}
              >
                {isUser ? <FaUser /> : <FaRobot />}
              </div>

              <div
                className={`${styles.messageBubble} ${
                  isUser ? styles.userBubble : styles.aiBubble
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

                <div className={styles.markdownContent}>
                  {isUser ? (
                    <>
                      {editingIndex === i ? (
                        <div className={styles.editContainer}>
                          <textarea
                            className={styles.editTextarea}
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                          />
                          <div className={styles.editActions}>
                            <button
                              type="button"
                              className={styles.editCancelBtn}
                              onClick={handleEditCancel}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className={styles.editSaveBtn}
                              onClick={handleEditSave}
                            >
                              Save & Send
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <span>{msg.content || msg.text}</span>
                          <div className={styles.messageActions}>
                            <button
                              className={styles.actionBtn}
                              onClick={() =>
                                copyToClipboard(msg.content || msg.text)
                              }
                              title="Copy message"
                            >
                              <FaRegCopy />
                            </button>
                            <button
                              className={styles.actionBtn}
                              onClick={() =>
                                handleEditStart(i, msg.content || msg.text)
                              }
                              title="Edit message"
                            >
                              <FaPenToSquare />
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {msg.isThinking && msg.thoughts ? (
                        <ThinkingBlock thoughts={msg.thoughts} />
                      ) : msg.imageUrl ? (
                        <div className={styles.generatedImgWrapper}>
                          <img
                            src={msg.imageUrl}
                            alt="Generated"
                            className={styles.generatedImg}
                          />
                          <button
                            onClick={() => handleDownload(msg.imageUrl)}
                            className={styles.downloadBtn}
                          >
                            ⬇ Download
                          </button>
                        </div>
                      ) : (
                        <ReactMarkdown
                          components={{
                            img: ({ node, ...props }) => (
                              <div className={styles.generatedImgWrapper}>
                                <img
                                  {...props}
                                  alt={props.alt || "Generated Output"}
                                  className={styles.generatedImg}
                                />
                                <button
                                  onClick={() => handleDownload(props.src)}
                                  className={styles.downloadBtn}
                                >
                                  ⬇ Download
                                </button>
                              </div>
                            ),
                          }}
                        >
                          {/* 🔥 User wants "image only". If msg contains image, we filter text */}
                          {(() => {
                            const content = msg.content || msg.text || "";
                            const hasImage = content.includes("![");
                            if (hasImage) {
                              // Extract only the first image markdown
                              const match = content.match(/!\[.*?\]\(.*?\)/);
                              if (match) return match[0];
                            }
                            return content;
                          })()}
                        </ReactMarkdown>
                      )}
                      {!msg.isThinking && (
                        <div className={styles.messageActions}>
                          <button
                            className={styles.actionBtn}
                            onClick={() =>
                              copyToClipboard(msg.content || msg.text)
                            }
                            title="Copy to clipboard"
                          >
                            <FaRegCopy />
                          </button>
                          {i === currentMessages.length - 1 && (
                            <button
                              className={styles.actionBtn}
                              onClick={handleRetry}
                              title="Regenerate response"
                              disabled={loading}
                            >
                              <FaRepeat />
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

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
        {loading ? (
          <button onClick={stopGeneration} className={styles.stopBtn}>
            Stop
          </button>
        ) : (
          <button onClick={sendMessage} disabled={loading}>
            Send
          </button>
        )}
      </div>
    </div>
  );
}