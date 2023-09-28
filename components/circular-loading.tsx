import { Loader2 } from 'lucide-react';

interface CircularLoadingProps {
    className?: string;
}

export function CircularLoading({ className }: CircularLoadingProps) {
    return <Loader2 className={ "h-fit w-fit animate-spin dark:invert "+ className } />
}