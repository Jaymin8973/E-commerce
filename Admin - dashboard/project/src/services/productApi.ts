import axiosClient from "../api/axiosClient";
import { ProductFormValues } from "../schemas/productSchema";

const ProductApi = {
  addProduct: async (data: ProductFormValues) => {
    const res = await axiosClient.post("/products", data);
    return res.data;
  },

  getAllProducts: async () => {
    const res = await axiosClient.get("/products");
    return res.data;
  },

  getProductById: async (id: number) => {
    const res = await axiosClient.get(`/products/${id}`);
    return res.data;
  },

  deleteProduct: async (id: number) => {
    const res = await axiosClient.delete(`/products/${id}`);
    return res.data;
  },

  updateProduct: async (id: number, data: ProductFormValues) => {
    console.log(data)
    const res = await axiosClient.put(`/products/${id}`, data);
    return res.data;
  },

bulkImportProducts: async (file: File) => {
  const formData = new FormData();
  formData.append("file", file); // "file" must match your backend multer field name

  const res = await axiosClient.post(`/products/bulk`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
},

};

export default ProductApi;
