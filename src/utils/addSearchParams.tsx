type Params = {
  [key: string]: string | number | boolean;
};

function  addSearchParams(baseUrl: string, params: Params) {
  const url = new URL(baseUrl);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, String(params[key]))
  );
  return url.toString();
}

export default addSearchParams;
