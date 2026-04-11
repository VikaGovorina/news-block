import type { NewsItem } from "../../../types/news";
import NewsLayout from "../layout/NewsLayout/NewsLayout";
import RubricLayout from "../layout/RubricLayout/RubricLayout";

interface NewsItemProps {
    news: NewsItem;
    state: string;
    index: number;
}

export default function NewsItem({ news, state, index }: NewsItemProps) {

    if (state === 'news') {
        return <NewsLayout news={news}/>;
    }

    if (state === 'rubric') {
        return <RubricLayout news={news} showImg={index === 0} />;
    }

    return null;
}