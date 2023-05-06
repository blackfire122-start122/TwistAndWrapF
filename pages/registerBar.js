import { useState } from "react";
import styles from "../styles/components/registerBar.module.css";
import client from "../lib/axios";

export default function BarRegistrationForm() {
    const [addText, setAddText] = useState("");
    const [formData, setFormData] = useState({
        address: "",
        password: "",
        confirmPassword: "",
        longitude: "",
        latitude: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const data = {
            address: formData.address,
            password: formData.password,
            longitude: formData.longitude,
            latitude: formData.latitude,
        };

        client
            .post("admin/registerBar", data)
            .then((response) => {
                setAddText("Bar registered successfully! Id="+response.data.idBar);
                setTimeout(() => {
                    setAddText("");
                }, 5000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftInfo}>
                {addText ? <span className={styles.SpanAdd}>{addText}</span> : null}
                <h1>Register a Bar</h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                        LngLatX:
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
                        LngLatY:
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
                <button className={styles.submitButton} type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}
