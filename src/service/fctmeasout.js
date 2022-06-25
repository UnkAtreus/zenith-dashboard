import { axiosAuthInstance } from './axios';

const FctmeasoutService = {
	async list(id, measure) {
		const { data } = await axiosAuthInstance.get(`fctmeasout?id=${id}&measure=${measure}`);

		const $data = data.data;

		return $data;
	}
};

export default FctmeasoutService;
