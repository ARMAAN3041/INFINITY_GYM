import {
  Activity, Flame, Heart, UserCheck, Zap,
} from "lucide-react";
import type { ElementType } from "react";
import cardioImg from "@assets/generated_images/prog-cardio.jpg";
import crossfitImg from "@assets/generated_images/prog-crossfit.jpg";
import yogaImg from "@assets/generated_images/prog-yoga.jpg";
import ptImg from "@assets/generated_images/prog-pt.jpg";

export interface ScheduleSlot {
  time: string;
  sub?: string;
  tag?: string;
}

export interface ServiceData {
  id: string;
  title: string;
  tagline: string;
  image: string;
  accent: "gold" | "purple" | "lime";
  icon: ElementType;
  description: string;
  duration: string;
  suitableFor: string[];
  benefits: { title: string; desc: string }[];
  features: string[];
  programs?: { level: string; desc: string }[];
  schedule?: {
    slots: ScheduleSlot[];
    days: { name: string; classes: string[] }[];
  };
}

const cardio: ServiceData = {
  id: "cardio-zone",
  title: "Cardio Zone",
  tagline: "Train your heart. Burn the fat. Go the distance.",
  image: cardioImg,
  accent: "purple",
  icon: Activity,
  description:
    "Our state-of-the-art Cardio Zone houses the latest commercial-grade cardiovascular equipment. From steady-state endurance sessions to explosive HIIT intervals, every machine is designed to maximise calorie burn, improve heart health, and boost your overall stamina.",
  duration: "20–60 min",
  suitableFor: ["Beginners", "Weight-loss goals", "Heart health focus", "Endurance athletes", "Post-workout cool-down"],
  benefits: [
    { title: "Heart Health", desc: "Regular cardio strengthens the heart muscle, lowers blood pressure and reduces risk of cardiovascular disease." },
    { title: "Endurance", desc: "Build your VO₂ max and sustain higher intensities for longer over time." },
    { title: "Weight Loss", desc: "Burn 400–800 calories per session with optimised fat-burning zones." },
    { title: "Mood & Energy", desc: "Cardio releases endorphins, reduces cortisol and boosts daily energy levels." },
    { title: "Lung Capacity", desc: "Consistent training expands lung capacity and improves oxygen efficiency." },
    { title: "Better Sleep", desc: "Regular aerobic exercise has been shown to significantly improve sleep quality." },
  ],
  features: [
    "Treadmills", "Cross Trainers / Ellipticals", "Exercise Bikes",
    "Rowing Machines", "Stair Climbers", "Air Bikes",
    "HIIT Cardio Programs", "Heart-Rate Monitors", "HD Entertainment Screens", "Cooling Fan System",
  ],
  programs: [
    { level: "Steady State", desc: "Low to moderate intensity sessions (60–70% max HR) for fat burning, active recovery, and heart health." },
    { level: "HIIT", desc: "20–30 min alternating high-effort bursts (85–95% HR) with active rest — maximum calorie burn in minimum time." },
    { level: "Endurance", desc: "Long-form progressive sessions building aerobic base for runners, cyclists and sport athletes." },
  ],
};

const crossfit: ServiceData = {
  id: "crossfit",
  title: "CrossFit",
  tagline: "Functional. Intense. Unstoppable.",
  image: crossfitImg,
  accent: "gold",
  icon: Flame,
  description:
    "CrossFit at Infinity Fitness is a high-intensity, results-driven training methodology combining Olympic lifting, gymnastics, and metabolic conditioning. Every WOD is constantly varied so your body never adapts and your results never plateau. Train alongside a fiercely motivated community.",
  duration: "45–60 min",
  suitableFor: ["All fitness levels", "Group training lovers", "Competitive athletes", "Those seeking full-body fitness", "Sports enthusiasts"],
  benefits: [
    { title: "Full-Body Conditioning", desc: "Every session targets multiple muscle groups, energy systems and movement patterns simultaneously." },
    { title: "Agility & Coordination", desc: "Functional movements mirror real-life actions, improving athletic performance in every area." },
    { title: "Community & Accountability", desc: "Train in energetic group sessions that keep motivation sky-high every day." },
    { title: "Scalable for Everyone", desc: "All movements are scaled to your current ability — beginners and athletes train side by side." },
    { title: "Strength + Cardio Combined", desc: "Build muscle, burn fat and improve cardiovascular fitness all in a single session." },
    { title: "Mental Toughness", desc: "WODs are designed to be uncomfortable — and finishing them builds unshakeable mental resilience." },
  ],
  features: [
    "Olympic Barbells & Bumper Plates", "Rig & Pull-Up Station", "Kettlebells",
    "Battle Ropes", "Box Jumps & Plyo Boxes", "Rowing Machines",
    "Jump Ropes", "Wall Balls", "Daily WODs", "Group & Open Sessions",
  ],
  programs: [
    { level: "On-Ramp (Beginner)", desc: "A 3-week foundation course covering all key movements with full coaching — before you join the main class floor." },
    { level: "Main Class", desc: "Daily WODs including strength work, metcons, Olympic lifting and gymnastics — fully coached and scalable." },
    { level: "Advanced / Competitors", desc: "Programming designed for CrossFit Open competitors, focusing on peak performance and skill refinement." },
  ],
  schedule: {
    slots: [
      { time: "5:30 – 6:30 AM", sub: "7:00 – 8:00 AM" },
      { time: "12:00 – 1:00 PM", tag: "Only Girls" },
      { time: "5:00 – 6:00 PM", sub: "7:00 – 8:00 PM" },
    ],
    days: [
      { name: "Tuesday", classes: ["Cross Fit", "Cross Fit", "Cross Fit"] },
      { name: "Friday",  classes: ["Cross Fit", "Cross Fit", "Cross Fit"] },
    ],
  },
};

