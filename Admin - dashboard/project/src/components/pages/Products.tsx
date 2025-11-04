import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Filter, Download, Upload, Eye, Edit, Trash2, Package, AlertTriangle, TrendingUp, X, RefreshCw, CheckCircle2 } from 'lucide-react';
import {  type Product } from '../../services/api';
import ProductApi from '../../services/productApi';
import toast from 'react-hot-toast';

const PLACEHOLDER_IMG = 'https://via.placeholder.com/100';

const isSafeImageUrl = (url?: string) => {
  if (!url) return false;
  if (url.startsWith('blob:')) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
 const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  // Edit modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({
    productName: '',
    description: '',
    sellingPrice: 0,
    totalStock: 0,
    category: '',
    imageUrl: ''
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductApi.getAllProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = (product.productName || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || (product.Category.name || '').toLowerCase() === selectedCategory;
      // Derive status: low_stock if stock < 10, out_of_stock if 0, else active
      const derivedStatus = product.totalStock <= 0 ? 'out_of_stock' : (product.totalStock < 10 ? 'low_stock' : 'active');
      const matchesStatus = selectedStatus === 'all' || derivedStatus === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, selectedCategory, selectedStatus]);

  const totalValue = useMemo(() => {
    return products.reduce((sum, p) => sum + ((p.sellingPrice || 0) * (p.totalStock || 0)), 0);
  }, [products]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-red-100 text-red-800';
      case 'out_of_stock': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'low_stock': return 'Low Stock';
      case 'out_of_stock': return 'Out of Stock';
      default: return status;
    }
  };

  const deriveStatus = (stock: number) => (stock <= 0 ? 'out_of_stock' : (stock < 10? 'low_stock' : 'active'));

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setEditForm({
      productName: p.productName || '',
      description: p.shortDescription || '',
      sellingPrice: p.sellingPrice || 0,
      totalStock: p.totalStock || 0,
      category: p.Category.name || '',
      imageUrl: p.imageUrl || ''
    });
    setSaveError(null);
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setEditingProduct(null);
    setSaveError(null);
  };

  const handleEditChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: field === 'price' ? Number(value) : field === 'stock' ? Number(value) : value }));
  };

  const saveEdit = async () => {
    if (!editingProduct) return;
    setSaving(true);
    setSaveError(null);
    try {
      const updated = await ProductApi.updateProduct(editingProduct.id, editForm);
      // Update local list optimistically
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...updated } : p));
      closeEdit();
      toast.success('Product updated successfully');
      loadProducts();
    } catch (e: any) {
      setSaveError(e?.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm('Delete this product? This action cannot be undone.')) return;
    setDeletingId(id);
    setDeleteError(null);
    try {
      await ProductApi.deleteProduct(id);
      toast.success('Product deleted successfully');
    } catch (e: any) {
      setDeleteError(e?.message || 'Failed to delete product');
      alert(`Failed to delete: ${e?.message || 'Unknown error'}`);
    } finally {
      setDeletingId(null);
    }
  };
  console.log(products)

  const exportCSV = () => {
    const rows = filteredProducts.map(p => ({
      ProductType: p.ProductType.name,
      Category: p.Category.name,
      Subcategory: p.Subcategory.name,
      Gender:p.Gender.gender,
      ProductName: p.productName,
      brand: p.brand,
      shortDescription: p.shortDescription,
      MRP: p.mrp,
      SellingPrice: p.sellingPrice,
      DiscountPercent:p.discountPercent,
      SKU: p.sku,
      HSNCode: p.hsnCode,
      TotalStock: p.totalStock,
      status: deriveStatus(p.totalStock),
      image_url: p.imageUrl,
      created_at: p.createdAt,
      updated_at: p.updatedAt,
    }));
    const headers = Object.keys(rows[0] || {
      id: '', name: '', category: '', stock: '', price: '', status: '', image_url: '', created_at: '', updated_at: ''
    });
    const csv = [headers.join(','), ...rows.map(r => headers.map(h => {
      const val = (r as any)[h] ?? '';
      const s = String(val).replace(/"/g, '""');
      return /[",\n]/.test(s) ? `"${s}"` : s;
    }).join(','))].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (!selectedFile.name.endsWith(".xlsx") && !selectedFile.name.endsWith(".csv")) {
      alert("Only Excel (.xlsx) or CSV files allowed!");
      return;
    }
    setFile(selectedFile);
  };


  const handleBulkImport = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await ProductApi.bulkImportProducts(file);
      toast.success('Products imported successfully');
      loadProducts();
    } catch (e: any) {
      toast.error(e?.message || 'Failed to import products');
    } finally {
      setUploading(false);
      setFile(null);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product catalog and inventory</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={loadProducts} className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" title="Refresh">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button onClick={exportCSV} className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" title="Export CSV">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
         <label className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors">
        <Upload className="w-4 h-4 mr-2" />
        {file ? "Change File" : "Select Excel File"}
        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Upload Button */}
      {file && (
        <button
         onClick={handleBulkImport}
          disabled={uploading}
          className={`flex items-center px-4 py-2 rounded-lg text-white transition-colors ${
            uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? (
            "Uploading..."
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Submit
            </>
          )}
        </button>
      )}
          <a href="/upload" className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </a>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.filter(p => deriveStatus(p.totalStock) === 'active').length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900">{products.filter(p => deriveStatus(p.totalStock) === 'low_stock').length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
          >
            <option value="all">All Categories</option>
            {/* categories are free text from DB; keep a few quick filters */}
            <option value="electronics">Electronics</option>
            <option value="footwear">Footwear</option>
            <option value="topwear">Topwear</option>
            <option value="accessories">Accessories</option>
          </select>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading && (
          <div className="p-6 text-sm text-gray-500">Loading products...</div>
        )}
        {error && (
          <div className="p-6 text-sm text-red-600">{error}</div>
        )}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => {
                  const status = deriveStatus(product.totalStock);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            src={isSafeImageUrl(product.imageUrl) ? product.imageUrl as string : PLACEHOLDER_IMG}
                            alt={product.productName}
                            className="w-10 h-10 rounded-lg object-cover mr-3"
                            referrerPolicy="no-referrer"
                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMG; }}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              <a href={`/products/${product.id}`} className="hover:underline">{product.productName}</a>
                            </div>
                            <div className="text-xs text-gray-500">ID: {product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.Category.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${status === 'low_stock' ? 'text-red-600' : 'text-gray-900'}`}>
                          {product.totalStock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{(product.sellingPrice || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                          {getStatusText(status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600" title="View" onClick={() => (window.location.href = `/products/${product.id}`)}>
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600" title="Edit" onClick={() => openEdit(product)}>
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className={`text-gray-400 hover:text-red-600 ${deletingId === product.id ? 'opacity-50 cursor-not-allowed' : ''}`} title="Delete" onClick={() => deleteProduct(product.id)} disabled={deletingId === product.id}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No products found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeEdit} />
          <div className="relative bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Product</h3>
              <button onClick={closeEdit} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.productName}
                  onChange={(e) => handleEditChange('productName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => handleEditChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    value={editForm.sellingPrice}
                    onChange={(e) => handleEditChange('sellingPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input
                    type="number"
                    value={editForm.totalStock}
                    onChange={(e) => handleEditChange('totalStock', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => handleEditChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={editForm.imageUrl}
                    onChange={(e) => handleEditChange('imageUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {saveError && <p className="mt-3 text-sm text-red-600">{saveError}</p>}

            <div className="mt-6 flex items-center justify-end space-x-3">
              <button onClick={closeEdit} className="px-4 py-2 border border-gray-300 rounded-md">Cancel</button>
              <button onClick={saveEdit} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteError && (
        <p className="text-sm text-red-600">{deleteError}</p>
      )}
    </div>
  );
};

export default Products;