import axiosClient from "../api/axiosClient";
import { ProductPayload, ProductResponse } from "../types/product.types";

const productApi = {
  addProduct: async (data: ProductPayload): Promise<ProductResponse> => {
    const res = await axiosClient.post("/products", data);
    return res.data;
  },

  getAllProducts: async (): Promise<ProductResponse[]> => {
    const res = await axiosClient.get("/products");
    return res.data;
  },

  getProductById: async (id: number): Promise<ProductResponse> => {
    const res = await axiosClient.get(`/products/${id}`);
    return res.data;
  },
};

export default productApi;
