import React from "react";
import styles from "../../styles/components/createProduct.module.css";

export default function ProductFormHeader({ addText }) {
    return (
        <div className={styles.leftInfo}>
            {addText && <span className={styles.SpanAdd}>{addText}</span>}
            <h1>Create Product</h1>
        </div>
    );
}
