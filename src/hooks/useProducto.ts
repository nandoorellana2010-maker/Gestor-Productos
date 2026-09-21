import { useState, useEffect, type ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import type { Producto } from "../types/Producto";
import type { ProductoFormData } from "../types/ProductoFormData";
import type { ProductoToEditType } from "../types/Props";

const API_BASE = "https://fakestoreapi.com";

export function useProducto() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [productoToEdit, setProductoToEdit] = useState<ProductoToEditType>(null);
    const [formData, setFormData] = useState<ProductoFormData>({
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
    });

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        setLoading(true);
        try {
            const res = await axios.get<Producto[]>(`${API_BASE}/products`);
            setProductos(res.data);
        } catch (error) {
            console.error("Error fetching products", error);
            Swal.fire("Error", "No se pudieron cargar los productos", "error");
        } finally {
            setLoading(false);
        }
    };

    const createProducto = async (data: ProductoFormData) => {
        setLoading(true);
        try {
            const res = await axios.post<Producto>(`${API_BASE}/products`, {
                ...data,
                price: Number(data.price),
            });
            setProductos((prev) => [...prev, res.data]);
            Swal.fire("Creado", "Producto creado correctamente", "success");
        } catch (error) {
            console.error("Error creating product", error);
            Swal.fire("Error", "No se pudo crear el producto", "error");
        } finally {
            setLoading(false);
        }
    };

    const updateProducto = async (id: number, data: ProductoFormData) => {
        setLoading(true);
        try {
            const res = await axios.put<Producto>(`${API_BASE}/products/${id}`, {
                ...data,
                price: Number(data.price),
            });
            setProductos((prev) =>
                prev.map((p) => (p.id === id ? res.data : p))
            );
            Swal.fire("Actualizado", "Producto actualizado correctamente", "success");
        } catch (error) {
            console.error("Error updating product", error);
            Swal.fire("Error", "No se pudo actualizar el producto", "error");
        } finally {
            setLoading(false);
        }
    };

    const deleteProducto = async (id: number) => {
        const result = await Swal.fire({
            title: "¿Está seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            setLoading(true);
            try {
                await axios.delete(`${API_BASE}/products/${id}`);
                setProductos((prev) => prev.filter((p) => p.id !== id));
                Swal.fire("Eliminado", "Producto eliminado correctamente", "success");
            } catch (error) {
                console.error("Error deleting product", error);
                Swal.fire("Error", "No se pudo eliminar el producto", "error");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return {
        productos,
        loading,
        productoToEdit,
        setProductoToEdit,
        formData,
        setFormData,
        fetchProductos,
        createProducto,
        updateProducto,
        deleteProducto,
        handleInputChange,
    };
}
export default useProducto;