"use client";

import { getDataOnServer } from "@/actions/getDataOnServer";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import Event from "./event";
import Search from "@/components/search";


type Data = [
  {
    name: string;
    url: string;
    promoter: string;
    images: [
      {
        ratio: string;
        url: string;
        width: number;
        height: number;
        fallback: boolean;
      }
    ];
  }
];


const Events = () => {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = useCallback(async () => {
    setIsLoading(true);
    const { data, isError, error } = await getDataOnServer();
    setIsLoading(false);
    if (!isError) setData(data);
    else {
      setIsError(isError);
      setError(error);
    }
  }, [setData]);

  useEffect(() => {
    getData();
  }, [getData]);

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    console.log(value);
    setSearchValue(value);
  };

  return (
    <section>
      <>
      <div>
      <Search onSearch={handleSearch} />
      <h2 className="text-2xl mt-20 mx-2 underline"></h2>
      <p className="text-2xl m-2">{searchValue}</p>

      </div>
        {error ? <p>{error}</p> : null}
        {isLoading ? (
          <p className="text-3xl my-[10%] font-black">Loading...</p>
        ) : null}
        {isError ? <p>Error</p> : null}
        {data ? (
          <div>
            <h2 className=" text-3xl my-[10%] font-black">Upcoming Events</h2>
            <span className="flex flex-col sm:flex-row flex-wrap lg:max-w-[85%] mx-auto">
              {data?.map((event, n) => (
                <section
                  id={`event_${n}`}
                  key={n}
                  className="relative mb-[10%] w-full md:w-1/2 md:odd:last:m-auto odd:last:pr-0 md:odd:pr-3 md:even:pl-3"
                >
                  <Event event={event} />
                </section>
              ))}
            </span>
          </div>
        ) : null}
      </>
    </section>
  );
};

export default Events;
