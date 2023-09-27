import { Request, Response, Router } from "express";
import authRouter from "./auth";
import guildsRouter from "./guilds/index";
import { getUserDataController } from "../exports";

const router = Router();

router.use("/auth", authRouter);
router.use("/guilds", guildsRouter);

router.get("/status", (req, res) => {
  if (!req.user || req.user === undefined) {
    res.sendStatus(403);
  } else {
    res.sendStatus(200);
  }
});

router.get("/me", async (req, res) => {
  if (!req.user || req.user === undefined) {
    res.sendStatus(403);
  } else {
    await getUserDataController(req, res);
  }
});

router.get("/discord", (req, res) => {
  res.send(`<script>window.onload = function() {window.close();};</script>`);
});

export { router };
