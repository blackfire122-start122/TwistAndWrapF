import React from "react";
import styles from "../../styles/components/registerBar.module.css";

export default function BarRegistrationFormButton() {
    return (
        <button className={styles.submitButton} type="submit">
            Register
        </button>
    );
}
