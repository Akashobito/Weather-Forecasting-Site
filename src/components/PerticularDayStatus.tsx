import dayjs from "dayjs";

type weatherObject = {
  [key: string]: any;
};

type myProp = {
  perdayStatus: {[key: string]: any},
  location: weatherObject
}

function PerticularDayStatus({ perdayStatus,location }: myProp) {
  const currentTime = dayjs().format("HH:mm").split(":")[0];
  return (
    <div className="flex items-start">
      <div className="space-y-4 bg-white w-120 border-0 shadow-xl font-semibold text-lg flex flex-col items-center p-10 rounded-2xl my-10">
        <p>Selected date</p>
        <div className="flex space-x-5">
          <p>Date : {dayjs.unix(perdayStatus[0].time_epoch).format("DD-MM-YYYY")}</p>
          <p>Time : {dayjs().format("HH:mm")}</p>
        </div>
        {perdayStatus.map((hour: weatherObject, index: number) => {
          const matchingHour = hour.time.split(" ")[1].split(":")[0];
          if (currentTime === matchingHour) {
            return (
              <div key={index} className="flex flex-col items-center">
                <img
                  className="w-30"
                  src={`https:${hour.condition.icon}`}
                ></img>
                <p>Temperature : {hour.temp_c} °C </p>
                <p>Humidity : {hour.humidity} %</p>
                <p>Wind Speed : {hour.wind_kph} kph</p>
                <p>Condition: {hour.condition.text}</p>
                <p className="mt-4">Location :  {location.name},{location.region},{location.country}</p>
              </div>
            );
          }
        })}
      </div>
      <div className="grid grid-cols-3 gap-y-7 gap-x-7 p-10 pt-0 mt-10 h-[100vh] overflow-scroll overflow-x-hidden">
        {perdayStatus.map((value: weatherObject, index: number) => {
          return (
            <div key={index}>
              <div className="bg-white border-0 shadow-xl w-65 h-65 py-7 rounded-2xl flex flex-col items-center justify-center">
                <p className="font-bold text-md mb-1">
                  {value.time.split(" ")[1]}
                </p>
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
    </div>
  );
}

export default PerticularDayStatus;
