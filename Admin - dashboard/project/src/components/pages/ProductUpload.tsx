// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Upload, Plus, Trash2, Eye, Camera } from 'lucide-react';
import { apiService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import categoryApi from '../../services/Product&categoryOptionsApi';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from 'react-hook-form';
import { ProductFormSchema } from '../../schemas/productSchema';
import ProductApi from '../../services/productApi';


interface ProductImage {
  id: string;
  file: File | null;
  url: string;
  isPrimary: boolean;
}

interface ProductVariant {
  id: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  sku: string;
}

const ProductUpload: React.FC = () => {
  const [productType, setProductType] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [gender, setGender] = useState('');
  const [images, setImages] = useState<ProductImage[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [productTypeOptions, setProductTypeOptions] = useState([]);
  const [genderOptions, setGenderOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcatOptions, setSubcatOptions] = useState([]);
  const navigate = useNavigate();

  const { register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues:
    {
      productType: "",
      gender: "",
      category: "",
      subCategory: "",
      productName: "",
      brand: "",
      shortDescription: "",
      description: "",
      imageUrl: "",
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  useEffect(() => {
    const initializeData = async () => {
      try {
        const productTypes = await categoryApi.getProductTypes();
        setProductTypeOptions(productTypes);

        const genders = await categoryApi.getGenders();
        setGenderOptions(genders);

      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    initializeData();
  }, []);


  const fetchCategories = async (e) => {
    try {
      const selectedGender = e.target.value;
      setGender(selectedGender);
      const productTypeId = productTypeOptions.find(p => p.name === productType)?.id;
      const genderId = genderOptions.find(g => g.gender === selectedGender)?.id;
      const payload = {
        productTypeId,
        genderId
      };

      const categories = await categoryApi.getCategories(payload);
      setCategoryOptions(categories);
      console.log(categoryOptions)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async (e) => {
    try {
      const category = e.target.value;
      setCategory(category);
      const categoryId = categoryOptions.find(c => c.name === category)?.id;
      const SubCategories = await categoryApi.getSubCategories(categoryId);
      setSubcatOptions(SubCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };




  const [formData, setFormData] = useState({
    // Basic Info
    productName: '',
    brand: '',
    description: '',
    shortDescription: '',

    // Pricing
    mrp: '',
    sellingPrice: '',
    discount: '',

    // SEO & Tags
    metaTitle: '',
    metaDescription: '',
    tags: '',

    // Clothing Specific
    material: '',
    fabric: '',
    pattern: '',
    collarType: '',
    sleeveType: '',
    fit: '',
    occasion: '',
    season: '',
    careInstructions: '',

    // Footwear Specific
    footwearType: '',
    heelHeight: '',
    soleMaterial: '',
    upperMaterial: '',
    closure: '',

    // Accessories Specific
    accessoryType: '',
    dimensions: '',
    weight: '',

    // Shipping & Returns
    shippingWeight: '',
    packageDimensions: '',
    returnPolicy: '',
    shippingClass: '',

    // Inventory
    sku: '',
    hsn: '',
    totalStock: '',
    lowStockAlert: '',

    // Media
    imageUrl: '',

    // Status
    status: 'draft'
  });


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newImage: ProductImage = {
          id: Date.now().toString() + Math.random(),
          file,
          url: URL.createObjectURL(file),
          isPrimary: images.length === 0
        };
        setImages(prev => [...prev, newImage]);
      });
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const setPrimaryImage = (id: string) => {
    setImages(prev => prev.map(img => ({ ...img, isPrimary: img.id === id })));
  };

  const addVariant = () => {
    const newVariant: ProductVariant = {
      id: Date.now().toString(),
      size: '',
      color: '',
      stock: 0,
      price: parseFloat(formData.sellingPrice) || 0,
      sku: ''
    };
    setVariants(prev => [...prev, newVariant]);
  };

  const updateVariant = (id: string, field: string, value: string | number) => {
    setVariants(prev => prev.map(variant =>
      variant.id === id ? { ...variant, [field]: value } : variant
    ));
  };

  const removeVariant = (id: string) => {
    setVariants(prev => prev.filter(variant => variant.id !== id));
  };

  const resetForm = () => {
    setFormData(prev => ({
      ...prev,
      productName: '',
      brand: '',
      description: '',
      shortDescription: '',
      mrp: '',
      sellingPrice: '',
      discount: '',
      metaTitle: '',
      metaDescription: '',
      tags: '',
      material: '',
      fabric: '',
      pattern: '',
      collarType: '',
      sleeveType: '',
      fit: '',
      occasion: '',
      season: '',
      careInstructions: '',
      footwearType: '',
      heelHeight: '',
      soleMaterial: '',
      upperMaterial: '',
      closure: '',
      accessoryType: '',
      dimensions: '',
      weight: '',
      shippingWeight: '',
      packageDimensions: '',
      returnPolicy: '',
      shippingClass: '',
      sku: '',
      hsn: '',
      totalStock: '',
      lowStockAlert: '',
      imageUrl: '',
      status: 'draft'
    }));
    setImages([]);
    setVariants([]);
    setCategory('');
    setSubCategory('');
    setGender('men');
    setProductType('clothing');
  };

  const Submit = async (status: 'draft' | 'active') => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        name: formData.productName || 'Untitled Product',
        description: formData.description || '',
        price: parseFloat(formData.sellingPrice || '0') || 0,
        stock: parseInt(formData.totalStock || '0') || 0,
        category: category || 'General',
        image_url: formData.imageUrl || '',
      };

      const created = await apiService.createProduct(payload);

      alert(`Product ${status === 'draft' ? 'saved' : 'published'} successfully! (ID: ${created.id})`);
      resetForm();
      navigate('/products');
    } catch (err: any) {
      setSubmitError(err?.message || 'Failed to save product');
      alert(`Failed to save product: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const SubmitHandle = async (data: ProductFormType, status: 'draft' | 'active') => {
    try {
      const payload = {
        ...data,
        status: status,
      }

      console.log(payload)

      const Product = ProductApi.addProduct(payload)
      console.log(Product)
      resetForm();
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p className="text-gray-600">Create a new product listing for your marketplace</p>
      </div>

      <form className="space-y-8" onSubmit={() => handleSubmit(SubmitHandle('active'))}>
        {/* Product Type Selection */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Product Type & Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Type *</label>
              <select
                {...register("productType")}
                value={productType}
                onChange={(e) => {
                  setProductType(e.target.value);
                  setCategory('');
                  setGender('');
                  setSubCategory('');
                }}
                className="w-full capitalize px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Product Type</option>
                {
                  productTypeOptions.map((item) => (
                    <option key={item.id} value={item.name} className='capitalize'>{item.name}</option>
                  ))
                }
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
              <select
                {...register("gender")}
                value={gender}
                onChange={fetchCategories}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                {
                  genderOptions.map((item) => (
                    <option key={item.id} value={item.gender} className='capitalize'>{item.gender}</option>
                  ))
                }
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                {...register("category")}
                value={category}
                onChange={fetchSubCategories}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {
                  categoryOptions.map((item) => (
                    <option key={item.id} value={item.name} className='capitalize'>{item.name}</option>
                  ))
                }
              </select>
            </div>
          </div>

          {category && productType === 'clothing' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category *</label>
              <select
                {...register("subcategory")}
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Sub Category</option>
                {
                  subcatOptions.map((item) => (
                    <option key={item.id} value={item.name} className='capitalize'>{item.name}</option>
                  ))
                }
              </select>
            </div>
          )}
        </div>

        {/* Basic Information */}
        <div className="bg-gray-50 p-6 rounded-lg">   
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
              <input
                {...register("productName")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
              <input
                {...register("brand")}
                type="text"
                onChange={(e) => handleInputChange('brand', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter brand name"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
              <input
                {...register("shortDescription")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief product description (max 160 characters)"
                maxLength={160}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description *</label>
              <textarea
                {...register("description")}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed product description"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                {...register("imageUrl")}
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Camera className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB each)</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt="Product"
                      className={`w-full h-32 object-cover rounded-lg border-2 ${image.isPrimary ? 'border-blue-500' : 'border-gray-200'
                        }`}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setPrimaryImage(image.id)}
                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        title="Set as primary"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {image.isPrimary && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        Primary
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">MRP (₹) *</label>
              <input
                {...register("mrp")}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                required
              />
            </div>

            <div>
              <label className="block text sm font-medium text-gray-700 mb-2">Selling Price (₹) *</label>
              <input
                {...register("sellingPrice")}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
              <input
                {...register("discountPercent")}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                max="100"
              />
            </div>
          </div>
        </div>

        {/* Product Specific Fields */}
        {productType === 'clothing' && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Clothing Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                <input
                  {...register("clothing.material")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Cotton, Polyester"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fabric</label>
                <input
                  {...register("clothing.fabric")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Denim, Silk"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
                <select
                  {...register("clothing.pattern")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Pattern</option>
                  <option value="solid">Solid</option>
                  <option value="striped">Striped</option>
                  <option value="checked">Checked</option>
                  <option value="printed">Printed</option>
                  <option value="floral">Floral</option>
                  <option value="geometric">Geometric</option>
                </select>
              </div>

              {(category === 'topwear' || subCategory?.includes('Shirt')) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collar Type</label>
                  <select
                    {...register("clothing.collarType")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Collar</option>
                    <option value="round">Round Neck</option>
                    <option value="v-neck">V-Neck</option>
                    <option value="collar">Collar</option>
                    <option value="mandarin">Mandarin Collar</option>
                    <option value="henley">Henley</option>
                    <option value="boat">Boat Neck</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sleeve Type</label>
                <select
                  {...register("clothing.sleeveType")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Sleeve</option>
                  <option value="full">Full Sleeve</option>
                  <option value="half">Half Sleeve</option>
                  <option value="sleeveless">Sleeveless</option>
                  <option value="3/4">3/4 Sleeve</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fit</label>
                <select
                  {...register("clothing.fit")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Fit</option>
                  <option value="regular">Regular Fit</option>
                  <option value="slim">Slim Fit</option>
                  <option value="loose">Loose Fit</option>
                  <option value="oversized">Oversized</option>
                  <option value="skinny">Skinny Fit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
                <select
                  {...register("clothing.occasion")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Occasion</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="party">Party</option>
                  <option value="sports">Sports</option>
                  <option value="ethnic">Ethnic</option>
                  <option value="work">Work</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
                <select
                  {...register("clothing.season")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Season</option>
                  <option value="summer">Summer</option>
                  <option value="winter">Winter</option>
                  <option value="monsoon">Monsoon</option>
                  <option value="all-season">All Season</option>
                </select>
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Care Instructions</label>
                <textarea
                  {...register("clothing.careInstructions")}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Machine wash cold, Do not bleach"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footwear Details */}
        {productType === 'footwear' && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Footwear Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heel Height</label>
                <select
                  {...register("footwear.heelHeight")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Height</option>
                  <option value="flat">Flat (0-1 inch)</option>
                  <option value="low">Low (1-2 inches)</option>
                  <option value="medium">Medium (2-3 inches)</option>
                  <option value="high">High (3-4 inches)</option>
                  <option value="very-high">Very High (4+ inches)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sole Material</label>
                <input
                  {...register("footwear.soleMaterial")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Rubber, Leather"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upper Material</label>
                <input
                  {...register("footwear.upperMaterial")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Leather, Canvas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Closure</label>
                <select
                  {...register("footwear.closure")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Closure</option>
                  <option value="lace-up">Lace-up</option>
                  <option value="slip-on">Slip-on</option>
                  <option value="buckle">Buckle</option>
                  <option value="velcro">Velcro</option>
                  <option value="zipper">Zipper</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Accessories Details */}
        {productType === 'accessories' && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Accessory Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Accessory Type</label>
                <select
                  {...register("accessories.accessoryType")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  {getCurrentCategories().map((type: string) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
                <input
                  {...register("accessories.dimensions")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 10cm x 5cm x 2cm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (grams)</label>
                <input
                  {...register("accessories.weight")}
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        )}

        {/* Product Variants */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Product Variants</h2>
            <button
              type="button"
              onClick={() => append({ size: "", color: "", stock: "", price: "" })}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add Variant</span>
            </button>
          </div>

          {fields.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No variants added. Click "Add Variant" to create size/color combinations.</p>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="bg-white p-4 rounded-lg border">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                      <input
                        {...register(`variants.${index}.size`)}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="S, M, L, XL"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                      <input
                        {...register(`variants.${index}.color`)}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Red, Blue, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                      <input
                        type="number"
                        {...register(`variants.${index}.stock`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        {...register(`variants.${index}.price`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="w-full px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Inventory & SKU */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Inventory & SKU</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SKU *</label>
              <input
                {...register("sku")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Product SKU"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">HSN Code</label>
              <input
                {...register("hsnCode")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="HSN Code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Stock</label>
              <input
                {...register("totalStock")}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Low Stock Alert</label>
              <input
                {...register("lowStockAlert")}
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5"
              />
            </div>
          </div>
        </div>

        {/* SEO & Tags */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">SEO & Tags</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
              <input
                {...register("metaTitle")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="SEO title for search engines"
                maxLength={60}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
              <textarea
                {...register("metaDescription")}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="SEO description for search engines"
                maxLength={160}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <input
                {...register("tags")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Comma-separated tags (e.g., casual, cotton, summer)"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              onClick={handleSubmit((data) => SubmitHandle(data, "draft"))}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="submit"
              onClick={handleSubmit((data) => SubmitHandle(data, "active"))}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>{isSubmitting ? 'Publishing...' : 'Publish Product'}</span>
            </button>
          </div>
          <button
            type="button"
            className="px-4 py-2 text-gray-500 hover:text-gray-700"
            onClick={resetForm}
          >
            Cancel
          </button>
        </div>

        {submitError && (
          <p className="text-sm text-red-600">{submitError}</p>
        )}
      </form>
    </div>
  );
};

export default ProductUpload;
