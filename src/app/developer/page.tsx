import type { Metadata } from "next";
import { Container, Typography, Link } from "@mui/material";

export const metadata: Metadata = {
  title: "Developer - Toonkit",
  description: "Manoj Gowda - Creator of Toonkit. Explore projects, contributions, and tools built for developers.",
};

export default function Page() {
  return (
    <Container sx={{ mt: { xs: 3, md: 6 }, px: { xs: 2, sm: 3 } }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, lineHeight: 1.1 }}
      >
        Manoj Gowda
      </Typography>
      <Typography sx={{ mt: 1.5, maxWidth: 560, fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.7 }}>
        Creator of toonkit — building tools that simplify development.
      </Typography>

      <Link href="https://github.com/ManojGowda89" sx={{ display: "inline-block", mt: 2 }}>
        GitHub
      </Link>
    </Container>
  );
}