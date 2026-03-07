import AsyncStorage from '@react-native-async-storage/async-storage';

const XP_KEY = '@ChefAtHome:xp';
const STREAK_KEY = '@ChefAtHome:streak';
const COMPLETED_LESSONS_KEY = '@ChefAtHome:completedLessons';

const PersistenceService = {
  /**
   * Retrieves the user's current XP.
   * @returns {Promise<number>}
   */
  async getXP() {
    try {
      const xp = await AsyncStorage.getItem(XP_KEY);
      return xp ? parseInt(xp, 10) : 0;
    } catch (error) {
      console.error('Error retrieving XP:', error);
      return 0;
    }
  },

  /**
   * Adds XP to the user's total.
   * @param {number} amount - The amount of XP to add.
   * @returns {Promise<void>}
   */
  async addXP(amount) {
    try {
      const currentXP = await this.getXP();
      await AsyncStorage.setItem(XP_KEY, (currentXP + amount).toString());
    } catch (error) {
      console.error('Error adding XP:', error);
    }
  },

  /**
   * Retrieves the user's current streak.
   * @returns {Promise<number>}
   */
  async getStreak() {
    try {
      const streak = await AsyncStorage.getItem(STREAK_KEY);
      return streak ? parseInt(streak, 10) : 0;
    } catch (error) {
      console.error('Error retrieving streak:', error);
      return 0;
    }
  },

  /**
   * Increments the user's streak.
   * @returns {Promise<void>}
   */
  async incrementStreak() {
    try {
      const currentStreak = await this.getStreak();
      await AsyncStorage.setItem(STREAK_KEY, (currentStreak + 1).toString());
    } catch (error) {
      console.error('Error incrementing streak:', error);
    }
  },

  /**
   * Resets the user's streak.
   * @returns {Promise<void>}
   */
  async resetStreak() {
    try {
      await AsyncStorage.setItem(STREAK_KEY, '0');
    } catch (error) {
      console.error('Error resetting streak:', error);
    }
  },

  /**
   * Retrieves a list of completed lesson IDs.
   * @returns {Promise<string[]>}
   */
  async getCompletedLessons() {
    try {
      const lessons = await AsyncStorage.getItem(COMPLETED_LESSONS_KEY);
      return lessons ? JSON.parse(lessons) : [];
    } catch (error) {
      console.error('Error retrieving completed lessons:', error);
      return [];
    }
  },

  /**
   * Marks a lesson as completed.
   * @param {string} lessonId - The ID of the lesson to mark as complete.
   * @returns {Promise<void>}
   */
  async markLessonComplete(lessonId) {
    try {
      const completedLessons = await this.getCompletedLessons();
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
        await AsyncStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(completedLessons));
      }
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  },

  /**
   * Checks if a lesson has been completed.
   * @param {string} lessonId - The ID of the lesson to check.
   * @returns {Promise<boolean>}
   */
  async isLessonComplete(lessonId) {
    const completedLessons = await this.getCompletedLessons();
    return completedLessons.includes(lessonId);
  }
};

export default PersistenceService;
