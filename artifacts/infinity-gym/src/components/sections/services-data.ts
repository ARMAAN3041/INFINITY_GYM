import {
  Dumbbell, Activity, Flame, Heart, Music, UserCheck,
} from "lucide-react";
import type { ElementType } from "react";
import weightsImg from "@assets/generated_images/prog-weights.jpg";
import cardioImg from "@assets/generated_images/prog-cardio.jpg";
import crossfitImg from "@assets/generated_images/prog-crossfit.jpg";
import yogaImg from "@assets/generated_images/prog-yoga.jpg";
import zumbaImg from "@assets/generated_images/prog-zumba.jpg";
import ptImg from "@assets/generated_images/prog-pt.jpg";

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
}

export const ALL_SERVICES: ServiceData[] = [
  {
    id: "weight-training",
    title: "Weight Training",
    tagline: "Build strength. Build muscle. Transform your body.",
    image: weightsImg,
    accent: "gold",
    icon: Dumbbell,
    description:
      "Our Weight Training zone is equipped with the finest barbells, dumbbells, cable machines, and resistance equipment — everything you need to sculpt a powerful physique. Whether your goal is raw strength, muscle hypertrophy, or fat loss, our expert-designed programs take you from where you are to where you want to be.",
    duration: "45–90 min",
    suitableFor: ["Beginners", "Intermediate athletes", "Advanced lifters", "Fat-loss seekers", "Bodybuilders"],
    benefits: [
      { title: "Muscle Building", desc: "Progressive overload protocols proven to maximise hypertrophy and add lean mass." },
      { title: "Fat Loss", desc: "Resistance training elevates metabolism for hours after your session, accelerating fat burning." },
      { title: "Strength Improvement", desc: "Structured strength cycles to push your one-rep max on all major compound lifts." },
      { title: "Bone Density", desc: "Resistance training strengthens bones and reduces the risk of osteoporosis long-term." },
      { title: "Posture & Stability", desc: "Targeted accessory work corrects imbalances and builds a strong, stable core." },
      { title: "Mental Resilience", desc: "Every rep teaches your mind to push past limits — discipline forged in iron." },
    ],
    features: [
      "Free Weights Area", "Barbells & Bumper Plates", "Dumbbells 2–50 kg",
      "Cable & Pulley Machines", "Smith Machine", "Leg Press & Hack Squat",
      "Preacher Curl Bench", "Power Racks", "Resistance Bands", "Personal Lockers",
    ],
    programs: [
      { level: "Beginner", desc: "Full-body 3-day splits focusing on form, compound movements, and building a solid foundation over 8 weeks." },
      { level: "Intermediate", desc: "Upper/lower or PPL 4–5 day splits with periodisation, progressive overload, and accessory hypertrophy work." },
      { level: "Advanced", desc: "Athlete-level programming including strength cycles, peak weeks, and competition-style preparation." },
    ],
  },
  {
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
  },
  {
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
  },
  {
    id: "yoga-core",
    title: "Yoga & Core",
    tagline: "Move with intention. Breathe with purpose.",
    image: yogaImg,
    accent: "purple",
    icon: Heart,
    description:
      "Our Yoga & Core studio is a dedicated sanctuary away from the weights floor — a calm, spacious environment for mindful movement and deep recovery. Led by certified instructors, sessions blend traditional yoga postures with modern core-strengthening techniques.",
    duration: "45–75 min",
    suitableFor: ["Complete beginners", "All ages", "Desk workers", "Athletes seeking recovery", "Stress & anxiety management"],
    benefits: [
      { title: "Flexibility", desc: "Progressive stretching lengthens tight muscles and significantly expands your range of motion." },
      { title: "Core Strength", desc: "Targeted Pilates-inspired movements build deep stabiliser muscles that protect your spine." },
      { title: "Stress Reduction", desc: "Breathwork and mindfulness techniques activate the parasympathetic nervous system, reducing cortisol." },
      { title: "Balance & Coordination", desc: "Single-leg holds and proprioceptive drills sharpen your neuromuscular balance." },
      { title: "Injury Prevention", desc: "Increased mobility and body awareness dramatically reduce injury risk across all activities." },
      { title: "Better Posture", desc: "Strengthening the posterior chain and stretching pec/hip flexors restores natural alignment." },
    ],
    features: [
      "Yoga Mats & Blocks", "Resistance Bands", "Foam Rollers",
      "Quiet Dedicated Studio", "Qualified Yoga Instructors", "Hatha Yoga",
      "Vinyasa Flow", "Power Yoga", "Breathing Techniques", "Meditation Guidance",
    ],
    programs: [
      { level: "Beginner", desc: "Gentle introductory sessions focused on foundational postures, breathing and safe alignment. No experience needed." },
      { level: "Intermediate", desc: "Dynamic flows linking postures with breath, building strength, flexibility and mental presence." },
      { level: "Advanced / Power Yoga", desc: "Challenging sequences including inversions, arm balances and deeper backbends for experienced practitioners." },
    ],
  },
  {
    id: "zumba",
    title: "Zumba",
    tagline: "Dance. Sweat. Repeat.",
    image: zumbaImg,
    accent: "gold",
    icon: Music,
    description:
      "Zumba at Infinity Fitness turns exercise into a celebration. Led by our high-energy certified instructors, these group dance classes fuse Latin and international music rhythms with easy-to-follow cardio choreography. You'll burn serious calories and have so much fun you'll forget you're working out.",
    duration: "45–60 min",
    suitableFor: ["Complete beginners", "All ages", "Women & men", "Group class fans", "Anyone who loves music"],
    benefits: [
      { title: "Calorie Burn", desc: "A single Zumba class burns 400–600 calories through continuous full-body movement." },
      { title: "Weight Management", desc: "Regular classes create a consistent caloric deficit to support sustainable fat loss." },
      { title: "Improved Stamina", desc: "The non-stop cardio format progressively builds aerobic endurance." },
      { title: "Coordination & Rhythm", desc: "Dance-based movement patterns sharpen your coordination, timing and body awareness." },
      { title: "Mood Boost", desc: "Music + movement releases dopamine and serotonin — it's the most fun you'll have at the gym." },
      { title: "Social & Inclusive", desc: "Group classes build community, accountability and lasting gym friendships." },
    ],
    features: [
      "Certified Zumba Instructors", "Morning & Evening Batches", "Latin Dance Rhythms",
      "Merengue & Salsa", "Cumbia & Reggaeton", "Bhangra Fusion",
      "Group Studio Sessions", "Beginners Welcome", "Fun Atmosphere", "All Fitness Levels",
    ],
  },
  {
    id: "personal-training",
    title: "Personal Training",
    tagline: "Your goal. Your plan. Your transformation.",
    image: ptImg,
    accent: "purple",
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
  },
];
