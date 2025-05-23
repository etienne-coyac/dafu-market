import api from "../services/api";

export const importCsv = (file: File, idMagasin: number) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`/admin/csv?idMagasin=${idMagasin}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}