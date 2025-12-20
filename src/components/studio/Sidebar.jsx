import UserMenu from './UserMenu'
import styles from '../../styles/Sidebar.module.css'

export default function Sidebar({
  chats,
  activeChat,
  setActiveChat,
  onNewChat
}) {
  return (
    <aside className={styles.sidebar}>
      <button className={styles.newChat} onClick={onNewChat}>
        + New Chat
      </button>

      <div className={styles.history}>
        {chats.map(chat => (
          <div
            key={chat._id}
            className={`${styles.chatItem} ${
              activeChat === chat._id ? styles.active : ''
            }`}
            onClick={() => setActiveChat(chat._id)}
          >
            {chat.title}
          </div>
        ))}
      </div>

      <UserMenu />
    </aside>
  )
}
