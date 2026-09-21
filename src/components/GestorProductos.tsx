import React from "react";
import { useProducto } from "../hooks/useProducto";
import ProductoForm from "./ProductoForm";
import ProductoList from "./ProductoList";
import Swal from "sweetalert2";

const GestorProductos: React.FC = () => {
    const {
        productos,
        loading,
        productoToEdit,
        setProductoToEdit,
        formData,
        setFormData,
        createProducto,
        updateProducto,
        deleteProducto,
        handleInputChange,
    } = useProducto();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.price.trim() || !formData.category.trim()) {
            Swal.fire("Error", "Por favor complete los campos obligatorios", "error");
            return;
        }
        if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            Swal.fire("Error", "El precio debe ser un número mayor que 0", "error");
            return;
        }

        if (productoToEdit) {
            await updateProducto(productoToEdit.id, formData);
        } else {
            await createProducto(formData);
        }

        setFormData({
            title: "",
            price: "",
            description: "",
            category: "",
            image: "",
        });
        setProductoToEdit(null);
    };

    return (
        <div>
            <ProductoForm
                formData={formData}
                setFormData={setFormData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                productoToEdit={productoToEdit}
                setProductoToEdit={setProductoToEdit}
                loading={loading}
            />
            <ProductoList
                productos={productos}
                handleEdit={setProductoToEdit}
                handleDelete={deleteProducto}
                loading={loading}
            />
        </div>
    );
};

export default GestorProductos;
