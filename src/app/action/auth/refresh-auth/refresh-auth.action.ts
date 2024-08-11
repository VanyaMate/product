import { request } from '@/app/lib/fetch/request.ts';
import { isDomainUserFull } from 'product-types/dist/user/DomainUserFull';


export const refreshAuthAction = () => request(`v1/authentication`, { method: 'GET' }, isDomainUserFull);