const yoga: ServiceData = {
  id: "yoga-zumba",
  title: "Yoga & Zumba",
  tagline: "Move with intention. Dance with joy.",
  image: yogaImg,
  accent: "purple",
  icon: Heart,
  description:
    "Our Yoga & Zumba studio blends two powerful disciplines under one roof. Yoga sessions bring calm, flexibility and deep core strength through certified instructors, while Zumba turns cardio into a celebration with high-energy Latin dance rhythms. Together they cover body, mind and soul — all fitness levels welcome.",
  duration: "45–75 min",
  suitableFor: ["Complete beginners", "All ages", "Women & men", "Stress & anxiety management", "Anyone who loves music & movement"],
  benefits: [
    { title: "Flexibility", desc: "Yoga's progressive stretching lengthens tight muscles and significantly expands your range of motion." },
    { title: "Calorie Burn", desc: "Zumba burns 400–600 calories per class through continuous full-body dance movement." },
    { title: "Stress Reduction", desc: "Yoga breathwork activates the parasympathetic nervous system, reducing cortisol and anxiety." },
    { title: "Core Strength", desc: "Targeted Pilates-inspired yoga movements build deep stabiliser muscles that protect your spine." },
    { title: "Coordination & Rhythm", desc: "Zumba's dance patterns sharpen your coordination, timing and body awareness." },
    { title: "Mood Boost", desc: "Music, movement and community release dopamine and serotonin — it's the most fun you'll have at the gym." },
  ],
  features: [
    "Yoga Mats & Blocks", "Foam Rollers", "Quiet Dedicated Studio",
    "Qualified Yoga Instructors", "Hatha & Vinyasa Yoga", "Power Yoga",
    "Certified Zumba Instructors", "Latin Dance Rhythms", "Bhangra Fusion",
    "Beginners Welcome", "Morning & Evening Batches",
  ],
  programs: [
    { level: "Yoga – Beginner", desc: "Gentle introductory sessions focused on foundational postures, breathing and safe alignment. No experience needed." },
    { level: "Yoga – Intermediate / Advanced", desc: "Dynamic flows, inversions and arm balances for those progressing beyond the basics." },
    { level: "Zumba – All Levels", desc: "High-energy dance cardio sessions with easy-to-follow choreography — from first-timers to regulars." },
  ],
};

