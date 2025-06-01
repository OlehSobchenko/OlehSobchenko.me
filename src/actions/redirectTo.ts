'use server';

import { redirect } from 'next/navigation';

export default async function redirectTo(url: string) {
    return redirect(url);
}
