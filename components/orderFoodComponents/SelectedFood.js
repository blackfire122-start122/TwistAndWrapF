import styles from '../../styles/components/OrderFoodInBar.module.css';

const SelectedFood = ({selectedFood,RemoveFood}) => {
    return (
        <ul className={styles.selectedFood}>
            {selectedFood.map((f) => (
                <li key={f.id} className={styles.selectedFoodItem}>
                    <p>{f.name}</p>
                    <img src={"http://localhost/"+f.image} alt={f.name} />
                    <input min="1" max="10" placeholder="Count food - 1-10" type="number" onChange={(event)=>{
                        f.count = event.target.value
                    }} />
                    <button type="button" onClick={() => RemoveFood(f.id)}>Remove</button>
                </li>
            ))}
        </ul>
    );
};

export default SelectedFood;
