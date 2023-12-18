import React from "react";
import styles from "../../styles/components/registerBar.module.css";

export default function BarRegistrationFormFields({ formData, handleInputChange }) {
    return (
        <>
            <div className={styles.formGroup}>
                <label className={styles.labelForm} htmlFor="address">
                    Address:
                </label>
                <input
                    className={styles.inputForm}
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.labelForm} htmlFor="longitude">
                    Longitude:
                </label>
                <input
                    className={styles.inputForm}
                    type="number"
                    step="0.001"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.labelForm} htmlFor="latitude">
                    Latitude:
                </label>
                <input
                    className={styles.inputForm}
                    type="number"
                    step="0.001"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.labelForm} htmlFor="password">
                    Password:
                </label>
                <input
                    className={styles.inputForm}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.labelForm} htmlFor="confirmPassword">
                    Confirm Password:
                </label>
                <input
                    className={styles.inputForm}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                />
            </div>
        </>
    );
}
