"use client"
import Editor from '@/features/editor/components/editor';
import { protectServer } from '@/features/auth/utils';
import { useGetProject } from '@/features/projects/hooks/query';
import { Loader, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EditorProjectIdPageProps {
    params: {
        projectId: string
    }
}

export default function EditorProjectIdPage({
    params
}: EditorProjectIdPageProps) {

    const { data, isLoading, isError } = useGetProject(params.projectId)

    if (isLoading || !data) {
        return (
            <div className='h-full flex flex-col items-center 
            justify-center'>
                <Loader className='size-6 animate-spin 
                text-muted-foreground' />
            </div>
        )
    }

    if (isError) {
        return (

            <div className='h-full flex flex-col gap-y-5 items-center
        justify-center'>
                <TriangleAlert className='size-6 text-muted-foreground' />
                <p className='text-muted-foreground text-sm'>
                    Failed ti fetch project
                </p>
                <Button asChild variant="secondary" >
                    <Link href='/'>
                        Back to home
                    </Link>
                </Button>
            </div>
        )
    }



    return <Editor initialData={data} />;
}