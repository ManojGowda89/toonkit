"use client";

import { Button, Typography, Stack, Chip, Box } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <Stack spacing={4} sx={{ textAlign: "center", mt: 10, px: 2 }}>
      
      {/* Title Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Typography variant="h2" fontWeight="bold">
          toonkit
        </Typography>

        <Typography variant="h5" color="text.secondary">
          Typed Object Oriented Notation for modern APIs
        </Typography>
      </motion.div>

      {/* Open Source Badge */}
      <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
        <Chip label="🚀 Open Source" />
        <Chip label="Lightweight" />
        <Chip label="Type Safe" />
        <Chip label="API Friendly" />
        <Chip label="Human Readable" />
      </Stack>

      {/* Install Command */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          px: 3,
          py: 1.5,
          display: "inline-block",
          fontFamily: "monospace",
          fontSize: "1rem",
          boxShadow: 1,
        }}
      >
        npm install <strong>toonkit</strong>
      </Box>

      {/* Key Benefits */}
      <Stack spacing={1}>
        <Typography color="text.secondary">
          ✔ Smaller payloads & faster parsing
        </Typography>
        <Typography color="text.secondary">
          ✔ Schema + types + compact structure
        </Typography>
        <Typography color="text.secondary">
          ✔ Perfect for APIs, bots & automation
        </Typography>
        <Typography color="text.secondary">
          ✔ Frontend ⇄ Backend symmetry
        </Typography>
      </Stack>

      {/* Buttons */}
      <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
        <Button variant="contained" component={Link} href="/docs">
          Get Started
        </Button>

        <Button variant="outlined" component={Link} href="/playground">
          Try Playground
        </Button>

        {/* <Button
          variant="text"
          href="https://github.com/ManojGowda89/toonkit"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </Button>

        <Button
          variant="text"
          href="https://toonkit.manojgowda.in"
          target="_blank"
          rel="noopener"
        >
          Docs
        </Button> */}
      </Stack>
    </Stack>
  );
}