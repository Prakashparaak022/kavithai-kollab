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
  KAVITHAI_POST: `${BASE_URL}/api/v1/posts/create`,
  KAVITHAI_ALL: `${BASE_URL}/api/v1/posts/all`,
  KAVITHAI_BY_ID: `${BASE_URL}/api/v1/posts`,
  KAVITHAI_LIKE: `${BASE_URL}/api/v1/posts/`,
  MY_POSTS: `${BASE_URL}/api/v1/posts/my-posts`,
  CATEGORY_ALL: `${BASE_URL}/api/v1/categories/all`,
  COMMENTS: `${BASE_URL}/api/v1/comments/post/`,
  COMMENTS_ADD: `${BASE_URL}/api/v1/comments/add`,
  COLLABS: `${BASE_URL}/api/v1/posts/collaborations/`,
  COLLABS_ADD: `${BASE_URL}/api/v1/posts/collaborations`,
  COLLAB_DECISION: `${BASE_URL}/api/v1/posts/collaborations/decision`,
  COLLAB_INVITE: `${BASE_URL}/api/v1/posts/collaborations/invite`,
  MY_COLLABS: `${BASE_URL}/api/v1/posts/collaborations/my-collaborations`,
  COLLAB_ACCEPT: `${BASE_URL}/api/v1/posts/collaborations/accept/`,
  COLLAB_REJECT: `${BASE_URL}/api/v1/posts/collaborations/reject/`,
  USER_PROFILE_LIST: `${BASE_URL}/api/v1/user-profile/list`,
  USER_PROFILE_BY_ID: `${BASE_URL}/api/v1/user-profile/`,
  USER_PROFILE_UPDATE: `${BASE_URL}/api/v1/user-profile/updateUserProfile/`,
};
