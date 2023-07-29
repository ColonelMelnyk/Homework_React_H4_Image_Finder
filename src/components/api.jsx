import axios from 'axios';
const KEY = '36691330-f06414af311b17804c7b2f1b7';

const imagesApi = axios.create({
  baseURL: `https://pixabay.com/api/`,
});

export const fetchData = async (query, page) => {
  const response = await imagesApi.get('', {
    params: {
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      q: query,
      page,
    },
  });
  return response.data;
};