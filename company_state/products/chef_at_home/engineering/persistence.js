/**
 * ChefAtHome Persistence Layer
 *
 * This module handles local storage for user progress, including XP, streaks,
 * and unlocked milestones using AsyncStorage.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const XP_KEY = '@ChefAtHome:xp';
const STREAK_KEY = '@ChefAtHome:streak';
const LAST_ACTIVE_DATE_KEY = '@ChefAtHome:lastActiveDate';
const UNLOCKED_LEVELS_KEY = '@ChefAtHome:unlockedLevels';

/**
 * Initializes persistence by setting default values if none exist.
 */
export const initializePersistence = async () => {
  try {
    const xp = await AsyncStorage.getItem(XP_KEY);
    if (xp === null) {
      await AsyncStorage.setItem(XP_KEY, '0');
    }

    const streak = await AsyncStorage.getItem(STREAK_KEY);
    if (streak === null) {
      await AsyncStorage.setItem(STREAK_KEY, '0');
    }

    const lastActiveDate = await AsyncStorage.getItem(LAST_ACTIVE_DATE_KEY);
    if (lastActiveDate === null) {
      await AsyncStorage.setItem(LAST_ACTIVE_DATE_KEY, new Date().toISOString());
    }

    const unlockedLevels = await AsyncStorage.getItem(UNLOCKED_LEVELS_KEY);
    if (unlockedLevels === null) {
      // Level 0 is typically unlocked by default
      await AsyncStorage.setItem(UNLOCKED_LEVELS_KEY, JSON.stringify(['Level 0']));
    }
  } catch (error) {
    console.error('Error initializing persistence:', error);
  }
};

/**
 * Adds XP to the user's total.
 * @param {number} amount - The amount of XP to add.
 */
export const addXP = async (amount) => {
  try {
    const currentXP = parseInt(await AsyncStorage.getItem(XP_KEY) || '0', 10);
    const newXP = currentXP + amount;
    await AsyncStorage.setItem(XP_KEY, newXP.toString());
    return newXP;
  } catch (error) {
    console.error('Error adding XP:', error);
    return null;
  }
};

/**
 * Gets the current XP.
 * @returns {Promise<number|null>} The current XP or null if an error occurs.
 */
export const getXP = async () => {
  try {
    const xp = await AsyncStorage.getItem(XP_KEY);
    return parseInt(xp || '0', 10);
  } catch (error) {
    console.error('Error getting XP:', error);
    return null;
  }
};

/**
 * Updates the user's streak. This should be called daily.
 */
export const updateStreak = async () => {
  try {
    const today = new Date();
    const lastActiveDateStr = await AsyncStorage.getItem(LAST_ACTIVE_DATE_KEY);
    const lastActiveDate = lastActiveDateStr ? new Date(lastActiveDateStr) : null;

    let currentStreak = parseInt(await AsyncStorage.getItem(STREAK_KEY) || '0', 10);

    if (lastActiveDate) {
      const diffTime = today.getTime() - lastActiveDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Consecutive day, increment streak
        currentStreak += 1;
      } else if (diffDays > 1) {
        // Gap in days, reset streak
        currentStreak = 1;
      } else {
        // Same day, do nothing
        return currentStreak;
      }
    } else {
      // First active day
      currentStreak = 1;
    }

    await AsyncStorage.setItem(STREAK_KEY, currentStreak.toString());
    await AsyncStorage.setItem(LAST_ACTIVE_DATE_KEY, today.toISOString());
    return currentStreak;
  } catch (error) {
    console.error('Error updating streak:', error);
    return null;
  }
};

/**
 * Gets the current streak.
 * @returns {Promise<number|null>} The current streak or null if an error occurs.
 */
export const getStreak = async () => {
  try {
    const streak = await AsyncStorage.getItem(STREAK_KEY);
    return parseInt(streak || '0', 10);
  } catch (error) {
    console.error('Error getting streak:', error);
    return null;
  }
};

/**
 * Unlocks a new level or milestone.
 * @param {string} levelName - The name of the level/milestone to unlock.
 */
export const unlockLevel = async (levelName) => {
  try {
    const unlockedLevelsJson = await AsyncStorage.getItem(UNLOCKED_LEVELS_KEY);
    const unlockedLevels = unlockedLevelsJson ? JSON.parse(unlockedLevelsJson) : [];

    if (!unlockedLevels.includes(levelName)) {
      unlockedLevels.push(levelName);
      await AsyncStorage.setItem(UNLOCKED_LEVELS_KEY, JSON.stringify(unlockedLevels));
      console.log(`Level ${levelName} unlocked.`);
      return true;
    }
    return false; // Already unlocked
  } catch (error) {
    console.error('Error unlocking level:', error);
    return false;
  }
};

/**
 * Checks if a level is unlocked.
 * @param {string} levelName - The name of the level to check.
 * @returns {Promise<boolean>} True if unlocked, false otherwise.
 */
export const isLevelUnlocked = async (levelName) => {
  try {
    const unlockedLevelsJson = await AsyncStorage.getItem(UNLOCKED_LEVELS_KEY);
    const unlockedLevels = unlockedLevelsJson ? JSON.parse(unlockedLevelsJson) : [];
    return unlockedLevels.includes(levelName);
  } catch (error) {
    console.error('Error checking if level is unlocked:', error);
    return false;
  }
};

/**
 * Gets all unlocked levels.
 * @returns {Promise<string[]>} An array of unlocked level names.
 */
export const getUnlockedLevels = async () => {
  try {
    const unlockedLevelsJson = await AsyncStorage.getItem(UNLOCKED_LEVELS_KEY);
    return unlockedLevelsJson ? JSON.parse(unlockedLevelsJson) : [];
  } catch (error) {
    console.error('Error getting unlocked levels:', error);
    return [];
  }
};