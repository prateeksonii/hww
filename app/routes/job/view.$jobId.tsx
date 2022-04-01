import { City, Country, Job, Keyword } from "@prisma/client";
import type { FC } from "react";
import {
  HiCheckCircle,
  HiExternalLink,
  HiOutlineArrowCircleLeft,
  HiXCircle,
} from "react-icons/hi";
import { LoaderFunction, redirect, useLoaderData, useNavigate } from "remix";
import { db } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  const { jobId } = params;

  if (!jobId || isNaN(+jobId)) {
    return redirect("/jobs");
  }

  const job = await db.job.findUnique({
    where: { id: +jobId },
    include: {
      cities: true,
      countries: true,
      keywords: true,
    },
  });

  return { job };
};

const JobView: FC = () => {
  const navigate = useNavigate();
  const { job } = useLoaderData() as {
    job: Job & {
      cities: City[];
      countries: Country[];
      keywords: Keyword[];
    };
  };
  return (
    <div className="py-8 w-2/3 mx-auto">
      <button onClick={() => navigate(-1)}>
        <HiOutlineArrowCircleLeft size={48} className="mb-8" />
      </button>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">{job.name}</h1>
        <div className="flex items-center gap-2 text-xl">
          Remote OK?
          {job.remote ? (
            <HiCheckCircle className="text-green-400 text-2xl" />
          ) : (
            <HiXCircle className="text-red-400 text-2xl" />
          )}
        </div>
      </div>
      <p className="mt-4 text-lg">{job.process}</p>
      <div className="mt-8 flex items-center flex-wrap gap-4">
        Countries:
        {job.countries.map((country) => (
          <div key={country.id} className="px-4 py-2 bg-primary-dark rounded">
            {country.name}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center flex-wrap gap-4">
        Cities:
        {job.cities.map((city) => (
          <div key={city.id} className="px-4 py-2 bg-primary-dark rounded">
            {city.name}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center flex-wrap gap-2">
        Keywords:
        {job.keywords.map((keyword) => (
          <div
            key={keyword.id}
            className="px-4 py-2 bg-primary-dark rounded-full"
          >
            #{keyword.name}
          </div>
        ))}
      </div>
      <a
        href={job.url}
        className="mt-8 flex gap-2 items-center bg-primary text-black w-max px-4 py-2 rounded font-bold text-lg"
        target="_blank"
        rel="noreferrer"
      >
        <HiExternalLink size={24} />
        Visit
      </a>
    </div>
  );
};

export default JobView;
