const Category = require("../models/categoryModel");
const cloudinary = require("cloudinary");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");

// ✅ Create Category (Admin)
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { name, image } = req.body;

  // Upload image to cloudinary
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "categories",
  });

  const category = await Category.create({
    name,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    category,
  });
});

// ✅ Get All Categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find({ isActive: true });
  res.status(200).json({
    success: true,
    categories,
  });
});

// ✅ Update Category (Admin)
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Category not found", 404));
  }

  if (req.body.image) {
    // Delete old image
    await cloudinary.v2.uploader.destroy(category.image.public_id);

    // Upload new image
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "categories",
    });

    req.body.image = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    category,
  });
});

// ✅ Delete Category (Admin)
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander("Category not found", 404));
  }

  // Delete image from cloudinary
  await cloudinary.v2.uploader.destroy(category.image.public_id);

  await category.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});
