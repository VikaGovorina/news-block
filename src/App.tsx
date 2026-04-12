import NewsBlock from './components/NewsBlock/NewsBlock';
import styles from './App.module.css';

function App() {

    return (
        <div className={styles.blocks}>
            <NewsBlock blockTitle='Бизнес' state='rubric' />
            <NewsBlock blockTitle='Важные новости' state='empty'/>
            <NewsBlock blockTitle='Новости компании' />
        </div>
    );
}

export default App;