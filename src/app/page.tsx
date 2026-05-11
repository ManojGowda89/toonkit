import Hero from "@/components/Hero";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
      <Hero />
    </Container>
  );
}