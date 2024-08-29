import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ChatReg() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/register',data);
    console.log(response.data);
    window.location.href='/connexion';
    } catch (error) {
      console.error("Erreur d'insertion:", error);
    }
  };

  // ... rest of the component
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
    >
      <Box
        width={400}
        sx={{
          backgroundColor: "aliceblue",
          padding: 3,
        }}
      >
        <Typography variant="h4" align="center">
          Register
        </Typography>
        <form onSubmit={handleSubmit(onubmit)}>
          <TextField
            label="Nom"
            variant="outlined"
            fullWidth
            size="small"
            margin="normal"
            {...register("nom", { required: true })}
            error={errors.nom && true}
            helperText={errors.nom && "Nom est requis"}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            size="small"
            type="email"
            margin="normal"
            {...register("email", { required: true })}
            error={errors.email && true}
            helperText={errors.email && "Email est requis"}
          />
          <TextField
            label="Mot de passe"
            variant="outlined"
            fullWidth
            type="password"
            size="small"
            margin="normal"
            {...register("password", { required: true })}
            error={errors.password && true}
            helperText={errors.password && "Mot de passe est requis"}
          />
          {/* je veux un champ file pour le profile en utilisant material ui pour le design*/}
          {/* <input type="file" {...register("profileImage")} /> */}
          
          <Button type="submit" variant="contained" style={{ width: "100%" }}>
            Enregistrement
          </Button>
        </form>
        <Typography paddingTop={2}>
          Vous voulez créer un compte ?{" "}
          <Link to="/connexion">Cliquez ici</Link>{" "}
        </Typography>
      </Box>
    </Stack>
  );
}