import dayjs from "dayjs";

type weatherObject = {
  [key: string]: any;
};

function CurrentStatus({weatherList,location}:weatherObject) {
  return (
    <>
      {weatherList.map((value:weatherObject, index:number) => {
        const time = dayjs().format("HH:m");
        const date = dayjs().format("DD-MM-YYYY");
        const curretTime = dayjs().format("HH");
        // console.log(curretTime);

        return (
          <div
            key={index}
            className="space-y-4 bg-white w-120 border-0 shadow-xl font-semibold text-lg flex flex-col items-center p-10 rounded-2xl my-10 mobile:w-fit mobile:mx-0 mobile:text-sm tablet:text-sm"
          >
            <p>Current Status</p>
            <div className="flex space-x-9 mobile:space-x-6">
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
                  <div key={index}>
                    <img
                      className="w-30 mx-auto"
                      src={`https:${value.condition.icon}`}
                    ></img>
                    <div className="flex flex-col items-center">
                      <p className="font-semibold">
                        Temperature :
                        <span className="font-bold text-[16px] pl-2 mobile:text-sm">
                          {value.temp_c}°C
                        </span>
                      </p>
                      <p className="font-semibold">
                        Humidity :
                        <span className="font-bold text-[16px] pl-2 mobile:text-sm">
                          {value.humidity} %
                        </span>
                      </p>
                      <p className="font-semibold">
                        Wind Speed :
                        <span className="font-bold text-[16px] pl-2 mobile:text-sm">
                          {value.wind_kph} kph
                        </span>
                      </p>
                      <p className="font-semibold">
                        Condition :
                        <span className="font-bold text-[16px] pl-2 mobile:text-sm">
                          {value.condition.text}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              }
            })}
            <p className="mobile:flex tablet:text-center">
              Location : {location.name},{location.region},{location.country}
            </p>
            {/* <p>Lattitude: {location.lat}</p>
                    <p>Longitude: {location.lon}</p> */}
          </div>
        );
      })}
    </>
  );
}

export default CurrentStatus;
