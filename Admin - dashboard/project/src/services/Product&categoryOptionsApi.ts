import axiosClient from "../api/axiosClient";
import { ProductResponse } from "../types/product.types";

const categoryApi = {

  getProductTypes: async (): Promise<ProductResponse[]> => {
     const res = await axiosClient.get(`/product-types`, {
    });
    return res.data;
  },

    getGenders: async (): Promise<ProductResponse[]> => {
     const res = await axiosClient.get(`/genders`, {
    });
    return res.data;
  },

  getCategories: async (data:object): Promise<ProductResponse[]> => {
    console.log(data)
    const res = await axiosClient.post(`/categories/options`, data);
    return res.data;
  },


  getSubCategories: async (categoryId:Number): Promise<ProductResponse[]> => {
    const res = await axiosClient.post(`/subcategories/options`, {categoryId:categoryId});
    return res.data;
  },

};

export default categoryApi;
