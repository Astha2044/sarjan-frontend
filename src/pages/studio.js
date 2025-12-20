import { useState, useEffect } from "react";
import Sidebar from "@/components/studio/Sidebar";
import ChatArea from "@/components/studio/ChatArea";
import styles from "../styles/Studio.module.css";
import axios from "axios";
import { FaBars } from "react-icons/fa";

export default function Studio() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchChats = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/chat/history`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setChats(res?.data?.data?.conversations ?? []);
  };

  const createNewChat = () => {
    setActiveChatId(null);
    setSidebarOpen(false); // ✅ close sidebar on mobile
  };

  const handleChatSelect = (id) => {
    setActiveChatId(id);
    setSidebarOpen(false); // ✅ close sidebar on mobile
  };

  const activeChat = chats.find((c) => c._id === activeChatId);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchChats();
  }, []);

  return (
    <div className={styles.studio}>
      {/* Mobile Hamburger */}
      {!sidebarOpen && (
        <button
          className={styles.hamburger}
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
      )}

      <Sidebar
        chats={chats}
        activeChat={activeChatId}
        setActiveChat={handleChatSelect}
        onNewChat={createNewChat}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <ChatArea
        chat={activeChat}
        activeChatId={activeChatId}
        setChats={setChats}
        chats={chats}
        refreshHistory={fetchChats}
        setActiveChatId={setActiveChatId}
      />
    </div>
  );
}
