import { Router, type IRouter } from "express";
import healthRouter from "./health";
import projectsRouter from "./projects";
import datasetsRouter from "./datasets";
import chartsRouter from "./charts";
import reportsRouter from "./reports";
import notificationsRouter from "./notifications";
import analyticsRouter from "./analytics";

const router: IRouter = Router();

router.use(healthRouter);
router.use(projectsRouter);
router.use(datasetsRouter);
router.use(chartsRouter);
router.use(reportsRouter);
router.use(notificationsRouter);
router.use(analyticsRouter);

export default router;
