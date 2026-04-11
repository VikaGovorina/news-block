import type { NewsItem } from "../../../../types/news";

interface RubricLayoutProps {
    news: NewsItem;
    showImg: boolean;
}

export default function RubricLayout({ news, showImg }: RubricLayoutProps) {
    return (
        <div>RubricLayout</div>
    );
}