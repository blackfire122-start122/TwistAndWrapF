import React from "react";
import styles from "../../styles/components/profile.module.css";

export default function ProfilePicture({ image }) {
    return <img src={image} alt="Profile Picture" className={styles.picture} />;
}
