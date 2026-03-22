import { useState } from 'react';
import UserMenu from './UserMenu';
import styles from '../../styles/Sidebar.module.css';
import { FaPlus, FaMessage, FaXmark, FaTrash, FaMagnifyingGlass } from "react-icons/fa6";

export default function Sidebar({
  chats,
  activeChat,
  setActiveChat,
  onNewChat,
  onDeleteChat,
  isOpen,
  onClose
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = chats.filter(chat => 
    chat.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.logo}>S</div>
          <div className={styles.brandName}>
            Sarjan <span className={styles.brandAccent}>AI</span>
          </div>

          {/* Close icon (mobile) */}
          <button className={styles.closeBtn} onClick={onClose}>
            <FaXmark />
          </button>
        </div>

        {/* New Chat */}
        <button className={styles.newChat} onClick={onNewChat}>
          <FaPlus className={styles.icon} />
          <span>New Chat</span>
        </button>

        {/* History */}
        <div className={styles.historySection}>
          <div className={styles.sectionTitle}>Recent Chats</div>

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <FaMagnifyingGlass className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search chats..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.historyList}>
            {filteredChats.map(chat => (
              <div
                key={chat._id}
                className={`${styles.chatItem} ${activeChat === chat._id ? styles.active : ""}`}
                onClick={() => setActiveChat(chat._id)}
              >
                <div className={styles.chatInfo}>
                  <FaMessage className={styles.chatIcon} />
                  <span className={styles.chatTitle}>
                    {chat.title || "Untitled Conversation"}
                  </span>
                </div>
                <button 
                  className={styles.deleteBtn}
                  onClick={(e) => onDeleteChat(e, chat._id)}
                  title="Delete Chat"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.userSection}>
          <UserMenu />
        </div>
      </aside>
    </>
  )
}
