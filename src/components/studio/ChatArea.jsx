import { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/ChatArea.module.css";

export default function ChatArea({ chat, activeChatId, chats, setChats }) {
  console.log("chats: ", chats);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [chatMessage, setChatMessage] = useState(null);
  console.log('chatMessage: ', chatMessage);
  const messagesEndRef = useRef(null);

  // 🔹 Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, chats, loading]);

  // 🔹 Fetch chat messages when activeChatId changes
  useEffect(() => {
    if (!activeChatId) return;

    const fetchChatMessages = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/${activeChatId}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        // Update messages for this chat
        setChatMessage(res.data);
      } catch (err) {
        console.error("Failed to fetch chat messages:", err);
      }
    };

    fetchChatMessages();
  }, [activeChatId]);

  const sendMessage = async () => {
    if (!chat || (!input.trim() && !image)) return;

    const userMsg = { role: "user", text: input, img: image || null };
    setChats((prev) =>
      prev.map((c) =>
        c._id === activeChatId
          ? { ...c, messages: [...c.messages, userMsg] }
          : c
      )
    );

    setInput("");
    setImage(null);
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();
      formData.append("prompt", input);
      if (image) formData.append("files", image);
      if (activeChatId) formData.append("conversationId", activeChatId);
      formData.append("title", input);

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

      const aiMsg = {
        role: "ai",
        text: res.data.text || "No response",
        img: res.data.file || null,
      };

      // Update chat with AI message
      setChats((prev) =>
        prev.map((c) =>
          c._id === activeChatId
            ? { ...c, messages: [...c.messages, aiMsg] }
            : c
        )
      );

      // If it was a new chat, set the conversation ID
      if (!activeChatId && res.data.conversationId) {
        setChats((prev) =>
          prev.map((c) =>
            c === chat ? { ...c, _id: res.data.conversationId } : c
          )
        );
      }
    } catch (err) {
      console.error("Error sending message:", err);
      const errorMsg = {
        role: "ai",
        text: "Failed to get response. Try again.",
        img: null,
      };
      setChats((prev) =>
        prev.map((c) =>
          c._id === activeChatId
            ? { ...c, messages: [...c.messages, errorMsg] }
            : c
        )
      );
    } finally {
      setLoading(false);
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
    if (file) setImage(file); // keep file for API upload
  };

  const removeImage = () => setImage(null);

  if (!chat)
    return <div className={styles.empty}>Start a new creative session ✨</div>;

  return (
    <div className={styles.chatArea}>
      <div className={styles.messages}>
        {chat?.messages?.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${
              msg.role === "user" ? styles.user : styles.ai
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
            {msg.text && <span>{msg.text}</span>}
          </div>
        ))}

        {loading && (
          <div className={`${styles.message} ${styles.ai}`}>
            <span className={styles.typing}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        )}

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
