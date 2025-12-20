import UserMenu from './UserMenu'
import styles from '../../styles/Sidebar.module.css'
import { FaPlus, FaMessage, FaXmark } from "react-icons/fa6";

export default function Sidebar({
  chats,
  activeChat,
  setActiveChat,
  onNewChat,
  isOpen,
  onClose
}) {
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
          <div className={styles.historyList}>
            {chats.map(chat => (
              <div
                key={chat._id}
                className={`${styles.chatItem} ${activeChat === chat._id ? styles.active : ""}`}
                onClick={() => setActiveChat(chat._id)}
              >
                <FaMessage className={styles.chatIcon} />
                <span className={styles.chatTitle}>
                  {chat.title || "Untitled Conversation"}
                </span>
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
