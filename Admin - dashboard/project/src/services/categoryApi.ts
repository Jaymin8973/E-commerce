import axiosClient from "../api/axiosClient";
import { ProductResponse } from "../types/product.types";

const categoryApi = {

  getAllCategories: async (): Promise<ProductResponse[]> => {
    const res = await axiosClient.get(`/subcategories`, {
    });
    return res.data;
  },

};

export default categoryApi;
