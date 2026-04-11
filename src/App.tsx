import NewsBlock from './components/NewsBlock/NewsBlock';
import styles from './App.module.css';

function App() {

    return (
        <div className={styles.blocks}>
            <NewsBlock blockTitle='Новости компании' />
            <div style={{width:'500px'}}></div>
            <NewsBlock blockTitle='Бизнес' state='rubric'/>
        </div>
    );
}

export default App;