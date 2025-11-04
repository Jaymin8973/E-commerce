import axiosClient from "../api/axiosClient";

const categoryApi = {

  getProductTypes: async () => {
     const res = await axiosClient.get(`/product-types`, {
    });
    return res.data;
  },

    getGenders: async () => {
     const res = await axiosClient.get(`/genders`, {
    });
    return res.data;
  },

  getCategories: async (data:object) => {
    console.log(data)
    const res = await axiosClient.post(`/categories/options`, data);
    return res.data;
  },


  getSubCategories: async (categoryId:Number) => {
    const res = await axiosClient.post(`/subcategories/options`, {categoryId:categoryId});
    return res.data;
  },

};

export default categoryApi;
