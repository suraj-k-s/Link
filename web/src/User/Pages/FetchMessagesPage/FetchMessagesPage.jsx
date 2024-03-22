import React, { useEffect, useState } from "react";
import { Typography, CircularProgress } from "@mui/material";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/Firebase";
import "./message.css";

const FetchMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async (userId) => {
    try {
      setLoading(true);
      const messagesRef = collection(db, "collection_police_user_message");
      const q = query(messagesRef, where("sent_to", "==", userId));
      const querySnapshot = await getDocs(q);
      const messageData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageData);
      // Automatically mark messages as read
      messageData.forEach((message) => {
        if (message.status === 0) {
          markAsRead(message.id);
        }
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("uid");
    if (userId) {
      fetchMessages(userId);
    }
  }, []);

  const markAsRead = async (messageId) => {
    try {
      const messageRef = doc(db, "collection_police_user_message", messageId);
      await updateDoc(messageRef, {
        status: 1,
      });
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  return (
    <div className="FetchMessagesPage" style={{ padding: "10px 220px" }}>
      <div className="heading">
        <Typography variant="h3">Notification</Typography>
      </div>
      <div className="messages">
        {loading && <CircularProgress />}
        {!loading && messages.length === 0 && (
          <Typography variant="body1">No messages found</Typography>
        )}
        {!loading &&
          messages.length > 0 &&
          messages.map((message) => (
            <div key={message.id} className="message">
              <Typography variant="body1">{message.message}</Typography>
              <br />
              <Typography variant="caption">
                Sent by: {message.sent_by} at :{new Date(message.sent_at.seconds * 1000).toLocaleString()}
              </Typography>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FetchMessagesPage;
