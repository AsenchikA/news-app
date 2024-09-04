import { IGetErrorResponse } from '@app-types/index';
import { delay, http, HttpResponse } from 'msw';

export const errorHandlers = [
  http.get<{}, null, IGetErrorResponse>('https://newsapi.org/v2/top-headlines', async () => {
    await delay(200);

    return HttpResponse.json(
      {
        status: 'error',
        code: 'errorCode',
        message: 'Something went wrong',
      },
      {
        status: 500,
      }
    );
  }),
  http.get<{}, null, IGetErrorResponse>('https://newsapi.org/v2/top-headlines/sources', async () => {
    await delay(200);

    return HttpResponse.json(
      {
        status: 'error',
        code: 'errorCode',
        message: 'Something went wrong',
      },
      {
        status: 500,
      }
    );
  }),
];
