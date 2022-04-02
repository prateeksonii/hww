import { db } from "~/utils/db.server";
import jobs from "../services/csvParser/jobs.json";

// const db = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function seed() {
  for (let i = 0; i < getJobs().length; i++) {
    const job = getJobs()[i];
    await db.job.create({
      data: {
        name: job.name,
        remote: job.remote,
        url: job.url,
        process: job.process,
        cities: {
          connectOrCreate: job.cities.map((city) => ({
            create: city,
            where: { name: city.name },
          })),
        },
        countries: {
          connectOrCreate: job.countries.map((country) => ({
            create: country,
            where: { name: country.name },
          })),
        },
        keywords: {
          connectOrCreate: job.keywords.map((keyword) => ({
            create: keyword,
            where: { name: keyword.name },
          })),
        },
      },
    });
  }
}

seed();

function getJobs() {
  return jobs.map((job) => {
    return {
      name: job.Name,
      url: job.URL,
      cities:
        job.Cities?.split(",").map((city) => ({ name: city.trim() })) || [],
      countries:
        job.Countries?.split(",").map((country) => ({
          name: country.trim(),
        })) || [],
      remote: job["Remote OK?"]?.toLowerCase() === "checked" || false,
      process: job.Process ?? "No process description provided",
      keywords:
        job.Keywords?.split(",").map((keyword) => ({
          name: keyword.trim(),
        })) || [],
    };
  });
}
