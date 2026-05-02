// src/utils/getApiErrorMessage.js
export function getApiErrorMessage(error, fallback) {
  return (
    error.response?.data?.detail ||
    error.response?.data?.error ||
    error.response?.data?.email?.[0] ||
    error.response?.data?.password?.[0] ||
    fallback
  );
}
