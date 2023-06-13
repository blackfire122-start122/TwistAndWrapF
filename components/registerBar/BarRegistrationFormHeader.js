import React from "react";
import styles from "../../styles/components/registerBar.module.css";

export default function BarRegistrationFormHeader({ addText }) {
    return (
        <div className={styles.leftInfo}>
            {addText && <span className={styles.SpanAdd}>{addText}</span>}
            <h1>Register a Bar</h1>
        </div>
    );
}
