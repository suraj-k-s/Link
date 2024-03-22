import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { collection, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "../../../config/Firebase";

const PermitApprovalPage = () => {
  const [permitRequests, setPermitRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPermitRequests = async () => {
      try {
        const permitRequestsRef = collection(db, "permitRequests");
        const q = query(permitRequestsRef, orderBy("timestamp", "desc")); // Order by timestamp in descending order
        const permitRequestsSnapshot = await getDocs(q);
        const permitRequestsList = permitRequestsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const permitType = collection(db, "Permit");
        const permitTypeSnapshot = await getDocs(permitType);
        const permitTypeList = permitTypeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const joinData = permitRequestsList
          .map((item) => ({
            ...item,
            permitType: permitTypeList.find(
              (cat) => cat.id === item.permitType
            ),
          }))
          .filter((item) => item.permitType && item.permitType.id);

        setPermitRequests(joinData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching permit requests:", error);
      }
    };

    fetchPermitRequests();
  }, []);

  const handleDecision = async (permitId, decision) => {
    try {
      const permitRef = doc(db, "permitRequests", permitId);
      await updateDoc(permitRef, { pStatus: decision === "approved" ? 1 : 2 });

      const updatedPermitRequests = permitRequests.map((permit) =>
        permit.id === permitId
          ? { ...permit, pStatus: decision === "approved" ? 1 : 2 }
          : permit
      );
      setPermitRequests(updatedPermitRequests);
    } catch (error) {
      console.error("Error updating permit request status:", error);
    }
  };

  return (
    <div style={{ padding: "10px 220px" }}>
      <Typography variant="h4">Permit Approval</Typography>

      {loading ? ( // Display loading animation if loading is true
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
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDecision(permit.id, "approved")}
                disabled={permit.pStatus === 1 || permit.pStatus === 2} // Disable if already accepted or rejected
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDecision(permit.id, "rejected")}
                disabled={permit.pStatus === 1 || permit.pStatus === 2} // Disable if already accepted or rejected
              >
                Reject
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </div>
  );
};

export default PermitApprovalPage;
