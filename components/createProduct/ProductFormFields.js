import React from "react";
import styles from "../../styles/components/createProduct.module.css";

export default function ProductFormFields({formData, types, handleInputChange, handleFileChange}) {
    return (
        <>
            <div className={styles.formGroup}>
                <label className={styles.labelForm} htmlFor="name">
                    Name:
                </label>
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
                <label className={styles.labelForm} htmlFor="description">
                    Description:
                </label>
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
                <label className={styles.labelForm} htmlFor="type">
                    Type:
                </label>
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
                        <option key={type.id} value={type.id}>
                            {type.type}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.labelForm} htmlFor="file">
                    Image:
                </label>
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
        </>
    );
}
