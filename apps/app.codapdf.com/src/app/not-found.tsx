import { Button } from "@/components/ui/button";
import Link from "next/link";

import notfound from "@/assets/illustrations/404.svg";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
      <div className="grid gap-2 text-center">
        <Image src={notfound} alt="Not Found" />
        <Link href="/dashboard">
          <Button>Go Back</Button>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
