import { Backdrop, CircularProgress } from "@mui/material";

export default function LoadingComponent({ fetchLoading }) {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={fetchLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
