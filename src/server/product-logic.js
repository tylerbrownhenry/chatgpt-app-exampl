/**
 * Product and Store Logic Module
 * Contains all business logic functions that can be tested independently
 */

// Mock product database - replace with real API calls
export const mockProducts = [
  {
    id: 1,
    storeId: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    url: "https://example.com/products/headphones",
    description: "High-quality wireless headphones with noise cancellation",
    rating: 4.5,
    reviews: 1243,
    inStock: true,
    category: "Audio",
    brand: "AudioTech",
    specs: {
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Noise Cancellation": "Active",
      "Weight": "250g"
    }
  },
  {
    id: 2,
    storeId: 2,
    name: "Smart Watch Pro",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    url: "https://example.com/products/smartwatch",
    description: "Feature-rich smartwatch with health tracking",
    rating: 4.7,
    reviews: 856,
    inStock: true,
    category: "Wearables",
    brand: "TechWear",
    specs: {
      "Display": "1.4\" AMOLED",
      "Battery Life": "7 days",
      "Water Resistance": "5ATM",
      "Sensors": "Heart rate, SpO2, GPS"
    }
  },
  {
    id: 3,
    storeId: 1,
    name: "Laptop Stand Aluminum",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    url: "https://example.com/products/laptop-stand",
    description: "Ergonomic aluminum laptop stand",
    rating: 4.6,
    reviews: 432,
    inStock: true,
    category: "Accessories",
    brand: "ErgoDesk",
    specs: {
      "Material": "Aluminum alloy",
      "Compatibility": "11-17 inch laptops",
      "Adjustable Height": "Yes",
      "Weight Capacity": "5kg"
    }
  },
  {
    id: 4,
    storeId: 3,
    name: "Mechanical Keyboard RGB",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
    url: "https://example.com/products/keyboard",
    description: "RGB mechanical gaming keyboard",
    rating: 4.8,
    reviews: 2145,
    inStock: true,
    category: "Peripherals",
    brand: "GameKeys",
    specs: {
      "Switch Type": "Cherry MX Red",
      "Backlighting": "RGB per-key",
      "Connectivity": "USB-C",
      "Layout": "Full-size (104 keys)"
    }
  },
  {
    id: 5,
    storeId: 2,
    name: "4K Webcam",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1593376893114-1aed528d80cf?w=400",
    url: "https://example.com/products/webcam",
    description: "Professional 4K webcam for streaming",
    rating: 4.4,
    reviews: 678,
    inStock: false,
    category: "Cameras",
    brand: "StreamPro",
    specs: {
      "Resolution": "4K @ 30fps",
      "Field of View": "90 degrees",
      "Autofocus": "Yes",
      "Microphone": "Dual stereo"
    }
  },
  {
    id: 6,
    storeId: 1,
    name: "USB-C Hub Adapter",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400",
    url: "https://example.com/products/usb-hub",
    description: "Multi-port USB-C hub with HDMI",
    rating: 4.3,
    reviews: 523,
    inStock: true,
    category: "Accessories",
    brand: "ConnectPlus",
    specs: {
      "Ports": "3x USB-A, 1x HDMI, 1x USB-C PD",
      "Max Resolution": "4K @ 60Hz",
      "Power Delivery": "100W",
      "Cable Length": "15cm"
    }
  },
  {
    id: 7,
    storeId: 3,
    name: "Wireless Mouse",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
    url: "https://example.com/products/mouse",
    description: "Ergonomic wireless mouse",
    rating: 4.5,
    reviews: 912,
    inStock: true,
    category: "Peripherals",
    brand: "ErgoClick",
    specs: {
      "DPI": "800-3200",
      "Connectivity": "2.4GHz wireless",
      "Battery Life": "18 months",
      "Buttons": "6 programmable"
    }
  },
  {
    id: 8,
    storeId: 2,
    name: "Phone Stand Wireless Charger",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1591290619762-d2c9f9b5b5d3?w=400",
    url: "https://example.com/products/phone-charger",
    description: "2-in-1 phone stand with wireless charging",
    rating: 4.6,
    reviews: 345,
    inStock: true,
    category: "Accessories",
    brand: "ChargeFast",
    specs: {
      "Charging Power": "15W fast charge",
      "Compatibility": "Qi-enabled devices",
      "Viewing Angle": "Adjustable",
      "Safety": "Overcharge protection"
    }
  }
];

// Mock store database
export const mockStores = [
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

/**
 * Search products based on query
 * @param {string} query - Search query
 * @returns {Array} Array of matching products
 */
export function searchProducts(query) {
  const lowerQuery = query.toLowerCase();
  const results = mockProducts.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  );

  return results.length > 0 ? results : mockProducts.slice(0, 6);
}

/**
 * Search stores based on query
 * @param {string} query - Search query
 * @returns {Array} Array of matching stores
 */
export function searchStores(query) {
  if (!query) {
    return mockStores;
  }

  const lowerQuery = query.toLowerCase();
  const results = mockStores.filter(store =>
    store.name.toLowerCase().includes(lowerQuery) ||
    store.description.toLowerCase().includes(lowerQuery) ||
    store.categories.some(cat => cat.toLowerCase().includes(lowerQuery))
  );

  return results.length > 0 ? results : mockStores;
}

/**
 * Get product details by ID
 * @param {number|string} productId - Product ID
 * @returns {Object} Object containing product and store information
 * @throws {Error} If product not found
 */
export function getProductDetail(productId) {
  const product = mockProducts.find(p => p.id === parseInt(productId));
  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }

  // Get the store information
  const store = mockStores.find(s => s.id === product.storeId);

  return { product, store };
}

/**
 * Get store details by ID
 * @param {number|string} storeId - Store ID
 * @returns {Object} Object containing store and products information
 * @throws {Error} If store not found
 */
export function getStoreDetails(storeId) {
  const store = mockStores.find(s => s.id === parseInt(storeId));
  if (!store) {
    throw new Error(`Store with ID ${storeId} not found`);
  }

  // Get products from this store
  const storeProducts = mockProducts.filter(p => p.storeId === store.id);

  return { store, products: storeProducts };
}
