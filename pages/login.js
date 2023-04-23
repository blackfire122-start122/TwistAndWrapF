import { useState } from "react";
import client from '../lib/axios';
import styles from "../styles/components/login.module.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await client.post("user/login", JSON.stringify({
                username: username,
                password: password
            }))
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Username:
                    <input
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className={styles.input}
                    />
                </label>
                <button type="submit" className={styles.button}>
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Login;
