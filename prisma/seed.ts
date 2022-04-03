import { db } from "~/utils/db.server";
import jobs from "../services/csvParser/jobs.json";

async function seed() {
  await db.job.deleteMany();
  await db.keyword.deleteMany();
  await db.city.deleteMany();
  await db.country.deleteMany();

  await db.country.createMany({ data: getCountries(), skipDuplicates: true });
  await db.city.createMany({ data: getCities(), skipDuplicates: true });
  await db.keyword.createMany({ data: getKeywords(), skipDuplicates: true });
  await Promise.all(
    getJobs().map((job) =>
      db.job.create({
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
      })
    )
  );
}

seed();

function getCountries() {
  let countries = jobs.reduce((countries: { name: string }[], job) => {
    return [
      ...countries,
      ...(job.Countries?.split(",").map((country) => ({
        name: country.trim(),
      })) || []),
    ];
  }, []);

  return countries;
}

function getCities() {
  let cities = jobs.reduce((cities: { name: string }[], job) => {
    return [
      ...cities,
      ...(job.Cities?.split(",").map((city) => ({
        name: city.trim(),
      })) || []),
    ];
  }, []);

  return cities;
}

function getKeywords() {
  let keywords = jobs.reduce((keywords: { name: string }[], job) => {
    return [
      ...keywords,
      ...(job.Keywords?.split(",").map((keyword) => ({
        name: keyword.trim(),
      })) || []),
    ];
  }, []);

  return keywords;
}

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
