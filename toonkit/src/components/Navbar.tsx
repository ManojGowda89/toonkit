"use client";

import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar>
        {/* Logo / Home */}
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
        >
          toonkit
        </Typography>

        {/* Navigation */}
        <Button component={Link} href="/">Home</Button>
        <Button component={Link} href="/docs">Docs</Button>
        <Button component={Link} href="/playground">Playground</Button>
        <Button component={Link} href="/api-simulator">
          API Simulation
        </Button>

        {/* External Links */}
        <Button
          href="https://github.com/ManojGowda89/toonkit"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </Button>

        <Button
          href="https://manojgowda.in"
          target="_blank"
          rel="noopener"
        >
          Developer
        </Button>

        {/* <ThemeToggle /> */}
      </Toolbar>
    </AppBar>
  );
}