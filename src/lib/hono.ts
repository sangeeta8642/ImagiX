import { hc } from 'hono/client';

import { AppType } from '@/app/api/[[...route]]/route';


// export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
export const client = hc<AppType>(process.env.NEXTAUTH_URL!);
console.log(client)