import styles from '../../styles/components/OrderFoodInBar.module.css';

const ErrorOrderFood = ({error}) => {
    return (
        <>
            {error ? <span className={styles.error}>{error}</span>:null}
        </>
    );
};

export default ErrorOrderFood;
