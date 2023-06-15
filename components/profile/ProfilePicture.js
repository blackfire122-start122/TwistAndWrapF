import React from "react";
import styles from "../../styles/components/profile.module.css";

export default function ProfileLeft({ image, handleLogout }) {
    return (
        <div className={styles.profileLeft}>
            <img src={image} alt="Profile Picture" className={styles.picture} />
            <button onClick={handleLogout} className={styles.logout_btn}>Logout</button>
        </div>
    )
}
