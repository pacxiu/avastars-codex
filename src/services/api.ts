import { makeRequest } from 'services/http';
import { NextApiRequest } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { AvastarType, Gender, Rarity } from 'server/models/AvastarCollection';

const getQueryParams = (queryParams: ParsedUrlQuery) => {
  let query = '';

  Object.entries(queryParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((el) => {
        query += `&${key}=${el}`;
      });
    } else if (value !== undefined) {
      query += `&${key}=${value}`;
    }
  });

  return query;
};

export const getReqBaseUrl = (req?: NextApiRequest) => (req ? `http://${req.headers.host}` : '');

export interface GetAvastarsQueryParams {
  gender?: Gender;
  rarity?: Rarity;
  series?: string;
}

export interface GetAvastarsResponse {
  data: AvastarType[];
  total: number;
}

export const requestAvastars = (
  queryParams?: GetAvastarsQueryParams,
  req?: NextApiRequest
): Promise<GetAvastarsResponse> => {
  const defaultQuery = {};
  const query = getQueryParams({ ...defaultQuery, ...queryParams });
  console.log('query:', query);

  return makeRequest(`${getReqBaseUrl(req)}/api/getAvastars/?${query}`);
};
