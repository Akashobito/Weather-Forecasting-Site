import dayjs from "dayjs";

type weatherObject = {
  [key: string]: any;
};

type myProp = {
  weekReport: weatherObject,
  setPerdayStatus: React.Dispatch<React.SetStateAction<weatherObject[]>>,
  handlePerticularday: () => void;
}


function WeekStatus({weekReport,setPerdayStatus,handlePerticularday}:myProp) {

  const handleWeekDayHour = (hour:Array<weatherObject>) => {
    // console.log(hour)
    setPerdayStatus(hour);
    handlePerticularday();
  }

  return (
    <div className="grid grid-cols-3 gap-7 mt-10 p-10 pt-0 h-[100vh] overflow-scroll overflow-x-hidden mobile:overflow-visible mobile:grid-cols-2 mobile:gap-2 mobile:gap-y-4 mobile:p-0 mobile:m-0 tablet:grid-cols-2 tablet:gap-x-4 tablet:gap-y-4 tablet:p-0 tablet:pb-5 tablet:pr-5">
      {weekReport.length > 0 &&
        weekReport.map((value: weatherObject, index: number) => {
          // console.log(value.date_epoch)
          // console.log(dayjs.unix(value.date_epoch).format('DD-MM-YYYY'));
          if (index !== 0) {
            return (
              <div onClick={()=>{handleWeekDayHour(value.hour)}}
                key={index}
                className="bg-white border-0 shadow-xl w-65 h-65 py-7 rounded-2xl flex flex-col items-center justify-center text-sm cursor-pointer mobile:w-45 mobile:gap-0 mobile:text-xs mobile:flex mobile:items-center tablet:w-50 tablet:text-sm"
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
                  Humidity : <span className="font-bold text-[16px] pl-2 mobile:text-sm">{value.day.avghumidity} %</span>
                </p>
                <p className="font-semibold">
                  Temperature : <span className="font-bold text-[16px] pl-2 mobile:text-sm">{value.day.avgtemp_c} °C</span>
                </p>
                <p className="font-semibold">
                  Wind Speed : <span className="font-bold text-[16px] pl-2 mobile:text-sm">{value.day.maxwind_kph} kph</span>
                </p>
                <p className="font-semibold text-center">
                  condition : <span className="font-bold text-[16px] pl-2 mobile:text-sm">{value.day.condition.text} </span>
                </p>
              </div>
            );
          }
        })}
    </div>
  );
}

export default WeekStatus;
