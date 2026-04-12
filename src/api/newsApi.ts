import { ENV } from "../config/env"
import type { EmptyNewsResponse, NewsResponse } from "../types/news";

const BASE_URL = `${ENV.BASE_NEWS_URL}/api/v1`;

async function request<T>(url: string, params?: Record<string, string | number>): Promise<T> {
    const query = params
        ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
        : "";

    const response = await fetch(`${BASE_URL}${url}${query}`);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
}

export const NewsApi = {
    async getNews(page: number, perPage: number = 3): Promise<NewsResponse> {
        return request<NewsResponse>("/news/feed/company/short", {
            perPage,
            page,
        });
    },

    async getEmptyNews(page: number = 1, perPage: number = 3): Promise<EmptyNewsResponse> {
        return request<EmptyNewsResponse>("/news/feed/company/empty", {
            perPage,
            page,
        });
    },
};