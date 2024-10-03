// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: "sale" | "rent";
  user_rating: number;
  house_area: number;
};
