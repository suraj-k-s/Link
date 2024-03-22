import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/Firebase';

const FineType = () => {
  const [fineType, setFineType] = useState("");
  const [fineTypes, setFineTypes] = useState([]);

  const fineTypesCollection = collection(db, "fine_types");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(fineTypesCollection);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFineTypes(data);
    } catch (error) {
      console.error("Error fetching fine types:", error);
    }
  };

  const addOrUpdateFineType = async (e) => {
    e.preventDefault();
    try {
      if (!fineType.trim()) return;

      const existingFineType = fineTypes.find(type => type.fineType === fineType);
      if (existingFineType) {
        const updateRef = doc(fineTypesCollection, existingFineType.id);
        await updateDoc(updateRef, { fineType });
      } else {
        await addDoc(fineTypesCollection, { fineType });
      }

      setFineType("");
      fetchData();
    } catch (error) {
      console.error("Error adding/updating fine type:", error);
    }
  };

  const deleteFineType = async (id) => {
    try {
      await deleteDoc(doc(fineTypesCollection, id));
      fetchData();
    } catch (error) {
      console.error("Error deleting fine type:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Fine Types</Typography>
      <form onSubmit={addOrUpdateFineType}>
        <TextField
          label="Fine Type"
          value={fineType}
          onChange={(e) => setFineType(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">Add/Update Fine Type</Button>
      </form>

      <Typography variant="h5">Existing Fine Types</Typography>
      {fineTypes.map((type) => (
        <div key={type.id}>
          <Typography>{type.fineType}</Typography>
          <Button onClick={() => deleteFineType(type.id)} variant="contained" color="secondary">Delete</Button>
        </div>
      ))}
    </div>
  );
};

export default FineType;
