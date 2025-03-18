import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  darkMode: boolean;
}

// Get stored theme from localStorage
const storedTheme = localStorage.getItem("theme");
const initialState: ThemeState = {
  darkMode: storedTheme ? storedTheme === "dark" : false,
};

// Apply dark mode on first load
if (initialState.darkMode) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("theme", state.darkMode ? "dark" : "light");

      // Toggle dark mode on <html> element
      if (state.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
