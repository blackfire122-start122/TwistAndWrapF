import React from "react";
import styles from "../../styles/components/createProduct.module.css";

export default function ProductFormButton() {
    return (
        <button className={styles.buttonForm} type="submit">
            Create
        </button>
    );
}
