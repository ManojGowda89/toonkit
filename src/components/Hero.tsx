"use client";

import { Button, Typography, Stack, Chip, Box } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Stack
        spacing={4}
        alignItems="center"
        textAlign="center"
        sx={{
          width: "100%",
          maxWidth: 900,
        }}
      >
        {/* Title */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: "3rem",
                md: "4.5rem",
              },
            }}
          >
            toonkit
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              mt: 1,
              fontSize: {
                xs: "1.2rem",
                md: "1.6rem",
              },
            }}
          >
            Typed Object Oriented Notation for modern APIs
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "text.secondary",
              maxWidth: 720,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Official JavaScript library for TOON, recognized by Libraries.io
            and verified by JS.org.
          </Typography>
        </motion.div>

        {/* Chips */}
        <Stack
          direction="row"
          spacing={1.2}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
        >
          <Chip label="🚀 Open Source" />
          <Chip label="Lightweight" />
          <Chip label="Type Safe" />
          <Chip label="API Friendly" />
          <Chip label="Human Readable" />
        </Stack>

        {/* Install Command */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1100,
            bgcolor: "#111",
            borderRadius: 4,
            py: 2,
            px: 3,
            fontFamily: "monospace",
            fontSize: "1rem",
            textAlign: "center",
            overflowX: "auto",
          }}
        >
          npm install <strong>toonkit</strong>
        </Box>

        {/* External Links */}
        <Stack
          direction="row"
          spacing={1.5}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
        >
          <Button
            variant="outlined"
            component={Link}
            href="https://www.npmjs.com/package/toonkit"
            target="_blank"
            size="small"
          >
            NPM PACKAGE
          </Button>

          <Button
            variant="outlined"
            component={Link}
            href="https://libraries.io/npm/toonkit"
            target="_blank"
            size="small"
          >
            LIBRARIES.IO
          </Button>

          <Button
            variant="outlined"
            component={Link}
            href="https://toonkit.manojgowda.in/"
            target="_blank"
            size="small"
          >
            TOONKIT.MANOJGOWDA.IN
          </Button>

          <Button
            variant="outlined"
            component={Link}
            href="https://toonkit.js.org"
            target="_blank"
            size="small"
          >
            TOONKIT.JS.ORG
          </Button>
        </Stack>

        {/* Features */}
        <Stack spacing={1} alignItems="center">
          <Typography color="text.secondary">
            ✓ Smaller payloads & faster parsing
          </Typography>

          <Typography color="text.secondary">
            ✓ Schema + types + compact structure
          </Typography>

          <Typography color="text.secondary">
            ✓ Perfect for APIs, bots & automation
          </Typography>

          <Typography color="text.secondary">
            ✓ Frontend ⇄ Backend symmetry
          </Typography>
        </Stack>

        {/* CTA */}
        <Stack
          direction="row"
          spacing={2}
          useFlexGap
          flexWrap="wrap"
          justifyContent="center"
        >
          <Button variant="contained" component={Link} href="/docs">
            Get Started
          </Button>

          <Button variant="outlined" component={Link} href="/playground">
            Try Playground
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}