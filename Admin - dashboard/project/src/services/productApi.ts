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
};

export default ProductApi;
