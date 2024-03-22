    import React, { useEffect, useState } from "react";
    import {
      TextField,
      Typography,
      CircularProgress,
      Button,
    } from "@mui/material";
    import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
    import { db } from "../../../config/Firebase";
    import SendIcon from '@mui/icons-material/Send';

    const MessageUserPage = () => {
      const [userId, setUserId] = useState("");
      const [userDetails, setUserDetails] = useState([]);
      const [loading, setLoading] = useState(false);

      const [showMessageInput, setShowMessageInput] = useState(false);
      const [message, setMessage] = useState("");

      const fetchUserDetails = async (id) => {
        try {
          setLoading(true);
          const userDocRef = collection(db, "collection_user");
          const uquery = query(userDocRef, where("user_Id", "==", id));
          const userDocSnapshot = await getDocs(uquery);

          const userDetail = userDocSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUserDetails(userDetail);
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        if (userId.length === 10) {
          fetchUserDetails(userId);
        }
      }, [userId]);

      const handleUserIdChange = (e) => {
        setShowMessageInput(false); // Hide message input when searching for a new user
        setMessage(""); 
        setUserId(e.target.value);
      };

      const handleNotifyClick = (id) => {
        setUserId(id);
        setShowMessageInput(true);
      };

      const handleSubmitMessage = async () => {
        // Check if the message is not empty
        if (!message.trim()) {
          alert("Please enter a message before sending.");
          return;
        }
      
        // Add your message sending logic here
        console.log("Sending message:", message);
        const sendMessage = collection(db, "collection_police_user_message");
        const messageData = {
          message: message,
          sent_by: sessionStorage.getItem("pid"),
          sent_to: userId,
          status: 0,
          sent_at: serverTimestamp(),
        };
        await addDoc(sendMessage, messageData);
        console.log("Message sent!");
        alert("Message sent!");
      
        window.location.reload();
      
        setMessage("");
        setShowMessageInput(false);
        setUserId("");
      };
      
      return (
        <div className="MessageUserPage" style={{ padding: "10px 220px" }}>
          <div className="heading">
            <Typography variant="h3">Notify User</Typography>
          </div>
          <div className="search">
            <TextField
              label="User ID"
              variant="outlined"
              type="number"
              value={userId}
              onChange={handleUserIdChange}
            />
          </div>
          <div className="hr"></div>
          <div className="detail">
            {loading && <CircularProgress />}
            {!loading && userDetails.length === 0 && (
              <Typography variant="body1">User Details</Typography>
            )}
            {!loading &&
              userDetails.length > 0 &&
              userDetails.map((user) => (
                <div className="card" key={user.id}>
                  <div className="user">
                    <div className="image">
                      {user.user_photo && (
                        <img src={user.user_photo} alt="error loading profile" />
                      )}
                      {!user.user_photo && <div>No photo available</div>}
                    </div>
                    <div className="details">
                      <Typography variant="h5">{user.user_name}</Typography>
                      <Typography variant="h6">{user.user_dob}</Typography>
                      <Typography variant="h6">{user.user_address}</Typography>
                      <Typography variant="h6">{user.user_mobile}</Typography>
                      <Typography variant="h6">{user.user_email}</Typography>
                      <Typography variant="h6">{user.user_gender}</Typography>
                      <div className="fine_btn">
                        <Button
                          variant="contained"
                          
                          onClick={() => handleNotifyClick(user.id)}
                        >
                          Notify
                        </Button>
                      </div>
                      {showMessageInput && (
                        <div className="fields">
                          <TextField
                            fullWidth
                            label="Message"
                            required
                            multiline
              rows={4}
                            variant="outlined"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                          <div className="fine_btn"></div>
                          <Button
                            variant="contained"
                            className="fine_btn"
                            color="primary"
                            endIcon={<SendIcon />}
                            onClick={handleSubmitMessage}
                          >
                            Send  
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
    };

    export default MessageUserPage;
