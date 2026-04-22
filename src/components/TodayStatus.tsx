type weatherObject = {
  [key: string]: any;
};

function TodayStatus({ weatherList }: weatherObject) {
  return (
    <div className="grid grid-cols-3 gap-y-7 gap-x-7 p-10 pt-0 mt-10 h-[100vh] overflow-scroll overflow-x-hidden ">
      {weatherList.length > 0 &&
        weatherList[0].hour.map((value: weatherObject, index: number) => {
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
        })}
    </div>
  );
}

export default TodayStatus;
