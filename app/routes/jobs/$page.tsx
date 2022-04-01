import { Job } from "@prisma/client";
import { LoaderFunction, useLoaderData, useNavigate } from "remix";
import { db } from "~/utils/db.server";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export const loader: LoaderFunction = async ({ params }) => {
  const page = params.page ? +params.page : 1;
  const jobs = await db.job.findMany({ take: 10, skip: (page - 1) * 10 });

  return { jobs, page };
};

export default function JobsIndex() {
  const navigate = useNavigate();

  const { jobs, page } = useLoaderData() as { jobs: Job[]; page: number };

  return (
    <div className="mt-8">
      <div className="flex gap-4 items-center justify-end mb-8">
        <button
          disabled={page === 1}
          className="w-max px-6 py-3 text-lg bg-primary text-black font-bold rounded disabled:bg-gray-400"
          onClick={() => navigate(`/jobs/${page - 1}`)}
        >
          Previous
        </button>
        <button
          className="w-max px-6 py-3 text-lg bg-primary text-black font-bold rounded disabled:bg-gray-400"
          onClick={() => navigate(`/jobs/${page + 1}`)}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-2 gap-16">
        {jobs.map((job) => {
          return (
            <div
              key={job.id}
              className="shadow-2xl p-8 rounded-xl flex flex-col cursor-pointer"
              onClick={() => navigate(`/job/view/${job.id}`)}
            >
              <div className="text-2xl font-bold">{job.name}</div>
              <div className="mt-4 text-lg text-ellipsis overflow-clip flex-1">
                {job.process}
              </div>
              <div className="mt-8 flex items-center gap-2">
                Remote OK?
                {job.remote ? (
                  <HiCheckCircle className="text-green-400 text-2xl" />
                ) : (
                  <HiXCircle className="text-red-400 text-2xl" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 items-center justify-end mt-8">
        <button
          disabled={page === 1}
          className="w-max px-6 py-3 text-lg bg-primary text-black font-bold rounded disabled:bg-gray-400"
          onClick={() => navigate(`/jobs/${page - 1}`)}
        >
          Previous
        </button>
        <button
          className="w-max px-6 py-3 text-lg bg-primary text-black font-bold rounded disabled:bg-gray-400"
          onClick={() => navigate(`/jobs/${page + 1}`)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
