import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router: IRouter = Router();

// Health check endpoint for monitoring and uptime checks
router.get("/healthz", (_req, res) => {
  try {
    const data = HealthCheckResponse.parse({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "unknown",
      version: "1.0.0", // Update this with your app version
      uptime: process.uptime(),
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(503).json({
      status: "error",
      timestamp: new Date().toISOString(),
      message: "Health check failed",
    });
  }
});

// Liveness probe (for Kubernetes/container orchestration)
router.get("/health/live", (_req, res) => {
  res.status(200).json({ status: "alive" });
});

// Readiness probe (checks if service is ready to handle requests)
router.get("/health/ready", (req, res) => {
  // In production, add database connectivity check here
  // For now, simple check
  res.status(200).json({ status: "ready" });
});

export default router;
