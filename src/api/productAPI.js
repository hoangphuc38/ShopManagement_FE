import axiosClient from "./axiosClient";

class ProductAPI {
    getAll = (pageIndex, pageSize, searchText, column, sort) => {
        let url = `product?`

        // Append pageIndex to the URL if it is not an empty string
        if (pageIndex !== "") {
            url += `PageIndex=${pageIndex}&`;
        }

        // Append pageSize to the URL if it is not an empty string
        if (pageSize !== "") {
            url += `PageSize=${pageSize}&`;
        }

        // Append searchText to the URL if it is not an empty string
        if (searchText !== "") {
            url += `SearchText=${encodeURIComponent(searchText)}&`;
        }

        // Append column to the URL if it is not an empty string
        if (column !== "") {
            url += `Column=${encodeURIComponent(column)}&`;
        }

        // Append sort to the URL if it is not an empty string
        if (sort !== "") {
            url += `Sort=${encodeURIComponent(sort)}&`;
        }

        // Remove the trailing "&" if there is one
        url = url.endsWith('&') ? url.slice(0, -1) : url;

        return axiosClient.get(url);
    }
}

const productAPI = new ProductAPI();
export default productAPI;