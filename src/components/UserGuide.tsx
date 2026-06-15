
type prop = {
  handleInfo : ()=> void
}

function UserGuide({handleInfo}:prop) {
  return (
    <div className="flex flex-col h-[100vh] justify-center items-center font-Roboto text-sm backdrop-blur-lg absolute w-[100vw] z-10">
      <div className="w-130 space-y-5 p-10 bg-amber-400 rounded-2xl shadow-2xl relative mobile:w-80">
        <div className="absolute right-[-10px] top-[-10px] bg-black p-1 px-1.5 rounded-2xl">
          <i onClick={handleInfo} className="fa-solid fa-xmark text-white text-xs cursor-pointer"></i>
        </div>
        <div>
          <p className="font-bold font-Roboto text-sm">1. Search a city</p>
          <p>
            Type the city name in the box at the top and click Search to load
            the weather for that city.
          </p>
        </div>
        <div>
          <p className="font-bold font-Roboto text-sm">
            2. See today’s 24‑hour forecast
          </p>
          <p>
            Click the Today button to view the weather for each hour of the
            current day.
          </p>
        </div>
        <div>
          <p className="font-bold font-Roboto text-sm">
            3. See the weekly forecast
          </p>
          <p>Click the Week button to view the weather for the next 7 days</p>
        </div>
        <div>
          <p className="font-bold font-Roboto text-sm">
            4. Switch views anytime
          </p>
          <p>
            After you search once, you can switch between Today and Week to
            compare today’s hours with the full week
          </p>
        </div>
        <div>
          <p className="font-bold font-Roboto text-sm">
            5. Search another city
          </p>
          <p>
            Enter a new city name and click Search again to update all the
            forecasts.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserGuide;
