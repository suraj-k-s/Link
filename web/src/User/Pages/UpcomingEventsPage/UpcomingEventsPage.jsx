// UpcomingEventsPage.jsx
import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "../mainpadding.css"
const UpcomingEventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([
    // Assume you have a list of upcoming events
    { eventId: 1, eventName: "Case Hearing 1", eventDate: "2024-06-15" },
    { eventId: 2, eventName: "Case Hearing 2", eventDate: "2024-07-01" },
    // Add more events as needed
  ]);

  useEffect(() => {
    // Fetch upcoming events from your backend or database
    // Example: fetchUpcomingEvents().then((events) => setUpcomingEvents(events));
  }, []); // Empty dependency array to ensure useEffect runs once on component mount

  return (
    <div className="maincontainer">
      <Typography variant="h4">Upcoming Events</Typography>

      {upcomingEvents.length > 0 ? (
        <List>
          {upcomingEvents.map((event) => (
            <ListItem key={event.eventId}>
              <ListItemText
                primary={event.eventName}
                secondary={`Date: ${event.eventDate}`}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No upcoming events</Typography>
      )}
    </div>
  );
};

export default UpcomingEventsPage;
