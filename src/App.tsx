import axios from "axios";
import "./App.css";
import { Fragment, useState } from "react";
import "@fontsource-variable/montserrat/wght.css";
import dayjs from "dayjs";

const API_KEY = import.meta.env.VITE_API_key;
type weatherObject = {
  [key: string]: any;
};

function App() {
  const [weatherList, setWeatherList] = useState<Array<weatherObject>>([]);
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [location, setLocation] = useState<weatherObject>({});
  const [isToday, setIsToday] = useState<boolean>(false);
  const [weekReport, setWeekReport] = useState<weatherObject>({});
  const [enableElement,setEnableElement] = useState<boolean>(false);

  const handleSearch = async (): Promise<void> => {
    const result = await axios.get(
      ` http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchLocation}`,
    );

    const weekresult = await axios.get(
      ` http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchLocation}&days=8`,
    );
    // console.log(weekresult.data);
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
  };

  const handleWeek = (): void => {
    setIsToday(false);
  };

  return (
    <>
      <div className="font-Roboto flex flex-col justify-center items-center">
        <div className="mt-5 space-x-4">
          <input
            className="border-1 p-1 rounded-2xl"
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
                !isToday
                  ? "bg-[#0a79cf] text-white px-6 py-3 rounded-4xl shadow-xl font-bold cursor-pointer"
                  : "bg-white text-black px-6 py-3 rounded-4xl shadow-xl font-bold cursor-pointer"
              }
            >
              Week
            </p>
          </div>
        </div>

        {enableElement && 
        <div className="flex space-x-2 items-start">
          {weatherList.length > 0 &&
            weatherList.map((value, index) => {
              const time = dayjs().format("HH:m");
              const date = dayjs().format("DD-MM-YYYY");
              const curretTime = dayjs().format("HH");
              // console.log(curretTime);

              return (
                <div
                  key={index}
                  className="space-y-4 bg-white w-120 border-0 shadow-xl font-semibold text-lg flex flex-col items-center p-10 rounded-2xl my-10"
                >
                  <p>Current Status</p>
                  <div className="flex space-x-9">
                    <p>Date: {date}</p>
                    <p>Time: {time}</p>
                  </div>

                  {/* <p>Sunrise: {value.astro.sunrise}</p>
                <p>Sunset: {value.astro.sunset}</p> */}

                  {value.hour.map((value: weatherObject, index: number) => {
                    const time = value.time.split(" ")[1].split(":")[0];
                    // console.log(time);
                    if (curretTime === time) {
                      return (
                        <Fragment key={index}>
                          <img
                            className="w-30"
                            src={`https:${value.condition.icon}`}
                          ></img>
                          <div className="flex flex-col items-center">
                            <p className="font-semibold">
                              Temperature :
                              <span className="font-bold text-[16px] pl-2">
                                {value.temp_c}°C
                              </span>
                            </p>
                            <p className="font-semibold">
                              Humidity :
                              <span className="font-bold text-[16px] pl-2">
                                {value.humidity} %
                              </span>
                            </p>
                            <p className="font-semibold">
                              Wind Speed :
                              <span className="font-bold text-[16px] pl-2">
                                {value.wind_kph} kph
                              </span>
                            </p>
                            <p className="font-semibold">
                              Condition :
                              <span className="font-bold text-[16px] pl-2">
                                {value.condition.text}
                              </span>
                            </p>
                          </div>
                        </Fragment>
                      );
                    }
                  })}
                  <p>
                    Location : {location.name},{location.region},
                    {location.country}
                  </p>
                  {/* <p>Lattitude: {location.lat}</p>
                <p>Longitude: {location.lon}</p> */}
                </div>
              );
            })}

          {isToday && (
            <div className="grid grid-cols-3 gap-y-7 gap-x-7 p-10 pt-0 mt-10 h-[100vh] overflow-scroll overflow-x-hidden ">
              {weatherList.length > 0 &&
                weatherList[0].hour.map(
                  (value: weatherObject, index: number) => {
                    const time = value.time.split(" ")[1];
                    // console.log(time);
                    return (
                      <div key={index}>
                        <div className="bg-white border-0 shadow-xl w-65 h-65 py-7 rounded-2xl flex flex-col items-center justify-center">
                          <p className="font-bold text-md mb-1">{time}</p>
                          <img
                            className="w-20"
                            src={`https:${value.condition.icon}`}
                          ></img>
                          <div className="text-sm flex flex-col items-center">
                            <p className="font-semibold">
                              Temperature :
                              <span className="font-bold text-[16px] pl-2">
                                {value.temp_c}°C
                              </span>
                            </p>
                            <p className="font-semibold">
                              Humidity :
                              <span className="font-bold text-[16px] pl-2">
                                {value.humidity} %
                              </span>
                            </p>
                            <p className="font-semibold">
                              Wind Speed :
                              <span className="font-bold text-[16px] pl-2">
                                {value.wind_kph} kph
                              </span>
                            </p>
                            <p className="font-semibold w-40 text-center">
                              Condition :
                              <span className="font-bold text-[16px] pl-2">
                                {value.condition.text}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
            </div>
          )}

          {!isToday && (
            <div className="grid grid-cols-3 gap-7 mt-10 p-10 pt-0 h-[100vh] overflow-scroll overflow-x-hidden">
              {weekReport.length > 0 &&
                weekReport.map((value: weatherObject, index: number) => {
                  // console.log(value.date_epoch)
                  // console.log(dayjs.unix(value.date_epoch).format('DD-MM-YYYY'));
                  if (index !== 0) {
                    return (
                      <div
                        key={index}
                        className="bg-white border-0 shadow-xl w-65 h-65 py-7 rounded-2xl flex flex-col items-center justify-center text-sm"
                      >
                        <p className="font-bold">
                          {dayjs.unix(value.date_epoch).format("DD-MM-YYYY")}
                        </p>
                        <p className="font-bold">
                          {dayjs.unix(value.date_epoch).format("dddd")}
                        </p>
                        <img
                          className="w-20"
                          src={`https:${value.day.condition.icon}`}
                        ></img>

                        <p className="font-semibold">
                          Humidity : <span>{value.day.avghumidity} %</span>
                        </p>
                        <p className="font-semibold">
                          Temperature : <span>{value.day.avgtemp_c} °C</span>
                        </p>
                        <p className="font-semibold">
                          Wind Speed : <span>{value.day.maxwind_kph} kph</span>
                        </p>
                        <p className="font-semibold">
                          condition : <span>{value.day.condition.text} </span>
                        </p>
                      </div>
                    );
                  }
                })}
            </div>
          )}
        </div>
        }
      </div>
    </>
  );
}

export default App;
