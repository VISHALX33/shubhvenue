import SweetShopOrder from '../models/SweetShopOrder.js';

// @desc    Get all sweet shop orders
// @route   GET /api/sweet-shop-orders
// @access  Public
export const getSweetShopOrders = async (req, res) => {
  try {
    const { city, type, minPrice, maxPrice, minItems } = req.query;

    // Build query
    let query = {};

    if (city) {
      query['location.city'] = city;
    }

    if (type) {
      query.type = type;
    }

    let sweetShops = await SweetShopOrder.find(query);

    // Filter by price range if provided
    if (minPrice || maxPrice) {
      sweetShops = sweetShops.filter((shop) => {
        const prices = shop.packages.map((pkg) => pkg.price);
        const minShopPrice = Math.min(...prices);
        const maxShopPrice = Math.max(...prices);

        if (minPrice && maxPrice) {
          return minShopPrice >= Number(minPrice) && maxShopPrice <= Number(maxPrice);
        } else if (minPrice) {
          return maxShopPrice >= Number(minPrice);
        } else if (maxPrice) {
          return minShopPrice <= Number(maxPrice);
        }
        return true;
      });
    }

    // Filter by minimum items if provided
    if (minItems) {
      sweetShops = sweetShops.filter((shop) => shop.itemsAvailable >= Number(minItems));
    }

    res.status(200).json({
      success: true,
      count: sweetShops.length,
      data: sweetShops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single sweet shop order
// @route   GET /api/sweet-shop-orders/:id
// @access  Public
export const getSweetShopOrderById = async (req, res) => {
  try {
    const sweetShop = await SweetShopOrder.findById(req.params.id);

    if (!sweetShop) {
      return res.status(404).json({
        success: false,
        message: 'Sweet shop not found',
      });
    }

    res.status(200).json({
      success: true,
      data: sweetShop,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create new sweet shop order
// @route   POST /api/sweet-shop-orders
// @access  Private
export const createSweetShopOrder = async (req, res) => {
  try {
    const sweetShop = await SweetShopOrder.create({
      ...req.body,
      vendorId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: sweetShop,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update sweet shop order
// @route   PUT /api/sweet-shop-orders/:id
// @access  Private
export const updateSweetShopOrder = async (req, res) => {
  try {
    const sweetShop = await SweetShopOrder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!sweetShop) {
      return res.status(404).json({
        success: false,
        message: 'Sweet shop not found',
      });
    }

    res.status(200).json({
      success: true,
      data: sweetShop,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete sweet shop order
// @route   DELETE /api/sweet-shop-orders/:id
// @access  Private
export const deleteSweetShopOrder = async (req, res) => {
  try {
    const sweetShop = await SweetShopOrder.findByIdAndDelete(req.params.id);

    if (!sweetShop) {
      return res.status(404).json({
        success: false,
        message: 'Sweet shop not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sweet shop deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add review to sweet shop order
// @route   POST /api/sweet-shop-orders/:id/reviews
// @access  Public
export const addReview = async (req, res) => {
  try {
    const sweetShop = await SweetShopOrder.findById(req.params.id);

    if (!sweetShop) {
      return res.status(404).json({
        success: false,
        message: 'Sweet shop not found',
      });
    }

    const review = {
      userName: req.body.userName,
      rating: req.body.rating,
      comment: req.body.comment,
    };

    sweetShop.reviews.push(review);

    // Update ratings
    sweetShop.ratings.count = sweetShop.reviews.length;
    sweetShop.ratings.average =
      sweetShop.reviews.reduce((acc, review) => acc + review.rating, 0) /
      sweetShop.reviews.length;

    await sweetShop.save();

    res.status(200).json({
      success: true,
      data: sweetShop,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
