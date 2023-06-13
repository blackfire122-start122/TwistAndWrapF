import React from "react";
import styles from "../../styles/components/profile.module.css";

export default function UpdateButton({ handleClick }) {
    return <button onClick={handleClick} className={styles.button}>Update</button>;
}
