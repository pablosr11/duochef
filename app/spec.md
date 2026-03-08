# ChefAtHome (Duolingo for Cooking) — Product Spec

## Vision
Help people learn practical cooking skills at home the way Duolingo teaches languages: short lessons, repetition, streaks, and clear milestones. Start from absolute beginner (boiling water) and progress to confidence with core dishes (pasta, eggs, rice, roasted veggies) and then multi-step meals.

## Target audience
- Complete beginners who want to cook safely and confidently.
- Busy adults who can only do 5–10 minutes of learning at a time.
- People who feel intimidated by recipes and want skill-building progression.

## Product principles
- **Engine First, Content Second**: Prioritize building the interactive lesson engine and progress tracking systems over adding many recipes. 
- **SHIPPING IS THE ONLY FEATURE**: A live, testable app and website are required by March 8th. No new content or "investigations" until the waitlist is public.
- **Safe first**: kitchen safety and food safety are explicit milestones.
- **Functional Stability over Content Volume**: We must now prioritize making the app and website fully functional over adding more lessons.
- **Small wins**: lessons are short; every lesson produces something tangible.
- **Confidence-building**: friendly tone, clear steps, error recovery.

## MVP scope (what we ship first)
1. **Interactive Engine**: The logic that drives a user through a lesson (step-by-step UI, integrated timers, "Got it" checks).
2. **Persistence Layer**: Local storage for XP, streaks, and unlocked levels.
3. **Skill Tree Navigation**: A visual, gamified map showing progress and locked gates.
4. **Internal Test Loop**: Ability for testers to install via TestFlight/Internal Sharing and complete a full Level 0 flow.
5. **Initial Content (Vertical Slice)**: ONLY Level 0 and Level 1 lessons to test the engine.

## Safety & disclaimers (non-negotiable)
- The app provides **general educational guidance**, not professional culinary training.
- Encourage users to follow local food safety guidance.
- Include prominent disclaimers about the inherent risks of cooking and the importance of adult supervision for minors.
- Users must explicitly agree to these terms before starting any lesson.

## Future Scope (Post-MVP)
- **More Recipes & Skills**: Expand the content library with a wider range of cuisines and techniques.
- **Community Features**: Allow users to share their creations and tips.
- **Personalized Learning Paths**: Adapt lessons based on user performance and preferences.
- **Integration with Smart Kitchen Devices**: (Long-term) Connect with compatible appliances. 

## Local Development & Testing Requirements
1. **Tester Access**: The primary local tester is `pablosr11@gmail.com`.
2. **Local Documentation**: A `LOCAL_TESTING.md` file must be maintained with current instructions for running the app and the marketing landing page on a local machine.
3. **Waitlist Persistence**: The waitlist email collection feature must be functional in the local environment, writing to a local JSON file or simple database.

## Success Metrics
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Lesson Completion Rate
- Streak Retention Rate
- User-reported confidence in cooking skills