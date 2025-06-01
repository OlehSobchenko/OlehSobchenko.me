import { redirect } from 'next/navigation';

export default function redirectTo(url: string) {
    return redirect(url);
}
