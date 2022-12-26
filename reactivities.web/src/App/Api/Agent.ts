import axios, { AxiosResponse } from 'axios';
import { Activity } from '../Models/Activity';


axios.defaults.baseURL = 'https://localhost:7282/Reactivities/Api';


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
};

axios.interceptors.response.use(async response => {

    try {
        await sleep(1000);
        return response;
    }
    catch (error) {

        return await Promise.reject(error);
    }


})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {

    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody) 
    
}


const Activities = {

    list: () => requests.get<Activity[]>('/Activities/List'),
    create: (activity: Activity) => requests.post<Activity>('/Activities/Create', activity),
    update: (activity: Activity) => requests.put<Activity>(`/Activities/Update/${activity.id}`, activity),
    delete: (id: string) => requests.delete<Activity>(`/Activities/Delete/${id}`)



}



const Agent = {

    Activities
};


export default Agent;