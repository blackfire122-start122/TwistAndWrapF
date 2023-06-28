import styles from '../../styles/components/OrderFoodInBar.module.css';

const SelectFood = ({searchFood,AddFood,RemoveFood}) => {
    return (
        <div>
            <p className={styles.selectFoodText}>Select food:</p>
            <div className={styles.checkboxList}>
                {searchFood.map((f) => (
                    <label key={f.id} className={styles.checkboxListItem}>
                        {f.name}
                        <input id={"checkbox"+f.id} type="checkbox" className={styles.checkboxInput} onChange={(event)=>{
                            if (event.target.checked) {
                                AddFood(f.id)
                            }else{
                                RemoveFood(f.id)
                            }
                        }} />
                        <img className={styles.imgFood} src={"http://localhost/"+f.image} alt={f.name}/>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default SelectFood;
