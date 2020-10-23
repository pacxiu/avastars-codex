import { makeRequest } from 'services/http';
import { NextApiRequest } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { AvastarType, GenderType, RarityType } from 'server/models/AvastarCollection';

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
  gender?: GenderType;
  rarity?: RarityType;
  series?: string;
  from: string;
  size: string;
  owner?: string;
}

export interface GetAvastarsResponse {
  data: AvastarType[] | [];
  total: number;
}

export const requestAvastars = (
  queryParams?: GetAvastarsQueryParams,
  req?: NextApiRequest
): Promise<GetAvastarsResponse> => {
  const defaultQuery = {};
  const query = getQueryParams({ ...defaultQuery, ...queryParams });
  console.log('query for avastars:', query);

  return makeRequest(`${getReqBaseUrl(req)}/api/getAvastars/?${query}`);
};

export interface GetAvastarQueryParams {
  id: string;
}

export interface GetAvastarResponse {
  data: AvastarType | null;
}

export const requestAvastar = (
  queryParams?: GetAvastarQueryParams,
  req?: NextApiRequest
): Promise<GetAvastarResponse> => {
  const defaultQuery = {};
  const query = getQueryParams({ ...defaultQuery, ...queryParams });

  return makeRequest(`${getReqBaseUrl(req)}/api/getAvastar/?${query}`);
};
