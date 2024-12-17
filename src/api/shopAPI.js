import axiosClient from "./axiosClient";

class ShopAPI {
    getAllOfUser = (userID, pageIndex, pageSize, searchText, column, sort) => {
        let url = `shop/${userID}?`;

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

    getAll = (pageIndex, pageSize, searchText, column, sort) => {
        let url = `shop?`;

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

    addShop = (userID, shopName, shopAddress) => {
        const url = `shop/${userID}`;
        return axiosClient.post(url, { shopName, shopAddress })
    }

    updateShop = (shopID, shopName, shopAddress) => {
        const url = `shop/${shopID}`;
        return axiosClient.put(url, { shopName, shopAddress })
    }

    deleteShop = (shopID) => {
        const url = `shop/${shopID}`;
        return axiosClient.delete(url);
    }
}

const shopAPI = new ShopAPI();
export default shopAPI;