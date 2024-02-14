"use client";

import { useEffect, useState } from "react";
import { CarProps, HomeProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";
import { SearchBar, CustomFilter, Hero } from "@/components";
import CarCard from "@/components/CarCard";
import ShowMore from "@/components/ShowMore";
import { fetchCars } from "@/utils";
import Spinner from "@/components/Spinner";

export default function Home({ searchParams }: HomeProps) {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const getCars = async () => {
      setLoading(true);
      try {
        // Reset previous search data
        setAllCars([]);
      

        const result = await fetchCars({
          manufacturer: manufacturer || "",
          year: year || 2022,
          fuel: fuel || "",
          limit: limit || 10,
          model: model || "",
        });
        setAllCars((prevData: CarProps[]) => [...prevData, ...result]);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getCars();
  }, [limit, year, fuel, manufacturer, model]);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore our cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
            <CustomFilter
              title="year"
              options={yearsOfProduction}
              setFilter={setYear}
            />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
              {loading && (
                <div className="loading w-full flex-center">
                  <Spinner color="sucess" />
                  {/* Replace Image component with Spinner component */}
                </div>
              )}
            </div>
            <ShowMore
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="loading w-full flex-center">
            <Spinner color="success" />
          </div>
        )}
      </div>
    </main>
  );
}
