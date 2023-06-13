import styles from "../../styles/components/home.module.css";
import Link from "next/link";

const OrderFoodButton = () => {
    return (
        <Link href="/orderFoodInBar">
            <button className={styles.btnOrder}>Order food</button>
        </Link>
    );
};

export default OrderFoodButton;