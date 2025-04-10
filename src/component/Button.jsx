import { Box } from "@mui/material";

function Button({ children, selected, onclick }) {
  return (
    <Box
      onClick={onclick}
      sx={{
        border: "1px solid gold",
        borderRadius: 1,
        px: 2.5,
        py: 1.25,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "gold" : "transparent",
        color: selected ? "black" : "inherit",
        fontWeight: selected ? 700 : 500,
        "&:hover": {
          backgroundColor: "gold",
          color: "black",
        },
        width: "22%",
        textAlign: "center",
      }}
    >
      {children}
    </Box>
  );
}

export default Button;
