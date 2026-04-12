import axios from "axios"
import { ENV } from "../config/env"
import type { EmptyNewsResponse, NewsResponse } from "../types/news";

const api = axios.create({
    baseURL: `${ENV.BASE_NEWS_URL}`,
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
    },

    async getEmptyNews(page: number = 1, perPage: number = 3): Promise<EmptyNewsResponse> {
        const { data } = await api.request({
            method: 'GET',
            url: '/news/feed/company/empty',
            params: {
                perPage,
                page
            }
        });

        return data;
    }
}