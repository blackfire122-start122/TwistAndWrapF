import { useState } from 'react';
import styles from '../styles/components/login.module.css';
import client from "../lib/axios";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await client.post('user/register', JSON.stringify({
                username,
                password,
                email
            }));
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Register</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Username:
                    <input name="username" className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className={styles.label}>
                    Email:
                    <input type="email" name="email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className={styles.label}>
                    Password:
                    <input type="password" name="password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit" className={styles.button}>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
