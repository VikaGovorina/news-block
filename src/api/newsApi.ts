import axios from "axios"
import { ENV } from "../config/env"
import type { NewsResponse } from "../types/news";


const api = axios.create({
    baseURL: `${ENV.BASE_NEWS_URL}/api/v1`,
});

export const NewsApi = {
    async getNews(page: number, perPage: number = 3): Promise<NewsResponse> {
        const { data } = await api.request({
            method: 'GET',
            url: '/news/feed/company/short',
            params: {
                perPage,
                page
            }
        });

        return data;
    }
}