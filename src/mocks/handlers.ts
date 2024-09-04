import { IArticle, IGetArticlesResponse, IGetSourcesResponse, ISource } from '@app-types/index';
import { delay, http, HttpResponse } from 'msw';

const defaultArticleList: IArticle[] = [
  {
    source: { id: 1, name: 'source 1' },
    author: 'Author from source 1',
    title: 'Test 1',
    description: '',
    url: '',
    urlToImage: '',
    publishedAt: '2020-01-01',
    content: '',
  },
  {
    source: { id: 1, name: 'source 1' },
    author: 'Author from source 1',
    title: 'Test 2',
    description: '',
    url: '',
    urlToImage: '',
    publishedAt: '2020-01-01',
    content: '',
  },
  {
    source: { id: 1, name: 'source 1' },
    author: 'Author from source 1',
    title: 'Test 3',
    description: '',
    url: '',
    urlToImage: '',
    publishedAt: '2020-01-02',
    content: '',
  },
  {
    source: { id: 2, name: 'source 2' },
    author: 'Author from source 2',
    title: 'Test 4',
    description: '',
    url: '',
    urlToImage: '',
    publishedAt: '2020-01-02',
    content: '',
  },
];

const sourceList: ISource[] = [
  {
    id: 1,
    name: 'source 1',
    description: '',
    url: '',
    category: '',
    language: '',
    country: '',
  },
  {
    id: 2,
    name: 'source 2',
    description: '',
    url: '',
    category: '',
    language: '',
    country: '',
  },
];

export const handlers = [
  http.get<{}, null, IGetArticlesResponse>('https://newsapi.org/v2/top-headlines', async ({ request }) => {
    await delay(200);

    const url = new URL(request.url);
    const searchInput = url.searchParams.get('q');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const source = url.searchParams.get('sources');

    let filteredArticleList = defaultArticleList;

    if (searchInput) {
      filteredArticleList = filteredArticleList.filter(({ title }) =>
        title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (from) {
      filteredArticleList = filteredArticleList.filter(({ publishedAt }) => new Date(publishedAt) > new Date(from));
    }

    if (to) {
      filteredArticleList = filteredArticleList.filter(({ publishedAt }) => new Date(publishedAt) < new Date(to));
    }

    if (source) {
      filteredArticleList = filteredArticleList.filter(
        ({ source: articleSource }) => articleSource.id === Number(source)
      );
    }

    return HttpResponse.json({
      status: 'ok',
      totalResults: filteredArticleList.length,
      articles: filteredArticleList,
    });
  }),
  http.get<{}, null, IGetSourcesResponse>('https://newsapi.org/v2/top-headlines/sources', async () => {
    await delay(200);
    return HttpResponse.json({
      status: 'ok',
      sources: sourceList,
    });
  }),
];
