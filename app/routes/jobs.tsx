import type { FC } from "react";
import { HiSearch } from "react-icons/hi";
import { ActionFunction, Form, Outlet, redirect } from "remix";
import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const search = data.get("search") as string;

  const searchParams = new URLSearchParams({ q: search });

  return redirect(`/jobs/search?${searchParams}`);
};

const JobsPage: FC = () => {
  return (
    <main className="py-8 px-8 mx-auto">
      <h1 className="font-bold text-4xl">Jobs</h1>
      <div className="py-8 grid grid-cols-[20%_80%] gap-8">
        <div className="shadow-2xl h-full p-4 rounded">
          <Form action="." method="post">
            <label htmlFor="search" className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search jobs"
                className="bg-primary-dark p-2 text-lg w-full rounded"
              />
              <button type="submit">
                <HiSearch className="absolute right-5 top-0 text-lg" />
              </button>
            </label>
          </Form>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default JobsPage;
