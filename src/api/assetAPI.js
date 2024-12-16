import axiosClient from "./axiosClient";

class AssetAPI {
    uploadImage = (key, file) => {
        const url = 'assets/upload-image';
        const formData = new FormData();

        formData.append('Key', key);
        formData.append('File', file);

        return axiosClient.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    deleteImage = (publicId) => {
        const url = 'assets/delete-image';
        return axiosClient.post(url, { publicId });
    }
}

const assetAPI = new AssetAPI();
export default assetAPI;