import React from "react";
import styles from "../../styles/components/profile.module.css";

export default function ErrorMessage({ message }) {
    return <p className={`${styles.errorMessage} ${styles.error}`}>{message}</p>;
}
