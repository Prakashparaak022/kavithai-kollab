const API_VERSION = "/api/v1";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BRAND = process.env.NEXT_PUBLIC_BRAND;

export const API_URLS = {
  API_VERSION,
  BASE_URL,
  BRAND,
  LOGIN: `${BASE_URL}/api/v1/user-profile/login`,
  REGISTER: `${BASE_URL}/api/v1/user-profile/createUserProfile`,
  ISD_CODE: `${BASE_URL}/api/v1/user-profile/isd/retrieveAll`,
  BRAND_DETAILS:
    `${BASE_URL}/main-api-gateway/user-management-gateway/user-management/api/v1/user-profiles/getCurrencyDetailsByBrandName/` +
    BRAND,
};
