import axiosClient from "./axiosClient";

class DetailShopAPI {
    getAll = (shopID, pageIndex, pageSize, searchText, column, sort) => {
        let url = `shop-detail/${shopID}?`

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

    addDetail = (shopID, productID, quantity) => {
        const url = 'shop-detail';
        return axiosClient.post(url, { shopID, productID, quantity })
    }

    updateDetail = (shopID, productID, quantity) => {
        const url = 'shop-detail';
        return axiosClient.put(url, { shopID, productID, quantity })
    }

    deleteDetail = (shopID, productID) => {
        const url = `shop-detail/${shopID}/${productID}`;
        return axiosClient.delete(url);
    }
}

const detailShopAPI = new DetailShopAPI();
export default detailShopAPI;