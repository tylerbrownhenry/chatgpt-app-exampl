/**
 * Store Data
 * Mock store database - replace with real API calls in production
 */

import type { Store } from '../types/index.js';

export const mockStores: Store[] = [
  {
    address1: "Beltway",
    address2: "8727 Loch Raven Blvd",
    beerTastingHours: {
      hasHours: false,
      showHours: false
    },
    city: "Towson",
    displayMessage: false,
    displaySpecialInstructions: true,
    genericHeader: {},
    displayWeeklyAd: false,
    distance: 1169.32,
    formattedDistance: "1169.32 Mi",
    latitude: 39.39908,
    longitude: -76.56354,
    growler: false,
    humidor: true,
    classroom: false,
    marketingStatus: "ACTIVE",
    mapImage: "https://qa.totalwine.com/",
    name: "Towson (Beltway)",
    phone: "410-668-8884",
    phoneFormatted: "(410) 668-8884",
    title: "Liquor Store, Wine Store - Towson, MD | Total Wine & More|Total Wine & More",
    twmMetaDescription: "Shop wines, spirits and beers at the best prices, selection and service. Buy online for home delivery or pick up in our store near you in Towson, MD. (410) 668-8884",
    regulatoryStore: false,
    customerServicePhone: "800-949-9892",
    customerServicePhoneFormatted: "(800) 949-9892",
    spiritsHours: {
      hasHours: false,
      showHours: false
    },
    spiritsTastingHours: {
      hasHours: true,
      showHours: true,
      days: [
        {
          closedStatus: true,
          closingTime: "12:00 AM",
          dayOfWeek: "MONDAY",
          openingTime: "12:00 AM"
        },
        {
          closedStatus: true,
          closingTime: "12:00 AM",
          dayOfWeek: "TUESDAY",
          openingTime: "12:00 AM"
        },
        {
          closedStatus: true,
          closingTime: "12:00 AM",
          dayOfWeek: "WEDNESDAY",
          openingTime: "12:00 AM"
        },
        {
          closedStatus: true,
          closingTime: "12:00 AM",
          dayOfWeek: "THURSDAY",
          openingTime: "12:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "8:00 PM",
          dayOfWeek: "FRIDAY",
          openingTime: "12:00 PM"
        },
        {
          closedStatus: false,
          closingTime: "8:00 PM",
          dayOfWeek: "SATURDAY",
          openingTime: "12:00 PM"
        },
        {
          closedStatus: true,
          closingTime: "12:00 AM",
          dayOfWeek: "SUNDAY",
          openingTime: "12:00 AM"
        }
      ]
    },
    state: "Maryland",
    stateShort: "MD",
    stateIsoCode: "US-MD",
    storeHours: {
      hasHours: true,
      showHours: true,
      days: [
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "MONDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "TUESDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "WEDNESDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "THURSDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "11:00 PM",
          dayOfWeek: "FRIDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "11:00 PM",
          dayOfWeek: "SATURDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: true,
          closingTime: "12:00 AM",
          dayOfWeek: "SUNDAY",
          openingTime: "12:00 AM"
        }
      ]
    },
    nextWeekStoreHours: {
      hasHours: true,
      showHours: true,
      days: [
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "MONDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "TUESDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "WEDNESDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "THURSDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "11:00 PM",
          dayOfWeek: "FRIDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "11:00 PM",
          dayOfWeek: "SATURDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: true,
          closingTime: "12:00 AM",
          dayOfWeek: "SUNDAY",
          openingTime: "12:00 AM"
        }
      ]
    },
    storeImages: [
      {
        altText: "Towson (Beltway) Storefront",
        imageType: "DEFAULT",
        format: "DEFAULT",
        url: "https://qa.totalwine.com/store-images/401/storefront.jpg"
      }
    ],
    storeHeaderImage: {},
    galleryImages: [
      {
        altText: "Towson (Beltway) Storefront",
        imageType: "DEFAULT",
        format: "DEFAULT",
        url: "https://qa.totalwine.com/store-images/401/storefront.jpg"
      }
    ],
    socialMedia: [
      {}
    ],
    storeNumber: "401",
    wineTastingHours: {
      hasHours: true,
      showHours: true,
      days: [
        {
          closedStatus: true,
          closingTime: "12:00 AM",
          dayOfWeek: "MONDAY",
          openingTime: "12:00 AM"
        },
        {
          closedStatus: true,
          closingTime: "12:00 AM",
          dayOfWeek: "TUESDAY",
          openingTime: "12:00 AM"
        },
        {
          closedStatus: true,
          closingTime: "12:00 AM",
          dayOfWeek: "WEDNESDAY",
          openingTime: "12:00 AM"
        },
        {
          closedStatus: true,
          closingTime: "12:00 AM",
          dayOfWeek: "THURSDAY",
          openingTime: "12:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "8:00 PM",
          dayOfWeek: "FRIDAY",
          openingTime: "12:00 PM"
        },
        {
          closedStatus: false,
          closingTime: "8:00 PM",
          dayOfWeek: "SATURDAY",
          openingTime: "12:00 PM"
        },
        {
          closedStatus: true,
          closingTime: "12:00 AM",
          dayOfWeek: "SUNDAY",
          openingTime: "12:00 AM"
        }
      ]
    },
    wifiAvailable: true,
    zip: "21286",
    spiritsProhibited: false,
    hideTotalDiscovery: false,
    deliveryEligible: true,
    deliveryTipEligible: true,
    timeZone: "America/New_York",
    visitIdAmountThreshold: 1000,
    loyaltyProgram: "ANDMORE",
    falconLoyaltyProgram: "AndMore",
    cmsFallbackExperience: {
      WestburyAndMore: {
        state: "US-NY"
      },
      CTAndMore: {
        state: "US-CT"
      },
      WichitaAndMore: {
        state: "US-KS"
      },
      OKCAndMore: {
        state: "US-OK"
      }
    },
    fulfillmentDelayShipping: false,
    fulfillmentDelayISP: false,
    futureDeliveryAllowed: true,
    curbsideAvailable: true,
    giftable: true,
    thirdPartyPickupEligible: true,
    serviceTypes: [
      {
        code: "StandardPickup",
        orderReadyByHours: 2
      }
    ],
    enableEngraving: false
  },
  {
    address1: "Laurel Corridor",
    address2: "3335 Corridor Marketplace",
    beerTastingHours: {
      hasHours: false,
      showHours: false
    },
    city: "Laurel",
    displayMessage: false,
    displaySpecialInstructions: true,
    genericHeader: {},
    displayWeeklyAd: false,
    distance: 1159.61,
    formattedDistance: "1159.61 Mi",
    latitude: 39.09639,
    longitude: -76.80893,
    growler: false,
    humidor: true,
    classroom: false,
    marketingStatus: "ACTIVE",
    mapImage: "https://qa.totalwine.com/",
    name: "Laurel (Corridor)",
    phone: "301-617-8507",
    phoneFormatted: "(301) 617-8507",
    title: "Liquor Store, Wine Store - Laurel, MD | Total Wine & More|Total Wine & More",
    twmMetaDescription: "Shop wines, spirits and beers at the best prices, selection and service. Buy online for home delivery or pick up in our store near you in Laurel, MD. (301) 617-8507",
    regulatoryStore: false,
    customerServicePhone: "800-949-9892",
    customerServicePhoneFormatted: "(800) 949-9892",
    spiritsHours: {
      hasHours: false,
      showHours: false
    },
    spiritsTastingHours: {
      hasHours: true,
      showHours: true,
      days: [
        {
          closedStatus: false,
          closingTime: "6:00 PM",
          dayOfWeek: "MONDAY",
          openingTime: "11:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "6:00 PM",
          dayOfWeek: "TUESDAY",
          openingTime: "11:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "6:00 PM",
          dayOfWeek: "WEDNESDAY",
          openingTime: "11:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "6:00 PM",
          dayOfWeek: "THURSDAY",
          openingTime: "11:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "7:00 PM",
          dayOfWeek: "FRIDAY",
          openingTime: "11:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "8:00 PM",
          dayOfWeek: "SATURDAY",
          openingTime: "11:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "7:00 PM",
          dayOfWeek: "SUNDAY",
          openingTime: "12:00 PM"
        }
      ]
    },
    state: "Maryland",
    stateShort: "MD",
    stateIsoCode: "US-MD",
    storeHours: {
      hasHours: true,
      showHours: true,
      days: [
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "MONDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "TUESDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "WEDNESDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "11:00 PM",
          dayOfWeek: "THURSDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "11:00 PM",
          dayOfWeek: "FRIDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "11:00 PM",
          dayOfWeek: "SATURDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "9:00 PM",
          dayOfWeek: "SUNDAY",
          openingTime: "8:00 AM"
        }
      ]
    },
    nextWeekStoreHours: {
      hasHours: true,
      showHours: true,
      days: [
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "MONDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "TUESDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "10:00 PM",
          dayOfWeek: "WEDNESDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "11:00 PM",
          dayOfWeek: "THURSDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "11:00 PM",
          dayOfWeek: "FRIDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "11:00 PM",
          dayOfWeek: "SATURDAY",
          openingTime: "8:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "9:00 PM",
          dayOfWeek: "SUNDAY",
          openingTime: "8:00 AM"
        }
      ]
    },
    storeHeaderImage: {},
    socialMedia: [
      {}
    ],
    storeNumber: "402",
    wineTastingHours: {
      hasHours: true,
      showHours: true,
      days: [
        {
          closedStatus: false,
          closingTime: "6:00 PM",
          dayOfWeek: "MONDAY",
          openingTime: "11:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "6:00 PM",
          dayOfWeek: "TUESDAY",
          openingTime: "11:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "6:00 PM",
          dayOfWeek: "WEDNESDAY",
          openingTime: "11:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "6:00 PM",
          dayOfWeek: "THURSDAY",
          openingTime: "11:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "7:00 PM",
          dayOfWeek: "FRIDAY",
          openingTime: "11:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "8:00 PM",
          dayOfWeek: "SATURDAY",
          openingTime: "11:00 AM"
        },
        {
          closedStatus: false,
          closingTime: "7:00 PM",
          dayOfWeek: "SUNDAY",
          openingTime: "12:00 PM"
        }
      ]
    },
    wifiAvailable: true,
    zip: "20724",
    spiritsProhibited: false,
    hideTotalDiscovery: false,
    deliveryEligible: true,
    deliveryTipEligible: true,
    timeZone: "America/New_York",
    visitIdAmountThreshold: 1000,
    loyaltyProgram: "ANDMORE",
    falconLoyaltyProgram: "AndMore",
    cmsFallbackExperience: {
      WestburyAndMore: {
        state: "US-NY"
      },
      CTAndMore: {
        state: "US-CT"
      },
      WichitaAndMore: {
        state: "US-KS"
      },
      OKCAndMore: {
        state: "US-OK"
      }
    },
    fulfillmentDelayShipping: false,
    fulfillmentDelayISP: false,
    futureDeliveryAllowed: true,
    curbsideAvailable: true,
    giftable: true,
    thirdPartyPickupEligible: true,
    serviceTypes: [
      {
        code: "StandardPickup",
        orderReadyByHours: 2
      },
      {
        code: "ExpressPickup1Hr",
        orderReadyByHours: 2
      }
    ],
    enableEngraving: false
  }
];
