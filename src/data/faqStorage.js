// src/data/faqStorage.js

const STORAGE_KEY = "faqData";

export const loadFaqData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load FAQ data:", error);
    return [];
  }
};

export const saveFaqData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save FAQ data:", error);
  }
};
