interface Review { author: string; avatar: string; rating: number; text: string; date: string; }
interface SeedWorker {
  id: number; name: string; skill: string; category: string;
  rating: number; reviews: number; distance: string; price: string;
  avatar: string; coverImg: string; verified: boolean; jobs: number;
  bio: string; portfolio: string[]; reviewsList: Review[]; tags: string[];
}

export const WORKERS: SeedWorker[] = [
  {
    id: 1, name: "Marcus Johnson", skill: "Master Plumber", category: "Plumbing",
    rating: 4.9, reviews: 127, distance: "0.8 km", price: "$45/hr",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
    coverImg: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&h=500&fit=crop&auto=format",
    verified: true, jobs: 243,
    bio: "15 years of experience in residential and commercial plumbing. Specializing in leak repair, pipe installation, and full bathroom fitting.",
    portfolio: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop&auto=format",
    ],
    reviewsList: [
      { author: "Sarah M.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", rating: 5, text: "Fixed our burst pipe in under an hour. Very professional and left the area spotless.", date: "Dec 2024" },
      { author: "Tom K.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop", rating: 5, text: "Solved a problem 3 other plumbers couldn't fix. Highly recommend!", date: "Nov 2024" },
      { author: "Rita O.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", rating: 4, text: "Great job overall. Slightly pricey but 100% worth the quality.", date: "Oct 2024" },
    ],
    tags: ["Leak Repair", "Pipe Install", "Bathroom Fitting"],
  },
  {
    id: 2, name: "David Osei", skill: "Electrician", category: "Electrical",
    rating: 4.8, reviews: 89, distance: "1.2 km", price: "$55/hr",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&auto=format",
    coverImg: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=900&h=500&fit=crop&auto=format",
    verified: true, jobs: 178,
    bio: "Certified electrician with deep expertise in wiring, panel upgrades, and smart home installations. Fully licensed and insured.",
    portfolio: [
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1558980394-dbb977039a2e?w=600&h=400&fit=crop&auto=format",
    ],
    reviewsList: [
      { author: "James P.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", rating: 5, text: "Installed our entire home automation system flawlessly.", date: "Dec 2024" },
      { author: "Angela R.", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop", rating: 5, text: "David is incredibly knowledgeable and efficient.", date: "Nov 2024" },
    ],
    tags: ["Wiring", "Smart Home", "Panel Upgrade"],
  },
  {
    id: 3, name: "James Adeola", skill: "Carpenter", category: "Carpentry",
    rating: 4.7, reviews: 64, distance: "2.1 km", price: "$40/hr",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
    coverImg: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&h=500&fit=crop&auto=format",
    verified: false, jobs: 95,
    bio: "Custom furniture maker and general carpenter. Specializing in kitchen cabinets, fitted wardrobes, and solid wood flooring.",
    portfolio: [
      "https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=600&h=400&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&auto=format",
    ],
    reviewsList: [
      { author: "Mike T.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", rating: 5, text: "Built the most beautiful custom wardrobes. Great craftsmanship!", date: "Dec 2024" },
    ],
    tags: ["Cabinets", "Wardrobes", "Flooring"],
  },
  {
    id: 4, name: "Emmanuel Kalu", skill: "Painter", category: "Painting",
    rating: 4.6, reviews: 52, distance: "0.5 km", price: "$35/hr",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&auto=format",
    coverImg: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=900&h=500&fit=crop&auto=format",
    verified: true, jobs: 112,
    bio: "Professional interior and exterior painter. Expert in decorative finishes, textured walls, and wallpaper installation.",
    portfolio: ["https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=400&fit=crop&auto=format"],
    reviewsList: [
      { author: "Sandra B.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", rating: 5, text: "Completely transformed our living room. Very tidy and professional!", date: "Jan 2025" },
    ],
    tags: ["Interior", "Exterior", "Texture"],
  },
  {
    id: 5, name: "Grace Mensah", skill: "House Cleaner", category: "Cleaning",
    rating: 4.9, reviews: 203, distance: "0.3 km", price: "$30/hr",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&auto=format",
    coverImg: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&h=500&fit=crop&auto=format",
    verified: true, jobs: 389,
    bio: "Professional deep cleaning and regular home maintenance. Eco-friendly products available on request.",
    portfolio: [],
    reviewsList: [
      { author: "Frank O.", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop", rating: 5, text: "Grace is incredible. House looks brand new every visit!", date: "Jan 2025" },
    ],
    tags: ["Deep Clean", "Regular Upkeep", "Eco-friendly"],
  },
  {
    id: 6, name: "Yemi Adeyemi", skill: "AC Technician", category: "Electrical",
    rating: 4.7, reviews: 41, distance: "1.8 km", price: "$50/hr",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&auto=format",
    coverImg: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=900&h=500&fit=crop&auto=format",
    verified: true, jobs: 67,
    bio: "Certified HVAC technician. Specializing in AC installation, servicing, gas refilling, and fault diagnostics.",
    portfolio: [],
    reviewsList: [
      { author: "Bola T.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", rating: 5, text: "Fixed our AC in 45 minutes flat. Very efficient!", date: "Jan 2025" },
    ],
    tags: ["AC Install", "Servicing", "Gas Refill"],
  },
];

export const NOTIFICATIONS = [
  { id: 1, type: "request", title: "Job Accepted!", body: "Marcus Johnson accepted your plumbing request", time: "2m ago", read: false, avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
  { id: 2, type: "message", title: "New Message", body: 'David: "I can be there by 3pm today ✓"', time: "15m ago", read: false, avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop" },
  { id: 3, type: "rating", title: "New 5-Star Review", body: "Tom K. gave you a ⭐⭐⭐⭐⭐ review!", time: "1h ago", read: true, avatarUrl: null },
  { id: 4, type: "report", title: "Report Reviewed", body: "Your complaint #402 has been resolved", time: "3h ago", read: true, avatarUrl: null },
  { id: 5, type: "payment", title: "Payment Processed", body: "$180 transferred to your wallet", time: "Yesterday", read: true, avatarUrl: null },
  { id: 6, type: "request", title: "New Job Request", body: "Sarah M. wants to hire you for pipe repair", time: "Yesterday", read: true, avatarUrl: null },
];

export const CHAT_MESSAGES = [
  { id: 1, sender: "worker" as const, text: "Hello! I saw your request for plumbing repair. Ready to help!", time: "10:20 AM" },
  { id: 2, sender: "customer" as const, text: "Great! How soon can you come?", time: "10:22 AM" },
  { id: 3, sender: "worker" as const, text: "Available today at 3 PM or tomorrow from 9 AM. Which works?", time: "10:23 AM" },
  { id: 4, sender: "customer" as const, text: "Today at 3 PM is perfect! 🙌", time: "10:25 AM" },
  { id: 5, sender: "worker" as const, text: "Perfect. Bringing all tools. Estimate $120–150 depending on parts.", time: "10:26 AM" },
  { id: 6, sender: "customer" as const, text: "Sounds fair. See you at 3!", time: "10:28 AM" },
];
