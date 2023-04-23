import { useState, useEffect } from "react";
import styles from "../styles/components/createProduct.module.css";
import client from "../lib/axios";

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
        data.append("Name", formData.name);
        data.append("Description", formData.description);
        data.append("Type", formData.type);
        data.append("File", selectedFile);

        client
            .post("admin/createProduct", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setAddText("Add "+formData.name)
                setTimeout(()=>{
                    setAddText("")
                }, 5000)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftInfo}>
                {addText ? <span className={styles.SpanAdd}>{addText}</span>:null}
                <h1>Create Product</h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.labelForm} htmlFor="name">Name:</label>
                    <input
                        className={styles.inputForm}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.labelForm} htmlFor="description">Description:</label>
                    <input
                        className={styles.inputForm}
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.labelForm} htmlFor="type">Type:</label>
                    <select
                        className={styles.selectForm}
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select type</option>
                        {types.map((type) => (
                            <option key={type.Id} value={type.Id}>
                                {type.Type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.labelForm} htmlFor="file">Image:</label>
                    <input
                        className={styles.inputForm}
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button className={styles.buttonForm} type="submit">Create</button>
            </form>
        </div>
    );
}
