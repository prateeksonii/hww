import type { FC } from "react";
import { Outlet } from "remix";

const JobsPage: FC = () => {
  return (
    <main className="py-8 w-2/3 mx-auto">
      <h1 className="font-bold text-4xl">Jobs</h1>
      <Outlet />
    </main>
  );
};

export default JobsPage;
