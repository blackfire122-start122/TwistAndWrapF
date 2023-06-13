import { useState, useEffect } from "react";
import styles from "../styles/components/createProduct.module.css";
import client from "../lib/axios";
import ProductFormHeader from "../components/createProduct/ProductFormHeader";
import ProductFormFields from "../components/createProduct/ProductFormFields";
import ProductFormButton from "../components/createProduct/ProductFormButton";

export default function ProductForm() {
    const [types, setTypes] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [addText, setAddText] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
    });

    useEffect(() => {
        client.get("user/getTypes").then((response) => {
            setTypes(response.data);
        });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("type", formData.type);
        data.append("file", selectedFile);

        client
            .post("admin/createProduct", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setAddText("Add " + formData.name);
                setTimeout(() => {
                    setAddText("");
                }, 5000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={styles.container}>
            <ProductFormHeader addText={addText} />
            <form className={styles.form} onSubmit={handleSubmit}>
                <ProductFormFields
                    formData={formData}
                    types={types}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange}
                />
                <ProductFormButton />
            </form>
        </div>
    );
}
