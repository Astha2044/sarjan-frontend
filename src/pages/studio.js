import { useState, useEffect } from "react";
import Sidebar from "@/components/studio/Sidebar";
import ChatArea from "@/components/studio/ChatArea";
import styles from "../styles/Studio.module.css";
import axios from "axios";

export default function Studio() {
  const [chats, setChats] = useState([]);
  console.log('123: ', chats);
  const [activeChatId, setActiveChatId] = useState(null);
  console.log('activeChatId: ', activeChatId);

  // 🔹 Fetch chat history
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
    console.log("res: ", res);

    setChats(res?.data?.data?.conversations ?? []);
  };

  // 🔹 First time new chat
  const createNewChat = async () => {
    setActiveChatId(null);
  };

  const activeChat = chats?.find((c) => c._id === activeChatId);
  console.log('activeChat: ', activeChat);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchChats();
  }, []);

  return (
    <div className={styles.studio}>
      <Sidebar
        chats={chats}
        activeChat={activeChatId}
        setActiveChat={setActiveChatId}
        onNewChat={createNewChat}
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
