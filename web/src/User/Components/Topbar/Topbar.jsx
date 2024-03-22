  import React, { useEffect, useState } from "react";
  import "./Topbar.css";
  import { Link, useNavigate } from "react-router-dom";
  import { Typography } from "@mui/material";
  import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
  import { db } from "../../../config/Firebase";

  const Topbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [userPhoto, setUserPhoto] = useState(null);
    const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

    useEffect(() => {
      userData();
      fetchUnreadMessagesCount();
    }, []);
    const fetchUnreadMessagesCount = async () => {
      try {
        const userId = sessionStorage.getItem("uid");
        if (!userId) {
          // If userId is null or undefined, exit the function early
          return;
        }

        const messagesRef = collection(db, "collection_police_user_message");
        const q = query(messagesRef, where("sent_to", "==", userId), where("status", "==", 0));
        const querySnapshot = await getDocs(q);
        // Set the count of unread messages
        setUnreadMessagesCount(querySnapshot.size);
        console.log("Unread messages count:", querySnapshot.size);
      } catch (error) {
        console.error("Error fetching unread messages count:", error);
      }
    };

    

    const userData = async () => {
      try {
        const userId = sessionStorage.getItem("uid");
        if (!userId) {
          // If userId is null or undefined, navigate to the login page
          navigate("../../Login");
          return; // Exit the function early
        }

        const docRef = doc(db, "collection_user", userId);
        const docSnapUser = await getDoc(docRef);
        const userData = {
          ...docSnapUser.data(),
          id: docSnapUser.id,
        };
        setUser(userData);
        setUserPhoto(userData.user_photo); // Set the user_photo
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const handleLogout = () => {
      // Clear sessionId
      sessionStorage.removeItem("uid");
      navigate("../../Login");
    };

    return (
      <div className="Topbar">
        <div className="container">
          <div className="items">
            <div className="logo">
            <Typography variant="h3" sx={{fontWeight:"900"}}>Link</Typography>

            </div>
            <div className="mid">
              <div className="containerBottom"></div>
            </div>
            <nav>
              {/* <div className="nav">
                <Link to="./MyCasesPage">My Cases</Link>
              </div> */}
              {/* <div className="nav">
                <Link to="./PolicePage">POLICE</Link>
              </div> */}
              {/* <div className="nav">
                <Link to="">LAWYER</Link>
              </div> */}
              <div className="nav">
                <Link to="/user">Home</Link>
              </div>
              <div className="messge">
              <Link to="./FetchMessagesPage ">Notification  {}</Link>
              {unreadMessagesCount > 0 && <div className="count">{unreadMessagesCount}</div>}

              </div>
              <div className="nav" >
                <Link to="/Login">LogOut</Link>
              </div>
            </nav>
          </div>
          <div className="UserContainer">
            <div className="User">
              <div className="Detail">
                <div className="userName">
                  <Typography variant="subtitle1">{user.user_name}</Typography>
                  <Typography variant="subtitle2">User</Typography>
                </div>
              </div>
              <div className="logo" >
                <img src={userPhoto || "https://source.unsplash.com/random"} alt="logo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Topbar;
