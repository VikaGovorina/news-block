import { useEffect } from 'react';
import './App.css';
import { NewsApi } from './api/newsApi';

function App() {

    async function loadNews() {
        try {
            const newsData = await NewsApi.getNews(1, 3);
            console.log(newsData);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {

        }
    }

    useEffect(() => {
        
        loadNews();
        
    }, []);

    return (
        <>
            
        </>
    );
}

export default App;