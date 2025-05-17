import express from "express";
import {
  getTotalNotes,
  getTotalWords,
  getCategoryCount,
  getTagCount,
  getTopTag,
  getRegistrationTime,
  getLastActive,
  getContinuousDays,
  getMonthlyNotesCount,
  getPeakHour,
  getWeeklyPreference,
  getAverageNoteLength,
  getUpdateFrequency,
  getAverageUpdateCount,
  getLatestUpdatedNote,
  getTopTags,
  getTopCategories,
} from "../controllers/statisticsController.js";

const router = express.Router();

// 原有统计接口
router.get("/total-notes/:userId", getTotalNotes);
router.get("/total-words/:userId", getTotalWords);
router.get("/category-count/:userId", getCategoryCount);
router.get("/tag-count/:userId", getTagCount);
router.get("/top-tag/:userId", getTopTag);

// 新增的统计接口
router.get("/registration-time/:userId", getRegistrationTime);
router.get("/last-active/:userId", getLastActive);
router.get("/continuous-days/:userId", getContinuousDays);
router.get("/monthly-notes/:userId", getMonthlyNotesCount);
router.get("/peak-hour/:userId", getPeakHour);
router.get("/weekly-preference/:userId", getWeeklyPreference);
router.get("/average-note-length/:userId", getAverageNoteLength);
router.get("/update-frequency/:userId", getUpdateFrequency);
router.get("/average-update-count/:userId", getAverageUpdateCount);
router.get("/latest-updated-note/:userId", getLatestUpdatedNote);

// 新增TOP5接口路由
router.get("/top-tags/:userId", getTopTags);
router.get("/top-categories/:userId", getTopCategories);

export default router;
