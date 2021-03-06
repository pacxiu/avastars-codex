import { makeRequest } from 'services/http';
import { NextApiRequest } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { AvastarType, GenderType, RarityType } from 'server/models/AvastarCollection';
import { AvastarUbType } from 'server/models/AvastarUbCollection';

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
  traitRarityCountRarity?: RarityType;
  traitRarityCountRange: string[];
  traits?: string | string[];
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
  console.info('query for avastars:', query);

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

export interface GetAvastarUbQueryParams {
  id: string;
}

export interface GetAvastarUbResponse {
  data: AvastarUbType | null;
}

export const requestAvastarUb = (
  queryParams?: GetAvastarUbQueryParams,
  req?: NextApiRequest
): Promise<GetAvastarUbResponse> => {
  const defaultQuery = {};
  const query = getQueryParams({ ...defaultQuery, ...queryParams });

  return makeRequest(`${getReqBaseUrl(req)}/api/getAvastarUb/?${query}`);
};
