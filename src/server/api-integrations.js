/**
 * Example API integrations for real product data
 * Uncomment and implement the integration you want to use
 */

/**
 * Example 1: Generic REST API Integration
 * Replace with your actual product API
 */
export async function searchProductsGenericAPI(query) {
  const apiUrl = process.env.PRODUCT_API_URL || 'https://api.example.com';
  const apiKey = process.env.PRODUCT_API_KEY;

  try {
    const response = await fetch(`${apiUrl}/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform API response to our product format
    return data.products.map(product => ({
      id: product.id,
      name: product.name || product.title,
      price: parseFloat(product.price),
      image: product.image || product.thumbnail,
      url: product.url || product.link,
      description: product.description || product.summary,
    }));
  } catch (error) {
    console.error('API search error:', error);
    return [];
  }
}

/**
 * Example 2: Amazon Product Advertising API Integration
 * Requires: amazon-paapi package
 * Install: npm install amazon-paapi
 */
export async function searchProductsAmazon(query) {
  // Uncomment and configure when using Amazon API
  /*
  const amazonPaapi = require('amazon-paapi');

  const commonParameters = {
    AccessKey: process.env.AMAZON_ACCESS_KEY,
    SecretKey: process.env.AMAZON_SECRET_KEY,
    PartnerTag: process.env.AMAZON_ASSOCIATE_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.com',
  };

  try {
    const requestParameters = {
      Keywords: query,
      SearchIndex: 'All',
      ItemCount: 10,
      Resources: [
        'Images.Primary.Large',
        'ItemInfo.Title',
        'Offers.Listings.Price',
      ],
    };

    const response = await amazonPaapi.SearchItems(commonParameters, requestParameters);

    return response.SearchResult.Items.map(item => ({
      id: item.ASIN,
      name: item.ItemInfo.Title.DisplayValue,
      price: item.Offers?.Listings[0]?.Price?.Amount || 0,
      image: item.Images.Primary.Large.URL,
      url: item.DetailPageURL,
      description: item.ItemInfo.Title.DisplayValue,
    }));
  } catch (error) {
    console.error('Amazon API error:', error);
    return [];
  }
  */

  console.log('Amazon API not configured');
  return [];
}

/**
 * Example 3: eBay Finding API Integration
 * Documentation: https://developer.ebay.com/devzone/finding/concepts/FindingAPIGuide.html
 */
export async function searchProductsEbay(query) {
  const appId = process.env.EBAY_APP_ID;

  if (!appId) {
    console.log('eBay API not configured');
    return [];
  }

  try {
    const url = new URL('https://svcs.ebay.com/services/search/FindingService/v1');
    url.searchParams.append('OPERATION-NAME', 'findItemsByKeywords');
    url.searchParams.append('SERVICE-VERSION', '1.0.0');
    url.searchParams.append('SECURITY-APPNAME', appId);
    url.searchParams.append('RESPONSE-DATA-FORMAT', 'JSON');
    url.searchParams.append('keywords', query);
    url.searchParams.append('paginationInput.entriesPerPage', '10');

    const response = await fetch(url.toString());
    const data = await response.json();

    const items = data.findItemsByKeywordsResponse[0].searchResult[0].item || [];

    return items.map(item => ({
      id: item.itemId[0],
      name: item.title[0],
      price: parseFloat(item.sellingStatus[0].currentPrice[0].__value__),
      image: item.galleryURL?.[0] || item.pictureURLLarge?.[0] || '',
      url: item.viewItemURL[0],
      description: item.title[0],
    }));
  } catch (error) {
    console.error('eBay API error:', error);
    return [];
  }
}

/**
 * Example 4: Best Buy API Integration
 * Documentation: https://developer.bestbuy.com/
 */
export async function searchProductsBestBuy(query) {
  const apiKey = process.env.BESTBUY_API_KEY;

  if (!apiKey) {
    console.log('Best Buy API not configured');
    return [];
  }

  try {
    const url = `https://api.bestbuy.com/v1/products((search=${encodeURIComponent(query)}))?apiKey=${apiKey}&format=json&pageSize=10`;

    const response = await fetch(url);
    const data = await response.json();

    return data.products.map(product => ({
      id: product.sku,
      name: product.name,
      price: product.salePrice || product.regularPrice,
      image: product.image,
      url: product.url,
      description: product.shortDescription || product.name,
    }));
  } catch (error) {
    console.error('Best Buy API error:', error);
    return [];
  }
}

/**
 * Example 5: Fake Store API (Free, no API key required)
 * Good for testing and development
 */
export async function searchProductsFakeStore(query) {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    // Filter products by query
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.map(product => ({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      url: `https://fakestoreapi.com/products/${product.id}`,
      description: product.description.substring(0, 100) + '...',
    }));
  } catch (error) {
    console.error('Fake Store API error:', error);
    return [];
  }
}
