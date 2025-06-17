import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import MuiCard from "@mui/material/Card";
import AppTheme from "../shared-theme/AppTheme";

const Card = styled(MuiCard)(() => ({
  width: "100%",
  maxWidth: "700px",
  margin: "auto",
  textAlign: "center",
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

var message;

const verify = () => {
  const token = getTokenFromUrl();
  if (!token) {
    message =
      "Email verification failed: No verification token found in the URL.";
    return;
  }
    if (verifyEmail(token)) {
    //   console.log("Email verification successful");
      message = "Email verification successful! You can now log in.";
    } else {
      message = "Email verification failed. Please try again.";
    }
};

const getTokenFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("token");
};

const verifyEmail = async (token) => {
  if (!token) {
    return false;
  }
  return true; // Simulate successful verification
};

export default function EmailVerification() {
  verify();

  return (
    <AppTheme>
      <PageContainer>
        <Card variant="outlined">
          <Typography component={"h4"} variant="body1" align="center">
            {message}
          </Typography>
        </Card>
      </PageContainer>
    </AppTheme>
  );
}
