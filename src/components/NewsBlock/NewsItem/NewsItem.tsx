import type { NewsItem } from "../../../types/news";
import NewsLayout from "../layout/NewsLayout/NewsLayout";
import RubricLayout from "../layout/RubricLayout/RubricLayout";

interface NewsItemProps {
    news: NewsItem;
    state: string;
    index: number;
    isMobile: boolean;
    page: number;
}

export default function NewsItem({ news, state, index, isMobile, page }: NewsItemProps) {

    if (state === 'news') {
        return <NewsLayout
            news={news}
            showImg={!isMobile || index === 0}
        />;
    }

    if (state === 'rubric') {
        return <RubricLayout
            news={news}
            showImg={index === 0}
            isTopNews={page === 1 && index === 0}
        />;
    }

    return null;
}