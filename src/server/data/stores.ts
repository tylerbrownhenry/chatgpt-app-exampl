/**
 * Store Data
 * Mock store database - replace with real API calls in production
 */

import type { Store } from '../types/index.js';

export const mockStores: Store[] = [
  {
    id: 1,
    name: "Tech Haven Electronics",
    logo: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=200",
    url: "https://example.com/stores/tech-haven",
    description: "Your one-stop shop for premium electronics and accessories",
    rating: 4.6,
    reviews: 3421,
    location: "123 Tech Street, Silicon Valley, CA",
    phone: "+1 (555) 123-4567",
    email: "contact@techhaven.com",
    hours: "Mon-Sat: 9AM-9PM, Sun: 10AM-6PM",
    categories: ["Audio", "Accessories", "Computers"],
    shippingInfo: "Free shipping on orders over $50",
    returnPolicy: "30-day return policy"
  },
  {
    id: 2,
    name: "Smart Gadgets Pro",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200",
    url: "https://example.com/stores/smart-gadgets",
    description: "Premium smart devices and wearables",
    rating: 4.8,
    reviews: 2156,
    location: "456 Innovation Ave, Austin, TX",
    phone: "+1 (555) 987-6543",
    email: "support@smartgadgets.com",
    hours: "Mon-Fri: 10AM-8PM, Sat-Sun: 11AM-7PM",
    categories: ["Wearables", "Smart Home", "Cameras"],
    shippingInfo: "Same-day delivery available in metro area",
    returnPolicy: "45-day return policy with warranty"
  },
  {
    id: 3,
    name: "Gaming Central",
    logo: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200",
    url: "https://example.com/stores/gaming-central",
    description: "Professional gaming gear and peripherals",
    rating: 4.7,
    reviews: 4532,
    location: "789 Gamer Road, Seattle, WA",
    phone: "+1 (555) 456-7890",
    email: "info@gamingcentral.com",
    hours: "Mon-Thu: 11AM-10PM, Fri-Sat: 11AM-11PM, Sun: 12PM-8PM",
    categories: ["Peripherals", "Gaming Chairs", "Monitors"],
    shippingInfo: "Express shipping available",
    returnPolicy: "60-day return policy for members"
  }
];
