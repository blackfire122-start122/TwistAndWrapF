import React from "react";
import styles from "../../styles/components/profile.module.css";

export default function SuccessMessage() {
    return <p className={`${styles.successMessage} ${styles.success}`}>User updated successfully.</p>;
}
