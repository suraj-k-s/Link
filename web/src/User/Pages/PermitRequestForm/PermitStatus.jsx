import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../config/Firebase";

    const PermitStatus = () => {
    const [permitRequests, setPermitRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const uid = sessionStorage.getItem("uid"); // Retrieve UserID from session variable

    useEffect(() => {
        const fetchPermitRequests = async () => {
        try {
            const permitRequestsRef = collection(db, "permitRequests");
            const permitRequestsSnapshot = await getDocs(permitRequestsRef);
            const permitRequestsList = permitRequestsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));

            // Filter permit requests based on UserID
            const filteredPermitRequests = permitRequestsList.filter(
            (permit) => permit.UserID === uid
            );

            const permitType = collection(db, "Permit");
            const permitTypeSnapshot = await getDocs(permitType);
            const permitTypeList = permitTypeSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));

            const joinData = filteredPermitRequests
            .map((permit) => ({
                ...permit,
                permitType: permitTypeList.find(
                (cat) => cat.id === permit.permitType
                ),
            }))
            .filter((permit) => permit.permitType && permit.permitType.id);
            setPermitRequests(joinData);

            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error("Error fetching permit requests:", error);
        }
        };

        fetchPermitRequests();
    }, [uid]); // Add uid to dependency array to refetch data when uid changes

  return (
    <div style={{ padding: "10px 220px" }}>
      <Typography variant="h4">Permit Approval</Typography>

      {loading ? (
        <CircularProgress />
      ) : permitRequests.length === 0 ? (
        <Typography variant="body1">No permit requests available.</Typography>
      ) : (
        permitRequests.map((permit) => (
          <Card key={permit.id} sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h6">
                Permit Type: {permit.permitType.permit}
              </Typography>
              <Typography>Applicant Name: {permit.applicantName}</Typography>
              <Typography>
                Applicant Address: {permit.applicantAddress}
              </Typography>
              <Typography>Reason: {permit.reason}</Typography>
              <Typography>
                Request Date:{" "}
                {new Date(permit.timestamp.seconds * 1000).toLocaleString()}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color:
                    permit.pStatus === 1
                      ? "green"
                      : permit.pStatus === 2
                      ? "red"
                      : "inherit",
                }}
              >
                Status:{" "}
                {permit.pStatus
                  ? permit.pStatus === 1
                    ? "Accepted"
                    : "Rejected"
                  : "Pending"}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PermitStatus;
