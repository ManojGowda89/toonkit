import Link from "next/link";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, mt: 6, textAlign: "center", color: "text.secondary" }}>
      <Typography variant="body2">
        Official Domains: {" "}
        <Link href="https://toonkit.js.org" target="_blank" rel="noopener noreferrer">toonkit.js.org</Link>
        {" • "}
        <Link href="https://toonkit.manojgowda.in" target="_blank" rel="noopener noreferrer">toonkit.manojgowda.in</Link>
      </Typography>
    </Box>
  );
}
