import { useState, useEffect, } from "react";
import client from "../lib/axios";
import styles from "../styles/components/profile.module.css";
import Link from "next/link";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        client.get("/getUser").then((response) => {
            UpdateUser(response.data)
        });
    }, []);

    function handlePictureChange(event) {
        setPicture(event.target.files[0]);
    }

    function UpdateUser(respData){
        respData.Image = "http://localhost/"+respData.Image
        setUser(respData);
        setName(respData.Username)
    }
    function handleUpdate() {
        const formData = new FormData();

        formData.append("Image", picture);
        formData.append("Username", name);
        formData.append("Email", "ew");
        formData.append("Phone", "04954009320");

        client.put("/changeUser", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            UpdateUser(response.data)
        });
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Profile</h1>
            <div className={styles.profile}>
                <img id="userImg" src={user.Image} alt="Profile Picture" className={styles.picture} />
                <div className={styles.details}>
                    <p>Username:</p>
                    <input className={styles.input} type="text" value={name} onChange={(event) =>{
                        setName(event.target.value)
                    }}/>
                    <input type="file" accept="image/*" onChange={handlePictureChange} />
                    <button className={styles.button} onClick={handleUpdate}>Update</button>
                </div>
            </div>
            {
                user.IsAdmin ? (
                    <>
                        <Link href="/createProduct">
                            <h4>Create product</h4>
                        </Link>
                        <Link href="/registerBar">
                            <h4>Create bar</h4>
                        </Link>
                    </>
                ) : null
            }
        </div>
    );
}
