import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function ChatCon() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        data
      );
      console.log(response.data);
      localStorage.setItem('token',response.data.token);
      localStorage.setItem('userId',response.data.userId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
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
          {" "}
          connexion
        </Typography>
        <form onSubmit={handleSubmit(onubmit)}>
          <TextField
            label={"email"}
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
            label={"password"}
            variant="outlined"
            fullWidth
            size="small"
            type="password"
            margin="normal"
            {...register("password", { required: true })}
            error={errors.password && true}
            helperText={errors.password && "password est requis"}
          />
          <Button type="submit" variant="contained" style={{ width: "100%" }}>
            connexion
          </Button>
        </form>

        <Typography paddingTop={2}>
          voulez vous creer un compte ? <Link to="/register">Cliquez ici</Link>{" "}
        </Typography>
      </Box>{" "}
    </Stack>
  );
}
