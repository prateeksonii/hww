import { FC } from "react";
import { useNavigate } from "remix";

interface PaginationProps {
  page: number;
  count: number;
}

const Pagination: FC<PaginationProps> = ({ page, count }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex gap-4 items-center justify-end my-8">
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
      <div className="text-xl">
        Showing{" "}
        <span className="text-primary font-bold">
          {(page - 1) * 10 + 1} to {page * 10}
        </span>{" "}
        of {count} jobs
      </div>
    </>
  );
};

export default Pagination;
