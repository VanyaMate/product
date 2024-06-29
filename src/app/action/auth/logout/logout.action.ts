import { request } from '@/app/lib/fetch/request.ts';
import { isDomainUser } from 'product-types/dist/user/DomainUser';


export const logoutAction = () => request(`authentication/logout`, { method: 'post' }, isDomainUser);