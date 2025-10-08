export type ValueHistoryPoint = {
  month: string;
  value: number;
};

export type ConditionScores = {
  [key: string]: number;
};

export type ImprovementIdea = {
  name: string;
  cost: number;
  valueGain: number;
};

export type ComparableHome = {
  address: string;
  price: number;
  sqft: number;
  lat?: number;
  lng?: number;
  beds?: number;
  baths?: number;
  imageUrl?: string;
  source?: "zillow" | "redfin" | "opendoor";
  soldDate?: string;
};

export type NeighborhoodUpdate = {
  id: string;
  neighbor: string;
  avatarUrl: string;
  distance: string;
  headline: string;
  message: string;
  timeAgo: string;
  tags: string[];
};

export type HomeHelper = {
  id: string;
  name: string;
  role: string;
  vendor: string;
  responseTime: string;
  rating: number;
  notes: string;
};

export type HomeServiceEvent = {
  id: string;
  title: string;
  category: "cleaning" | "maintenance" | "inspection" | "insurance" | "project";
  scheduledFor: string;
  helperId?: string;
  status: "scheduled" | "completed" | "action-needed";
  notes: string;
};

export type ServiceBudgetItem = {
  id: string;
  category: string;
  monthlySpend: number;
  change: number;
  upcoming?: number;
  description?: string;
};

export type GalleryImage = {
  url: string;
  alt: string;
};

export type HomeData = {
  address: string;
  currentValue: number;
  valueHistory: ValueHistoryPoint[];
  condition: ConditionScores;
  improvementIdeas: ImprovementIdea[];
  comps: ComparableHome[];
  galleryImages: GalleryImage[];
  neighborhoodUpdates: NeighborhoodUpdate[];
  helperTeam: HomeHelper[];
  serviceSchedule: HomeServiceEvent[];
  serviceBudget: ServiceBudgetItem[];
  location: {
    lat: number;
    lng: number;
  };
  mortgageBalance: number;
  avgDaysOnMarket: number;
  buyerDemandScore: number;
  pricePerSqft: number;
};

