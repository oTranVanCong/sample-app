import { Category } from "../../categories/shared/category.model";

export interface Product {
    id: number;
    name: string;
    price: number;
    deleted: boolean;
    categoryId: number;
    category?: Category;

    description?: string;
    type?: string;
    createdAt?: Date;
    updatedAt?: Date;
};