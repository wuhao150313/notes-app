import axiosInstance from './axiosInstance';

export const getTotalNotes = (userId) =>
  axiosInstance
    .get(`/statistics/total-notes/${userId}`)
    .then((res) => res.data);

export const getTotalWords = (userId) =>
  axiosInstance
    .get(`/statistics/total-words/${userId}`)
    .then((res) => res.data);

export const getCategoryCount = (userId) =>
  axiosInstance
    .get(`/statistics/category-count/${userId}`)
    .then((res) => res.data);

export const getTagCount = (userId) =>
  axiosInstance.get(`/statistics/tag-count/${userId}`).then((res) => res.data);

export const getTopTag = (userId) =>
  axiosInstance.get(`/statistics/top-tag/${userId}`).then((res) => res.data);

export const getRegistrationTime = (userId) =>
  axiosInstance
    .get(`/statistics/registration-time/${userId}`)
    .then((res) => res.data);

export const getLastActive = (userId) =>
  axiosInstance
    .get(`/statistics/last-active/${userId}`)
    .then((res) => res.data);

export const getContinuousDays = (userId) =>
  axiosInstance
    .get(`/statistics/continuous-days/${userId}`)
    .then((res) => res.data);

export const getMonthlyNotesCount = (userId) =>
  axiosInstance
    .get(`/statistics/monthly-notes/${userId}`)
    .then((res) => res.data);

export const getPeakHour = (userId) =>
  axiosInstance.get(`/statistics/peak-hour/${userId}`).then((res) => res.data);

export const getWeeklyPreference = (userId) =>
  axiosInstance
    .get(`/statistics/weekly-preference/${userId}`)
    .then((res) => res.data);

export const getAverageNoteLength = (userId) =>
  axiosInstance
    .get(`/statistics/average-note-length/${userId}`)
    .then((res) => res.data);

export const getUpdateFrequency = (userId) =>
  axiosInstance
    .get(`/statistics/update-frequency/${userId}`)
    .then((res) => res.data);

export const getAverageUpdateCount = (userId) =>
  axiosInstance
    .get(`/statistics/average-update-count/${userId}`)
    .then((res) => res.data);

export const getLatestUpdatedNote = (userId) =>
  axiosInstance
    .get(`/statistics/latest-updated-note/${userId}`)
    .then((res) => res.data);

export const getTopTags = (userId) =>
  axiosInstance.get(`/statistics/top-tags/${userId}`).then((res) => res.data);

export const getTopCategories = (userId) =>
  axiosInstance
    .get(`/statistics/top-categories/${userId}`)
    .then((res) => res.data);
