import React from "react";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import AppTheme from "../shared-theme/AppTheme";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PasswordResetConfirm from "./PasswordResetConfirm";
import { userApi } from "../../scripts/userApi";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  height: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "700px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const PageContainer = styled(Stack)(({ theme }) => ({
  // height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  overflow: "auto",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "fixed",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

function getTokenFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  return token;
}

export default function PasswordReset() {
  const [newError, setNewError] = React.useState(false);
  const [confirmError, setConfirmError] = React.useState(false);
  const [newErrorMessage, setNewErrorMessage] = React.useState("");
  const [confirmErrorMessage, setConfirmErrorMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  // const showSuccessMessage = () => {
  //   setSuccess(true);
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newError || confirmError) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const newPassword = data.get("new_password");
    // console.log(newPassword);
    // alert(newPassword);
    validateReset(getTokenFromUrl(), newPassword).then(
      (resetSuccesful) => {
        console.log("Reset successful:", resetSuccesful);
        if(resetSuccesful == true) {
          setSuccess(true);
        }
      }
    );
  };

  const validateReset = async (token, newPassword) => {
    var answer;
    try {
      answer = await userApi.resetPassword(token, newPassword);
    } catch (error) {
      alert("Error resetting password");
      console.error("Error resetting password:", error);
      return false;
    }
    return answer;
  }

  const validateInputs = () => {
    const newPassword = document.getElementById("new_password");
    const confirmPassword = document.getElementById("confirm_password");

    let isValid = true;

    if (!newPassword.value || newPassword.value.length < 6) {
      setNewError(true);
      setNewErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setNewErrorMessage("");
      setNewError(false);
    }

    if (newPassword.value !== confirmPassword.value) {
      setConfirmError(true);
      setConfirmErrorMessage("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmErrorMessage("");
      setConfirmError(false);
    }

    return isValid;
  };

  return success ? (
    <AppTheme>
      <PageContainer>
        <Card variant="outlined">
          <PasswordResetConfirm />
        </Card>
      </PageContainer>
    </AppTheme>
  ) : (
    <AppTheme>
      <PageContainer>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Recover Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="new_password">Enter new password</FormLabel>
              <TextField
                error={newError}
                helperText={newErrorMessage}
                id="new_password"
                type="password"
                name="new_password"
                placeholder="New password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={newError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
              <TextField
                error={confirmError}
                helperText={confirmErrorMessage}
                id="confirm_password"
                type="password"
                name="confirm_password"
                placeholder="Confirm password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={confirmError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Set new password
            </Button>
          </Box>
        </Card>
      </PageContainer>
    </AppTheme>
  );
}
