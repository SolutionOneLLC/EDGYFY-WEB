import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import filter from "lodash/filter";
import mapValues from "lodash/mapValues";
import { useInfiniteQuery } from "react-query";

type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};

const fetchProducts = async ({ queryKey }: any) => {
	const [_key, _params] = queryKey;
	const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
	const filters = mapValues(_params, (p) => {
		return `${p}`.split(',')
	});

	const filteredData = filter(data, (product) => {
		Object.keys(filters)
		return product;
	});

	console.log(filters);
	return {
		data: shuffle(data),
		paginatorInfo: {
			nextPageUrl: "",
		},
	};
};

const useProductsQuery = (options: QueryOptionsType) => {
	return useInfiniteQuery<PaginatedProduct, Error>(
		[API_ENDPOINTS.PRODUCTS, options],
		fetchProducts,
		{
			getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
		}
	);
};

export { useProductsQuery, fetchProducts };
