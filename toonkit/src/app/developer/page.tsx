import { Container, Typography, Link } from "@mui/material";

export default function Page() {
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3">Manoj Gowda</Typography>
      <Typography>
        Creator of toonkit — building tools that simplify development.
      </Typography>

      <Link href="https://github.com/ManojGowda89">GitHub</Link>
    </Container>
  );
}