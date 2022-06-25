import { axiosAuthInstance } from './axios';

const RateSummaryService = {
	async list(id) {
		const { data } = await axiosAuthInstance.get(`/rate-summary?id=${id}`);

		const $data = data.data;

		return $data;
	}
};

export default RateSummaryService;
