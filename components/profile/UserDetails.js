import React from "react";
import styles from "../../styles/components/profile.module.css";
import UpdateButton from "./UpdateButton";

export default function UserDetails({ name, email, phone, handleNameChange, handleEmailChange, handlePhoneChange,handlePictureChange,handleUpdate }) {
    return (
        <div className={styles.details}>
            <div>
                <p>Username:</p>
                <input type="text" value={name} onChange={handleNameChange} className={styles.input} />
            </div>

            <div>
                <p>Email:</p>
                <input type="email" value={email} onChange={handleEmailChange} className={styles.input} />
            </div>

            <div>
                <p>Phone:</p>
                <input type="text" value={phone} onChange={handlePhoneChange} className={styles.input} />
            </div>
            <div>
                <input className={styles.input} type="file" accept="image/*" onChange={handlePictureChange} />
            </div>
            <UpdateButton handleClick={handleUpdate} />
        </div>
    );
}
