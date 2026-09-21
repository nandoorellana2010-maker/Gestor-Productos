import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Producto } from "./Producto";
import type { ProductoFormData } from "./ProductoFormData";

export type ProductoToEditType = Producto | null;

export type ProductoFormProps = {
    formData: ProductoFormData;
    setFormData: Dispatch<SetStateAction<ProductoFormData>>;
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    productoToEdit: ProductoToEditType;
    setProductoToEdit: Dispatch<SetStateAction<ProductoToEditType>>;
    loading: boolean;
};

export type ProductoListProps = {
    productos: Producto[];
    handleEdit: (producto: Producto) => void;
    handleDelete: (id: number) => void;
    loading: boolean;
};
