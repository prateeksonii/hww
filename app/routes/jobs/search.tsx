import { Job } from "@prisma/client";
import { LoaderFunction, useLoaderData, useNavigate } from "remix";
import { db } from "~/utils/db.server";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("q") as string;
  const jobs = await db.job.findMany({
    where: {
      name: {
        mode: "insensitive",
        contains: searchQuery,
      },
    },
  });
  return { jobs };
};

export default function JobsSearch() {
  const navigate = useNavigate();

  const { jobs } = useLoaderData() as {
    jobs: Job[];
  };

  return (
    <div className="mt-8">
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
    </div>
  );
}
