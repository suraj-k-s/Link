import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";

const UpcomingEventsPage = () => {
  // Dummy data for upcoming events
  const dummyEvents = [
    { id: 1, title: "Event 1", date: "2024-03-15" },
    { id: 2, title: "Event 2", date: "2024-03-20" },
    { id: 3, title: "Event 3", date: "2024-03-25" },
    { id: 4, title: "Event 4", date: "2024-04-01" },
    { id: 5, title: "Event 5", date: "2024-04-10" },
  ];

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Here you can fetch the upcoming events from your database or API
    // For now, we'll set the state with the dummyEvents
    setEvents(dummyEvents);
  }, []);

  return (
    <div className="UpcomingEvents" style={{padding : "20px 220px"}}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4} lg={3}>
            <div style={{ border: "1px solid #ccc", padding: "10px" }}>
              <Typography variant="h6">{event.title}</Typography>
              <Typography>Date: {event.date}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UpcomingEventsPage;
