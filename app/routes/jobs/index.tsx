import { useEffect } from "react";
import { useNavigate } from "remix";

export default function () {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/jobs/1");
  }, [navigate]);

  return <div>Redirecting to page 1</div>;
}
