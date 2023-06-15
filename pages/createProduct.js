import { useState, useEffect } from "react";
import styles from "../styles/components/createProduct.module.css";
import client from "../lib/axios";
import ProductFormHeader from "../components/createProduct/ProductFormHeader";
import ProductFormFields from "../components/createProduct/ProductFormFields";
import ProductFormButton from "../components/createProduct/ProductFormButton";
import {useRouter} from "next/router";

export default function ProductForm() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [types, setTypes] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        description: "",
    });

    useEffect(() => {
        client.get("user/getUser").then((response) => {
            setUser(response.data);
        });
    }, []);

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
                router.push("/")
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={styles.container}>
            <ProductFormHeader user={user} />
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
