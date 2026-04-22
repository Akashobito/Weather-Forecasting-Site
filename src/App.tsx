import axios from "axios";
import "./App.css";
import { useState } from "react";
import "@fontsource-variable/montserrat/wght.css";
import dayjs from "dayjs";
import TodayStatus from "./components/TodayStatus";
import WeekStatus from "./components/WeekStatus";
import CurrentStatus from "./components/CurrentStatus";
import PerticularDayStatus from "./components/PerticularDayStatus";

const API_KEY = import.meta.env.VITE_API_key;
type weatherObject = {
  [key: string]: any;
};

function App() {
  const [weatherList, setWeatherList] = useState<Array<weatherObject>>([]);
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [location, setLocation] = useState<weatherObject>({});
  const [weekReport, setWeekReport] = useState<weatherObject>({});
  const [enableElement, setEnableElement] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isToday, setIsToday] = useState<boolean>(true);
  const [isParticularday, setIsparticularday] = useState<boolean>(false);
  const [isWeek, setIsWeek] = useState<boolean>(false);
  const [perdayStatus, setPerdayStatus] = useState<weatherObject[]>([]);

  const handleSearch = async (): Promise<void> => {
    setIsLoading(true);
    const result = await axios.get(
      ` https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchLocation}`,
    );

    const weekresult = await axios.get(
      ` https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchLocation}&days=8`,
    );
    setIsLoading(false);
    console.log(weekresult.data);
    setWeekReport(weekresult.data.forecast.forecastday);
    // console.log(result.data);
    setWeatherList(result.data.forecast.forecastday);
    setEnableElement(true);
    setLocation(result.data.location);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchLocation(event.target.value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleToday = (): void => {
    setIsToday(true);
    setIsWeek(false);
    setIsparticularday(false);
  };

  const handleWeek = (): void => {
    setIsToday(false);
    setIsWeek(true);
    setIsparticularday(false);
  };

  const handlePerticularday = (): void => {
    setIsparticularday(true);
    setIsToday(false);
    setIsWeek(false);
  };

  return (
    <>
      <div className="font-Roboto flex flex-col justify-center items-center">
        <div className="mt-5 space-x-4 flex flex-col items-center">
          <div className="flex space-x-5">
            <input
              className="border-1 p-1 rounded-2xl pl-5"
              type="text"
              onChange={handleInput}
              onKeyDown={handleEnter}
            ></input>
            <button
              onClick={() => {
                handleSearch();
              }}
              className="px-2 py-1 rounded-sm bg-yellow-400"
            >
              search
            </button>
          </div>

          <div className="options flex justify-center space-x-8 mt-14">
            <p
              onClick={handleToday}
              className={
                isToday
                  ? "bg-[#0a79cf] text-white px-6 py-3 rounded-4xl shadow-xl font-bold cursor-pointer"
                  : "bg-white text-black px-6 py-3 rounded-4xl shadow-xl font-bold cursor-pointer"
              }
            >
              Today
            </p>
            <p
              onClick={handleWeek}
              className={
                isWeek
                  ? "bg-[#0a79cf] text-white px-6 py-3 rounded-4xl shadow-xl font-bold cursor-pointer"
                  : "bg-white text-black px-6 py-3 rounded-4xl shadow-xl font-bold cursor-pointer"
              }
            >
              Week
            </p>

            {isParticularday && (
              <p
                onClick={handlePerticularday}
                className={
                  isParticularday
                    ? "bg-[#0a79cf] text-white px-6 py-3 rounded-4xl shadow-xl font-bold cursor-pointer"
                    : "bg-white text-black px-6 py-3 rounded-4xl shadow-xl font-bold cursor-pointer"
                }
              >
                {dayjs.unix(perdayStatus[0].time_epoch).format('DD-MM-YYYY')}
              </p>
            )}
          </div>
        </div>

        {enableElement && (
          <div className="flex space-x-2 items-start">
            {weatherList.length > 0 && !isParticularday && (
              <CurrentStatus weatherList={weatherList} location={location} />
            )}
            {isToday && <TodayStatus weatherList={weatherList} />}
            {isWeek && (
              <WeekStatus
                weekReport={weekReport}
                setPerdayStatus={setPerdayStatus}
                handlePerticularday={handlePerticularday}
              />
            )}
          </div>
        )}

        {isParticularday && (
          <PerticularDayStatus
            perdayStatus={perdayStatus}
            location={location}
          />
        )}

        {isLoading && (
          <div className="loading fixed top-45 shadow-2xl min-h-[100vh] min-w-[100vw] flex justify-center items-start backdrop-blur-xl">
            <div className="flex flex-col justify-center mt-40">
              <i className="fa-solid fa-spinner fa-spin-pulse text-5xl"></i>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
