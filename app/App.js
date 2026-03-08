import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Animated,
    Dimensions,
    ScrollView,
    StatusBar
} from 'react-native';
import { ChefHat, Flame, ShieldCheck, ChevronRight, CheckCircle2, Timer, Play } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// --- MOCK DATA (to ensure it works NOW) ---
const LESSONS = [
    { id: 'safety', title: 'Kitchen Safety 101', icon: 'ShieldCheck', color: '#10b981' },
    { id: 'boil_water', title: 'The Art of Boiling', icon: 'Flame', color: '#3b82f6' },
    { id: 'knife_skills', title: 'Mastering the Blade', icon: 'ChefHat', color: '#f59e0b' },
];

export default function App() {
    const [currentScreen, setCurrentScreen] = useState('welcome');
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [stepIndex, setStepIndex] = useState(0);
    const fadeAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [currentScreen]);

    const WelcomeScreen = () => (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.welcomeInner, { opacity: fadeAnim }]}>
                <ChefHat size={80} color="#f59e0b" />
                <Text style={styles.title}>ChefAtHome</Text>
                <Text style={styles.subtitle}>Master the kitchen, one skill at a time.</Text>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => setCurrentScreen('map')}
                >
                    <Text style={styles.primaryButtonText}>Get Cooking</Text>
                    <ChevronRight color="white" size={20} />
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );

    const MapScreen = () => (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Path</Text>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressText}>Level 1: Novice</Text>
                    </View>
                </View>

                {LESSONS.map((lesson, index) => (
                    <View key={lesson.id} style={styles.lessonRow}>
                        {index > 0 && <View style={styles.connector} />}
                        <TouchableOpacity
                            style={[styles.lessonNode, { backgroundColor: lesson.color }]}
                            onPress={() => {
                                setSelectedLesson(lesson);
                                setCurrentScreen('player');
                            }}
                        >
                            <Text style={styles.lessonLabel}>{lesson.title}</Text>
                            <Play color="white" fill="white" size={16} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );

    const LessonPlayer = () => {
        const steps = [
            "Welcome to ChefAtHome! Let's start with the basics.",
            "Safety First: Always keep your workspace clear.",
            "Check your tools: You'll need a pot and water.",
            "Ready? Let's turn on the heat!"
        ];

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.playerHeader}>
                    <TouchableOpacity onPress={() => setCurrentScreen('map')}>
                        <Text style={styles.backButton}>Exit</Text>
                    </TouchableOpacity>
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: `${((stepIndex + 1) / steps.length) * 100}%` }]} />
                    </View>
                </View>

                <View style={styles.stepContainer}>
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <Text style={styles.stepText}>{steps[stepIndex]}</Text>
                    </Animated.View>
                </View>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {
                        if (stepIndex < steps.length - 1) {
                            setStepIndex(stepIndex + 1);
                        } else {
                            setCurrentScreen('map');
                            setStepIndex(0);
                        }
                    }}
                >
                    <Text style={styles.nextButtonText}>
                        {stepIndex < steps.length - 1 ? 'Continue' : 'Finish'}
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
            <StatusBar barStyle="dark-content" />
            {currentScreen === 'welcome' && <WelcomeScreen />}
            {currentScreen === 'map' && <MapScreen />}
            {currentScreen === 'player' && <LessonPlayer />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    welcomeInner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 42,
        fontWeight: '900',
        color: '#1f2937',
        marginTop: 20,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 18,
        color: '#6b7280',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 40,
    },
    primaryButton: {
        backgroundColor: '#3b82f6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 100,
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginRight: 10,
    },
    scrollContainer: {
        padding: 20,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        marginBottom: 40,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
    },
    progressHeader: {
        backgroundColor: '#f3f4f6',
        padding: 8,
        borderRadius: 8,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    progressText: {
        color: '#4b5563',
        fontWeight: '600',
    },
    lessonRow: {
        alignItems: 'center',
        width: '100%',
    },
    connector: {
        width: 4,
        height: 40,
        backgroundColor: '#e5e7eb',
    },
    lessonNode: {
        padding: 20,
        borderRadius: 100,
        width: width * 0.7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    lessonLabel: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    playerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    backButton: {
        fontSize: 16,
        color: '#ef4444',
        fontWeight: '700',
        marginRight: 15,
    },
    progressBarBg: {
        flex: 1,
        height: 12,
        backgroundColor: '#f3f4f6',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#10b981',
    },
    stepContainer: {
        flex: 1,
        padding: 40,
        justifyContent: 'center',
    },
    stepText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1f2937',
        textAlign: 'center',
        lineHeight: 36,
    },
    nextButton: {
        backgroundColor: '#3b82f6',
        margin: 20,
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
    },
    nextButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',
    }
});
