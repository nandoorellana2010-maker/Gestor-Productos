import React from "react";
import type { ProductoListProps } from "../types/Props";

const ProductoList: React.FC<ProductoListProps> = ({
    productos,
    handleEdit,
    handleDelete,
    loading,
}) => {
    if (loading) return <p>Cargando productos...</p>;

    if (productos.length === 0) return <p>No hay productos disponibles.</p>;

    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-1">ID</th>
                    <th className="border border-gray-300 px-3 py-1">Título</th>
                    <th className="border border-gray-300 px-3 py-1">Precio</th>
                    <th className="border border-gray-300 px-3 py-1">Categoría</th>
                    <th className="border border-gray-300 px-3 py-1">Imagen</th>
                    <th className="border border-gray-300 px-3 py-1">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto) => (
                    <tr key={producto.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-1">{producto.id}</td>
                        <td className="border border-gray-300 px-3 py-1">{producto.title}</td>
                        <td className="border border-gray-300 px-3 py-1">${producto.price.toFixed(2)}</td>
                        <td className="border border-gray-300 px-3 py-1">{producto.category}</td>
                        <td className="border border-gray-300 px-3 py-1">
                            {producto.image && (
                                <img src={producto.image} alt={producto.title} className="h-12 w-12 object-contain" />
                            )}
                        </td>
                        <td className="border border-gray-300 px-3 py-1 space-x-2">
                            <button
                                onClick={() => handleEdit(producto)}
                                className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(producto.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductoList;
