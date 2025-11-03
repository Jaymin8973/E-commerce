import { z } from "zod";


export const ProductFormSchema = z.object({
    productType: z.string().min(1, "Product type required"),
    gender: z.string().min(1, "Gender required"),
    category: z.string().min(1, "Category required"),
    subcategory: z.string().min(1, "Subcategory required"),

    productName: z.string().min(2, "Product name required"),
    brand: z.string().min(1, "Brand required"),
    shortDescription: z.string().optional(),
    description: z.string().min(1, "Description is requires"),
    imageUrl: z.string().optional(),
});


export type ProductFormValues = z.infer<typeof ProductFormSchema>;