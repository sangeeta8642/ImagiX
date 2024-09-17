// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { redirect } from 'next/navigation';

// import { protectServer } from '@/features/auth/utils';

// export default async function Home() {
//   await protectServer();

//   redirect('/editor/project-1');
// }

import { protectServer } from '@/features/auth/utils';

import Banner from './_components/banner';

export default async function Home() {
  await protectServer();

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-y-6 pb-10">
      <Banner />
    </div>
  );
}