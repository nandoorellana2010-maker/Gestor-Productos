import React from "react";
import type { ProductoFormProps } from "../types/Props";

const ProductoForm: React.FC<ProductoFormProps> = ({
    formData,
    setFormData,
    handleInputChange,
    handleSubmit,
    productoToEdit,
    setProductoToEdit,
    loading,
}) => {
    return (
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">
                {productoToEdit ? "Editar Producto" : "Nuevo Producto"}
            </h2>
            <div className="mb-3">
                <label className="block mb-1 font-medium">Título *</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    disabled={loading}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="block mb-1 font-medium">Precio *</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    disabled={loading}
                    min="0.01"
                    step="0.01"
                    required
                />
            </div>
            <div className="mb-3">
                <label className="block mb-1 font-medium">Descripción</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    disabled={loading}
                />
            </div>
            <div className="mb-3">
                <label className="block mb-1 font-medium">Categoría *</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    disabled={loading}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="block mb-1 font-medium">URL Imagen</label>
                <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    disabled={loading}
                />
            </div>
            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {productoToEdit ? "Actualizar" : "Crear"}
                </button>
                {productoToEdit && (
                    <button
                        type="button"
                        onClick={() => {
                            setProductoToEdit(null);
                            setFormData({
                                title: "",
                                price: "",
                                description: "",
                                category: "",
                                image: "",
                            });
                        }}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProductoForm;
