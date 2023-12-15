import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom';
import search from '../assets/img/search.svg'

const API = "https://restcountries.com/v3.1/all";

let options = {
  style: "decimal",
  useGrouping: true,
  minimumFreactionDigits: 0,
  maximumFreactionDigits: 2,
};

const Home = () => {
  const countries = useLoaderData();

  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const filterCountriesBySearch = (country) => {
    if (searchQuery.trim() === "") {
      return true;
    }
    return country.name.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  };

  const filterCountriesByRegion = (country) => {
    if (region === "") {
      return true;
    }
    return country.region === region;
  };

  const filteredCountries = countries.filter(filterCountriesBySearch);
  const filteredCountriesByRegion = filteredCountries.filter(filterCountriesByRegion);

  return (
    <div className='py-12 min-h-screen dark:bg-midDark'>
      <div className='w-full max-w-[1320px] px-5 mx-auto'>
        {/* Input & Select */}
        <div className="flex flex-col items-end sm:flex-row sm:justify-between">
          {/* Input */}
          <div className="relative w-full max-w-[480px] mb-5 sm:mr-10 sm:mb-0">
            <input
              className="w-full py-[18px] pl-[74px] rounded-md shadow-input text-sm text-textColor dark:bg-lightDark dark:text-white"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for a country…"
            />
            <img
              className="absolute top-5 left-8"
              src={search}
              alt="search icon"
            />
          </div>

          {/* Select */}
          <select
            defaultValue="DEFAULT" onChange={handleRegionChange}
            className="px-6 py-5 shadow-input w-52 text-sm text-textColor space-y-2 rounded- bg-white dark:text-white dark:bg-lightDark"
          >
            <option value="DEFAULT" disabled>
              Filter by region
            </option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        {/* API DATA */}
        <div className='py-12'>
          {/* Countries list */}
          <ul className='grid grid-cols-1 gap-10 sm:grid-cols-2 md-gap-x-12 md-gap-y-10 lg:grid lg:gap-x-16 lg:gap-y-14 xl:grid-cols-4 xl:gap-x-[74px] xl:gap-y-16'>
            {filteredCountriesByRegion.map((country) => {
              return (
                <li key={country.name.common} className='shadow-listItem bg-white  dark:text-white dark:bg-lightDark rounded-md'>
                  <Link to={country.name.common}>
                    <img className='w-full h-40' src={country.flags.png} alt={country.flag.common + " flag"} />

                    <div className='pt-6 mb-11 px-6'>
                      <h3 className='text-textColor dark:text-white font-sans text-lg font-extrabold leading-[26px]'>{country.name.common}</h3>
                      <p className='pt-4'>
                        <b>Population:</b>{" "}
                        {country.population.toLocaleString("uz-Uz", options)}
                      </p>
                      <p className='pt-2'>
                        <b>Region:</b>{" "}
                        {country.continents}
                      </p>
                      <p className='pt-2'>
                        <b>Capital:</b>{" "}
                        {country.capital}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home;

export const fetchApi = async () => {
  const res = await fetch(API);
  const data = await res.json();
  if (!res.ok) {
    throw Error("Davlatlarni olib bolmadi");
  }
  return data;
};