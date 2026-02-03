import { API_URLS } from "@/constants/apiUrls";
import { ApiResponse, ApiUserProfile, ApiUsersParams } from "@/types/api";

export const fetchUserProfiles = async ({
  firstName = "",
  penName = "",
  lastName = "",
  state = "",
  city = "",
  gender = "",
  email = "",
  role = "USER",
  status = 1,
  phoneNo = "",
  page = 0,
  size = 25,
}: ApiUsersParams): Promise<ApiResponse<ApiUserProfile[]>> => {
  const query = new URLSearchParams({
    firstName,
    penName,
    lastName,
    state,
    city,
    gender,
    email,
    role,
    status: String(status),
    phoneNo,
    page: String(page),
    size: String(size),
  });

  const res = await fetch(`${API_URLS.USER_PROFILE_LIST}?${query.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch user profiles");
  }

  return res.json();
};