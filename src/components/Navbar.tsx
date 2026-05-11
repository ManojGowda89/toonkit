"use client";

import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ backdropFilter: "blur(12px)", borderBottom: 1, borderColor: "divider" }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 64, sm: 72 },
          gap: 1,
          flexWrap: "wrap",
          py: 1,
        }}
      >
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{
            flexGrow: 1,
            minWidth: 96,
            textDecoration: "none",
            color: "inherit",
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          toonkit
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-end" },
            flexWrap: "wrap",
            gap: 0.5,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button component={Link} href="/" size="small" sx={{ minWidth: 0, px: 1.25 }}>
            Home
          </Button>
          <Button component={Link} href="/docs" size="small" sx={{ minWidth: 0, px: 1.25 }}>
            Docs
          </Button>
          <Button component={Link} href="/playground" size="small" sx={{ minWidth: 0, px: 1.25 }}>
            Playground
          </Button>
          <Button
            href="https://github.com/ManojGowda89/toonkit"
            target="_blank"
            rel="noopener"
            size="small"
            sx={{ minWidth: 0, px: 1.25 }}
          >
            GitHub
          </Button>
          <Button
            href="https://manojgowda.in"
            target="_blank"
            rel="noopener"
            size="small"
            sx={{ minWidth: 0, px: 1.25 }}
          >
            Developer
          </Button>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}