import { request } from '@/app/lib/fetch/request.ts';
import { isDomainUser } from 'product-types/dist/user/DomainUser';


export const refreshAuthAction = () => request(`v1/authentication`, { method: 'GET' }, isDomainUser);