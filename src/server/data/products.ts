/**
 * Product Data
 * Mock product database - replace with real API calls in production
 */

import type { Product } from '../types/index.js';

export const mockProducts: Product[] = [
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
  },
  {
    id: 2126222399,
    storeId: 1,
    name: "Maker's Mark Golden Hour Barrel Select Bourbon",
    price: 80.99,
    image: "https://qa.totalwine.com/images/2126222399/2126222399-1-fr.png",
    url: "/spirits/bourbon/makers-mark-golden-hour-barrel-select-bourbon/p/2126222399",
    description: "Golden Hour is the latest addition to the Total Wine & More Maker's Private Select Collection",
    rating: 0,
    reviews: 0,
    inStock: false,
    category: "Bourbon",
    brand: "Maker's Mark",
    specs: {
      "Size": "750ml",
      "Alcohol Percentage": "54.85%",
      "Type": "Bourbon"
    },
    brand_info: {
      id: "makers-mark",
      name: "Maker's Mark",
      departmentCode: "c0030"
    },
    categories: [
      {
        id: "000773",
        name: "Bourbon",
        type: "PRODUCT_TYPE"
      },
      {
        id: "001016",
        name: "United States",
        type: "COUNTRY_STATE"
      }
    ],
    customerAverageRating: 0,
    customerReviewsCount: 0,
    images: [
      {
        imageType: "DEFAULT",
        mobileOptimizedUrl: "https://qa.totalwine.com/dynamic/102x,rect/images/2126222399/2126222399-1-fr.png",
        thumbnailUrl: "https://qa.totalwine.com/images/2126222399/2126222399-1-fr.png",
        url: "https://qa.totalwine.com/images/2126222399/2126222399-1-fr.png",
        zoomImageUrl: "https://qa.totalwine.com/images/2126222399/2126222399-1-fr.png",
        isPrimaryImage: true
      }
    ],
    location: "Aisle 07, Left",
    bay: "Bay 06",
    metaDescription: "Shop Maker's Mark Golden Hour Barrel Select Bourbon at the best prices. Explore thousands of wines, spirits and beers, and shop online for delivery or pickup in a store near you.",
    productPageTitle: "Maker's Mark Golden Hour Barrel Select Bourbon | Total Wine & More",
    productUrl: "/spirits/bourbon/makers-mark-golden-hour-barrel-select-bourbon/p/2126222399",
    canonicalUrl: "/spirits/bourbon/makers-mark-golden-hour-barrel-select-bourbon/p/2126222399",
    packageDescription: "750ml",
    priceInfo: [
      {
        price: 80.99,
        type: "EDLP"
      },
      {
        price: 0.1,
        toolTip: "+ Deposit/Recycling fee where required by law",
        type: "CRV"
      }
    ],
    review: "United States - 54.85% - Golden Hour is the latest addition to the Total Wine & More Maker's Private Select Collection. Finished w/ staves hand-selected by Total Wine in KY, it's delivers notes of Madagascar vanilla, shortbread cookie, cardamom sweet tea, maple, caramel, baking spices",
    shoppingOptions: [
      {
        eligible: false,
        location: "Sacramento (Arden)",
        message: [
          "Unavailable for online purchases. Limited quantities may be available in store."
        ],
        type: "INSTORE_PICKUP",
        selected: false
      },
      {
        eligible: false,
        location: "Sacramento (Arden)",
        message: [
          "Out of Stock"
        ],
        type: "DELIVERY",
        selected: true
      },
      {
        eligible: false,
        location: "US-CA",
        message: [
          "This item is not available for shipping to US-CA"
        ],
        type: "SHIPPING",
        selected: false
      }
    ],
    skuId: "2126222399-1",
    stockLevel: [
      {
        stock: 0,
        message: [
          "Out of Stock"
        ]
      }
    ],
    stockMessages: {
      messages: [
        {
          shoppingMethod: "INSTORE_PICKUP",
          stockMessage: "Out of stock",
          addToCartMessage: "Out of stock",
          addToCartStatus: false,
          nearbyStores: true
        },
        {
          shoppingMethod: "DELIVERY",
          stockMessage: "Out of stock",
          addToCartMessage: "Out of stock",
          addToCartStatus: false
        },
        {
          shoppingMethod: "SHIPPING",
          stockMessage: "This item is not available for shipping to US-CA",
          addToCartMessage: "Unavailable",
          addToCartStatus: false
        }
      ],
      digitalTransactional: true,
      digitalInventoryQuantity: 0,
      digitalSpecialOrder: false,
      digitalLongTermOOS: false,
      digitalShortTermOOS: false,
      digitalLimitedStock: true,
      digitalInStock: false,
      digitalStoreQuantity: 0,
      digitalDeliveryEligible: true,
      shippingTransactional: true,
      shippingInventoryQuantity: 0,
      shippingSpecialOrder: false,
      shippingLongTermOOS: false,
      shippingLimitedStock: true,
      shippingInStock: false,
      shippingStoreQuantity: 0
    },
    transactional: false,
    salesStrategy: {
      name: "Premium Selection",
      type: "PS"
    },
    department: "c0030",
    directType: "Premium Selection",
    itemCharacteristics: [
      {
        attributeName: "Product Type",
        value: "Bourbon",
        type: "PRODUCT_TYPE",
        categoryId: "000773"
      },
      {
        attributeName: "Country State",
        value: "United States",
        type: "COUNTRY_STATE",
        categoryId: "001016"
      }
    ],
    skus: [
      {
        skuId: "2126222399-1",
        options: [
          {
            type: "CONTAINER",
            value: "Bottle"
          },
          {
            type: "SIZE",
            value: "750ml"
          },
          {
            type: "PACKAGE",
            value: "Single"
          }
        ],
        url: ""
      }
    ],
    breadCrumbs: [
      {
        name: "Home",
        url: "/"
      },
      {
        name: "Spirits",
        url: "/spirits/c/c0030"
      },
      {
        name: "Bourbon",
        url: "/spirits/bourbon/c/000773"
      },
      {
        name: "Maker's Mark Golden Hour Barrel Select Bourbon"
      }
    ],
    packageValue: "Single",
    alcoholPercentage: 54.85
  }
];