const personalTraining: ServiceData = {
  id: "personal-training",
  title: "Personal Training",
  tagline: "Your goal. Your plan. Your transformation.",
  image: ptImg,
  accent: "lime",
  icon: UserCheck,
  description:
    "Personal Training at Infinity Fitness is the fastest route to your fitness goals. Our certified trainers work exclusively with you — designing a completely bespoke program based on your body, lifestyle, goals and schedule. From your first assessment to your final transformation, every session is engineered to get results.",
  duration: "50–60 min",
  suitableFor: ["Body transformation goals", "Beginners needing guidance", "Post-injury recovery", "Sports-specific training", "Busy professionals"],
  benefits: [
    { title: "Customised Programs", desc: "No generic plans — your workout is built specifically around your body composition, goals and limitations." },
    { title: "Faster Results", desc: "1-to-1 coaching eliminates wasted effort — every session is optimised for maximum progress." },
    { title: "Nutrition Guidance", desc: "Practical, sustainable dietary advice aligned with your training to accelerate transformation." },
    { title: "Progress Tracking", desc: "Regular measurements, body composition checks and performance tests keep you accountable." },
    { title: "Injury Prevention", desc: "Expert form coaching from day one eliminates the technique errors that cause injuries." },
    { title: "Flexible Scheduling", desc: "Train at a time that suits your lifestyle — early morning, lunch or evening slots available." },
  ],
  features: [
    "Initial Fitness Assessment", "Goal-Setting Consultation", "Personalised Workout Plan",
    "Nutrition & Diet Guidance", "Weekly Progress Check-ins", "Body Composition Tracking",
    "Form & Technique Coaching", "Lifestyle & Recovery Advice", "Flexible Timings", "WhatsApp Support",
  ],
  programs: [
    { level: "Starter Pack (1 Month)", desc: "12 sessions — full assessment, custom program, nutrition guidelines and weekly check-ins. Perfect first step." },
    { level: "Transformation (3 Months)", desc: "36 sessions — complete body transformation program with monthly reassessments, diet plans and milestone tracking." },
    { level: "Elite (6 Months)", desc: "Comprehensive long-term transformation with competition prep, advanced programming and priority trainer access." },
  ],
};

const aerobics: ServiceData = {
  id: "aerobics",
  title: "Aerobics",
  tagline: "Move. Breathe. Transform.",
  image: cardioImg,
  accent: "purple",
  icon: Zap,
  description:
    "Aerobics at Infinity Gym Kaithal is a high-energy group fitness class that combines rhythmic cardio movements with stretching and strength exercises. Designed for all fitness levels, our aerobics sessions boost cardiovascular health, burn fat, and improve your overall endurance — all set to motivating music in a group atmosphere that keeps you coming back.",
  duration: "45–60 min",
  suitableFor: ["Beginners", "Women & men of all ages", "Weight-loss seekers", "Group fitness lovers", "Anyone wanting to stay active"],
  benefits: [
    { title: "Fat Burning", desc: "Continuous rhythmic movement keeps heart rate elevated, burning 400–600 calories per session." },
    { title: "Heart Health", desc: "Regular aerobics strengthens the cardiovascular system and improves overall heart function." },
    { title: "Improved Stamina", desc: "Progressive sessions build aerobic endurance so daily activities feel easier over time." },
    { title: "Full-Body Toning", desc: "Aerobics engages multiple muscle groups simultaneously, toning arms, core, legs and glutes." },
    { title: "Stress Relief", desc: "The combination of music, movement and community releases endorphins and reduces daily stress." },
    { title: "Better Coordination", desc: "Choreographed movements sharpen balance, rhythm and neuromuscular coordination." },
  ],
  features: [
    "Certified Aerobics Instructors", "Morning & Evening Batches", "Group Studio Sessions",
    "Girls-Only Afternoon Batch (12 PM)", "Energetic Music", "Warm-Up & Cool-Down",
    "Stretching Included", "Beginners Welcome", "All Fitness Levels", "Fun Atmosphere",
  ],
  programs: [
    { level: "Beginner", desc: "Low-impact aerobics focusing on basic movements, coordination and building stamina safely over 4 weeks." },
    { level: "Intermediate", desc: "Mixed-intensity sessions with step aerobics, dance cardio and core work for consistent fat burning." },
    { level: "Advanced / High-Impact", desc: "Full high-impact routines, plyometrics and interval-based aerobics for maximum calorie burn and conditioning." },
  ],
  schedule: {
    slots: [
      { time: "5:30 – 6:30 AM", sub: "7:00 – 8:00 AM" },
      { time: "12:00 – 1:00 PM", tag: "Only Girls" },
      { time: "5:00 – 6:00 PM", sub: "7:00 – 8:00 PM" },
    ],
    days: [
      { name: "Monday",    classes: ["Aerobics", "Aerobics", "Aerobics"] },
      { name: "Wednesday", classes: ["Aerobics", "Aerobics", "Aerobics"] },
      { name: "Thursday",  classes: ["Aerobics", "Aerobics", "Aerobics"] },
      { name: "Saturday",  classes: ["Aerobics", "Aerobics", "Aerobics"] },
    ],
  },
};

// Exported order: Cardio → CrossFit → Yoga & Zumba → Personal Training → Aerobics
export const ALL_SERVICES: ServiceData[] = [cardio, crossfit, yoga, personalTraining, aerobics];
