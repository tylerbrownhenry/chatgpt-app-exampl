/**
 * Product Data
 * Mock product database - replace with real API calls in production
 */

import type { Product } from '../types/index.js';

export const mockProducts: Product[] = [
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
