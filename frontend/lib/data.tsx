export const BLUE = "#1558B0";
export const GREEN = "#16A34A";

export const CATEGORIES = [
  { name: "Plumbing", color: "#2563EB", bg: "#EFF6FF", cat: "Plumbing" },
  { name: "Electrical", color: "#D97706", bg: "#FFFBEB", cat: "Electrical" },
  { name: "Carpentry", color: "#7C3AED", bg: "#F5F3FF", cat: "Carpentry" },
  { name: "Painting", color: "#DB2777", bg: "#FDF2F8", cat: "Painting" },
  { name: "Cleaning", color: "#059669", bg: "#ECFDF5", cat: "Cleaning" },
  { name: "Tiling", color: "#0891B2", bg: "#ECFEFF", cat: "Tiling" },
  { name: "Roofing", color: "#DC2626", bg: "#FEF2F2", cat: "Roofing" },
  { name: "More", color: "#6B7280", bg: "#F9FAFB", cat: "" },
];

export const ALL_ROUTES: { label: string; href: string; emoji: string }[] = [
  { label: "Landing Page", href: "/", emoji: "🚀" },
  { label: "Onboarding", href: "/onboarding", emoji: "📖" },
  { label: "Sign Up / Login", href: "/signup", emoji: "🔐" },
  { label: "Customer Home", href: "/dashboard", emoji: "🏠" },
  { label: "Search Results", href: "/search", emoji: "🔍" },
  { label: "Worker Profile", href: "/worker/1", emoji: "👷" },
  { label: "Worker Dashboard", href: "/worker-dashboard", emoji: "📊" },
  { label: "Upload Work", href: "/upload-work", emoji: "📤" },
  { label: "Job Report", href: "/report", emoji: "⚠️" },
  { label: "Notifications", href: "/notifications", emoji: "🔔" },
  { label: "Messages", href: "/chats/1", emoji: "💬" },
];
