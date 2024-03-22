import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
} from "@mui/material";
import "./LawyerAppointmentsPage.css";
const LawyerAppointmentsPage = ({ lawyerId }) => {
  // Assume you have a function to fetch the lawyer's appointments
  const fetchAppointments = async () => {
    // Your logic to fetch appointments from the database based on the lawyerId
    // Example: const appointments = await getLawyerAppointments(lawyerId);
    // Set the appointments state with the fetched data
    // setAppointments(appointments);
  };

  useEffect(() => {
    // Fetch lawyer's appointments when the component mounts
    fetchAppointments();
  }, []);

  // Assume appointments is an array of appointment objects with properties like appointmentId and clientName
  const appointments = [
    { appointmentId: 1, clientName: "Client 1" },
    { appointmentId: 2, clientName: "Client 2" },
    { appointmentId: 3, clientName: "Client 3" },
    // Add more appointments as needed
  ];

  const handleAcceptAppointment = (appointmentId) => {
    // Your logic to handle accepting the appointment
    // Example: acceptAppointment(appointmentId);
    // After accepting, you may want to update the state or refetch appointments
    // fetchAppointments();
  };

  const handleRejectAppointment = (appointmentId) => {
    // Your logic to handle rejecting the appointment
    // Example: rejectAppointment(appointmentId);
    // After rejecting, you may want to update the state or refetch appointments
    // fetchAppointments();
  };

  const acceptedAppointments = appointments.filter(
    (appointment) => appointment.isAccepted
  );

  return (
    <div className="LawyerAppointmentsPage" style={{ padding: "10px 220px" }}>
      <div className="Title">
        <Typography variant="h4">Appointments</Typography>
      </div>

      {/* {appointments.length > 0 ? (
        <List>
          {appointments.map((appointment) => (
            <ListItem key={appointment.appointmentId}>
              <ListItemText primary={appointment.clientName} />
              {!appointment.isAccepted && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAcceptAppointment(appointment.appointmentId)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRejectAppointment(appointment.appointmentId)}
                  >
                    Reject
                  </Button>
                </>
              )}
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="subtitle1">No appointments available.</Typography>
      )}

      {acceptedAppointments.length > 0 && (
        <div>
          <Typography variant="h5">Accepted Appointments</Typography>
          <List>
            {acceptedAppointments.map((acceptedAppointment) => (
              <ListItem key={acceptedAppointment.appointmentId}>
                <ListItemText primary={acceptedAppointment.clientName} />
              </ListItem>
            ))}
          </List>
        </div>
      )} */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <div className="appoinment-container">
            <div className="appoinment-list">
              <Typography variant="h6">Client Name</Typography>
              <Typography variant="subtitle1">Case ID : 123456789</Typography>
              <Typography variant="subtitle1">Category</Typography>
              <Typography variant="subtitle1">Subcategory</Typography>
              <Typography variant="subtitle1">View more</Typography>
              <Typography variant="subtitle1">View more</Typography>
              <div className="appoinment-button">
                <div className="acccept">
                  <Button variant="contained" color="primary">
                    Accept
                  </Button>
                </div>
                <div className="reject">
                  <Button variant="contained" color="secondary">
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div className="appoinment-container">
            <div className="appoinment-list">
              <Typography variant="h6">Client Name</Typography>
              <Typography variant="subtitle1">Case ID : 123456789</Typography>
              <Typography variant="subtitle1">Category</Typography>
              <Typography variant="subtitle1">Subcategory</Typography>
              <Typography variant="subtitle1">View more</Typography>
              <Typography variant="subtitle1">View more</Typography>
              <div className="appoinment-button">
                <div className="acccept">
                  <Button variant="contained" color="primary">
                    Accept
                  </Button>
                </div>
                <div className="reject">
                  <Button variant="contained" color="secondary">
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div className="appoinment-container">
            <div className="appoinment-list">
              <Typography variant="h6">Client Name</Typography>
              <Typography variant="subtitle1">Case ID : 123456789</Typography>
              <Typography variant="subtitle1">Category</Typography>
              <Typography variant="subtitle1">Subcategory</Typography>
              <Typography variant="subtitle1">View more</Typography>
              <Typography variant="subtitle1">View more</Typography>
              <div className="appoinment-button">
                <div className="acccept">
                  <Button variant="contained" color="primary">
                    Accept
                  </Button>
                </div>
                <div className="reject">
                  <Button variant="contained" color="secondary">
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <div className="appoinment-container">
            <div className="appoinment-list">
              <Typography variant="h6">Client Name</Typography>
              <Typography variant="subtitle1">Case ID : 123456789</Typography>
              <Typography variant="subtitle1">Category</Typography>
              <Typography variant="subtitle1">Subcategory</Typography>
              <Typography variant="subtitle1">View more</Typography>
              <Typography variant="subtitle1">View more</Typography>
              <div className="appoinment-button">
                <div className="acccept">
                  <Button variant="contained" color="primary">
                    Accept
                  </Button>
                </div>
                <div className="reject">
                  <Button variant="contained" color="secondary">
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LawyerAppointmentsPage;
