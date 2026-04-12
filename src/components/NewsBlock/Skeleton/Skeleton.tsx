import SkeletonNews from "./SkeletonNews/SkeletonNews";
import SkeletonRubric from "./SkeletonRubric/SkeletonRubric";

interface SkeletonProps {
    state: string;
    perPage: number;
    isMobile: boolean;
}

export default function Skeleton({ state, perPage, isMobile }: SkeletonProps) {

    if (state === 'news') {
        return <SkeletonNews perPage={perPage} isMobile={isMobile} />
    }

    return <SkeletonRubric perPage={perPage} />
}