export const homeData: HomeData = {
  address: "123 Main St. | Austin, TX",
  currentValue: 645000,
  valueHistory: [
    { month: "Jan", value: 620000 },
    { month: "Feb", value: 625000 },
    { month: "Mar", value: 628500 },
    { month: "Apr", value: 632000 },
    { month: "May", value: 634000 },
    { month: "Jun", value: 636000 },
    { month: "Jul", value: 638000 },
    { month: "Aug", value: 640000 },
    { month: "Sep", value: 642000 },
    { month: "Oct", value: 643000 },
    { month: "Nov", value: 644000 },
    { month: "Dec", value: 645000 },
  ],
  condition: {
    roof: 85,
    flooring: 78,
    kitchen: 65,
    exterior: 82,
    hvac: 72,
  },
  improvementIdeas: [
    { name: "Paint interior", cost: 2000, valueGain: 6000 },
    { name: "Replace flooring", cost: 5000, valueGain: 10000 },
    { name: "Refresh landscaping", cost: 1500, valueGain: 3500 },
  ],
  comps: [
    {
      address: "125 Main St",
      price: 655000,
      sqft: 1900,
      lat: 30.2748,
      lng: -97.7389,
      beds: 3,
      baths: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      source: "zillow",
      soldDate: "2024-08-18",
    },
    {
      address: "119 Main St",
      price: 640000,
      sqft: 1850,
      lat: 30.2729,
      lng: -97.7428,
      beds: 3,
      baths: 2,
      imageUrl:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      source: "redfin",
      soldDate: "2024-07-02",
    },
    {
      address: "135 Elm St",
      price: 660000,
      sqft: 1950,
      lat: 30.2765,
      lng: -97.7451,
      beds: 4,
      baths: 3,
      imageUrl:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      source: "opendoor",
      soldDate: "2024-05-27",
    },
  ],
  galleryImages: [
    {
      url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      alt: "Modern home exterior with manicured lawn",
    },
    {
      url: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      alt: "Bright living room with large windows and neutral palette",
    },
    {
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      alt: "Open kitchen with white cabinetry and island seating",
    },
    {
      url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      alt: "Primary bedroom with layered textiles and natural light",
    },
    {
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      alt: "Backyard with cozy seating area and string lights",
    },
    {
      url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      alt: "Spa-like bathroom with freestanding tub and natural light",
    },
  ],
  neighborhoodUpdates: [
    {
      id: "update-1",
      neighbor: "Priya S.",
      avatarUrl:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      distance: "2 houses north",
      headline: "Block party approval is in!",
      message:
        "Nextdoor thread came back unanimous — Saturday 5pm potluck in front of 129 Main. I can loan folding tables if folks need them!",
      timeAgo: "1h ago",
      tags: ["Community", "Event"],
    },
    {
      id: "update-2",
      neighbor: "Marcus L.",
      avatarUrl:
        "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      distance: "Across the street",
      headline: "Package swipe alert",
      message:
        "Heads-up: porch cam caught someone checking parcels around 9pm last night. Already filed a Nextdoor post with clips — keep an eye out!",
      timeAgo: "3h ago",
      tags: ["Safety"],
    },
    {
      id: "update-3",
      neighbor: "Alicia R.",
      avatarUrl:
        "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      distance: "3 houses south",
      headline: "Free lemon tree cuttings",
      message:
        "Our backyard tree exploded this season — bringing extra cuttings to the block party. DM on Nextdoor if you want me to save you one!",
      timeAgo: "Yesterday",
      tags: ["Freebie", "Garden"],
    },
  ],
  helperTeam: [
    {
      id: "helper-1",
      name: "Elena & Marco",
      role: "Housekeeping Crew",
      vendor: "Sparkwave Cleaning",
      responseTime: "Books within 48h",
      rating: 4.9,
      notes: "Quarterly deep cleans keep staging-ready sheen.",
    },
    {
      id: "helper-2",
      name: "Luis P.",
      role: "Landscaping",
      vendor: "Greenloop Yard",
      responseTime: "Same-week slots",
      rating: 4.8,
      notes: "Handles xeriscape trims and seasonal color.",
    },
    {
      id: "helper-5",
      name: "Southbridge Builders",
      role: "General Contractor",
      vendor: "Southbridge Builders",
      responseTime: "Projects start ~2 weeks",
      rating: 4.6,
      notes: "Trusted for kitchen refresh estimates.",
    },
  ],
  serviceSchedule: [
    {
      id: "svc-0",
      title: "Gutter cleaning and roof check",
      category: "maintenance",
      scheduledFor: "2025-10-22T10:00:00-06:00",
      helperId: "helper-2",
      status: "scheduled",
      notes: "Clear debris before fall rains; verify downspouts and flashing.",
    },
    {
      id: "svc-1",
      title: "Deep clean with Sparkwave",
      category: "cleaning",
      scheduledFor: "2025-11-18T09:00:00-06:00",
      helperId: "helper-1",
      status: "scheduled",
      notes: "Focus on kitchen cabinets and baseboards ahead of holiday hosting.",
    },
    {
      id: "svc-2",
      title: "Winter HVAC tune-up",
      category: "maintenance",
      scheduledFor: "2025-10-05T13:30:00-06:00",
      status: "action-needed",
      notes: "Confirm availability with Southbridge or alternate vendor by Nov 25.",
    },
    {
      id: "svc-3",
      title: "HOI renewal review",
      category: "insurance",
      scheduledFor: "2025-11-10T11:00:00-06:00",
      helperId: "helper-4",
      status: "scheduled",
      notes: "Update replacement cost with latest valuation before renewal.",
    },
    {
      id: "svc-4",
      title: "Front yard refresh",
      category: "project",
      scheduledFor: "2025-10-08T08:00:00-06:00",
      helperId: "helper-2",
      status: "completed",
      notes: "Mulch refresh and lighting timer install. Paid invoice on Feb 9.",
    },
  ],
  serviceBudget: [
    {
      id: "budget-cleaning",
      category: "Housekeeping",
      monthlySpend: 220,
      change: 15,
      upcoming: 240,
      description: "Bi-weekly deep clean and linen refresh",
    },
    {
      id: "budget-landscape",
      category: "Landscaping",
      monthlySpend: 140,
      change: -10,
      upcoming: 140,
      description: "Lawn care, edging, and seasonal planting",
    },
    {
      id: "budget-hvac",
      category: "HVAC Service Plan",
      monthlySpend: 65,
      change: 0,
      upcoming: 65,
      description: "Filter subscription and maintenance coverage",
    },
    {
      id: "budget-insurance",
      category: "Home Insurance",
      monthlySpend: 185,
      change: 0,
      description: "Escrowed premium with bundle discount applied",
    },
    {
      id: "budget-project",
      category: "Project Reserve",
      monthlySpend: 120,
      change: 25,
      upcoming: 150,
      description: "Set aside for fall exterior repaint",
    },
  ],
  location: {
    lat: 30.2736,
    lng: -97.7412,
  },
  mortgageBalance: 382000,
  avgDaysOnMarket: 24,
  buyerDemandScore: 88,
  pricePerSqft: 339,
};
