import { Country } from "@prisma/client";
import type { FC } from "react";
import { HiSearch } from "react-icons/hi";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
} from "remix";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  const countries = await db.country.findMany();
  return json({
    countries,
  });
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const search = data.get("search") as string;

  const searchParams = new URLSearchParams({ q: search });

  if (!search || search === "") {
    return redirect(`/jobs/1`);
  }

  return redirect(`/jobs/search?${searchParams}`);
};

const JobsPage: FC = () => {
  const { countries } = useLoaderData() as { countries: Country[] };

  return (
    <main className="py-8 px-8 mx-auto">
      <h1 className="font-bold text-4xl">Jobs</h1>
      <div className="py-8 grid grid-cols-[20%_80%] gap-8">
        <div className="shadow-2xl h-full p-4 rounded">
          <menu className="w-full p-2">
            <h2 className="text-2xl mb-8">Filters</h2>
            <div className="shadow">
              <label
                htmlFor="countries"
                className="text-lg font-bold block mb-2"
              >
                Countries
              </label>
              <select multiple className="bg-dark w-full scrollbar">
                {countries.map((country) => (
                  <option value={country.id} key={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </menu>
        </div>
        <div className="px-8">
          <Form action="." method="post">
            <label htmlFor="search" className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search jobs"
                className="bg-primary-dark p-3 text-xl w-full rounded"
              />
              {/* <input type="hidden" value="" name="searchBtn" /> */}
              <button type="submit">
                <HiSearch className="absolute right-5 top-0 text-lg" />
              </button>
            </label>
          </Form>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default JobsPage;
