import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import UnitShiftListComponent from "../components/unitShiftListComponent";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
interface IUnitShiftData {
  shiftDate: string;
  shiftType: string;
}
interface IpatientObject {
  patientName: string;
  patientRoom: string;
}

interface IStaffData {
  nurseId: string;
  nurseData: {
    nurseName: string;
    nurseBreak: string;
    reliefName: string;
    extraDuties: string;
    fireCode: string;
    assignedPatient: IpatientObject[];
  };
}

interface IUnitShiftObject {
  shiftId: string;
  data: IUnitShiftData;
  staff: IStaffData[];
}

interface IUnitObject {
  unitName: string;
  shifts: IUnitShiftObject[];
}

interface IShiftSearch {
  shiftDate: Date;
  shiftType: string;
}

function NoShiftFound() {
  const { unitName } = useParams();

  return (
    <div className="flex flex-col bg-sky-50 items-center min-h-screen p-12">
      <h1 className="font-OpenSans text-center text-3xl sm:text-4xl font-bold py-8 px-12 sm:py-12 items-center max-w-sm sm:max-w-4xl">
        Shift Record for {unitName} unit
      </h1>{" "}
      <div className="flex flex-col items-center gap-12">
        <p className="text-lg p-12 text-center sm:text-2xl">
          No shifts have been added yet on for this unit
        </p>
        <Link
          to={`/startUnitShift/${unitName}`}
          className="mx-auto hover:border-amber-200 hover:bg-amber-200 hover:text-white text-black font-bold py-2 px-4  border-solid border-2 border-orange rounded-sm  sm:px-10 sm:py-1 bo sm:text-xl rounded focus:outline-none focus:shadow-outline bg-orange sm:mb-0 mb-4  items-center justify-center"
        >
          + Add Shift
        </Link>
      </div>
    </div>
  );
}

export function UnitShiftHistory() {
  const navigate = useNavigate();
  const { unitName } = useParams();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IShiftSearch>();

  const onSubmit: SubmitHandler<IShiftSearch> = (data, event) => {
    event?.preventDefault();
    console.log(data);
    const formattedDate = data.shiftDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");
    const shiftType = data.shiftType.toString();
    const shiftTypeDash = shiftType.replace(/ /g, "-");

    console.log("shiftType", shiftType);

    navigate(`/searchUnitResult/${unitName}/${formattedDate}/${shiftTypeDash}`);
  };

  const hospitalNameJSON = localStorage.getItem("Hospital Data");
  const hospitalData = hospitalNameJSON
    ? JSON.parse(hospitalNameJSON)
    : { hospitalName: "", hospitalUnits: [] };

  const hospitalUnits = hospitalData.hospitalUnits;
  const matchingUnit = hospitalUnits.find((unit: IUnitObject) => {
    return unit.unitName === unitName;
  });
  const existingData = matchingUnit?.shifts;
  if (existingData?.length === 0 || existingData == undefined) {
    return <NoShiftFound />;
  }
  if (unitName) {
    return (
      <div className="bg-sky-50 font-OpenSans min-h-screen text-sm sm:text-md pb-24">
        <div className="">
          <div className="flex flex-col items-center">
            <h1 className="text-center text-2xl sm:pt-16 sm:text-4xl font-bold py-8">
              Shift Record for {unitName}
            </h1>

            <div className="flex flex-col items-center p-4 bg-white rounded-md shadow-lg my-6 max-w-sm sm:max-w-xl">
              <div className="">
                <div className="flex items-center pointer-events-none"></div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <div>
                    <Controller
                      control={control}
                      name="shiftDate"
                      render={({ field }) => (
                        <DatePicker
                          placeholderText="Enter shift date"
                          onChange={(date) => field.onChange(date)}
                          className="pl-2 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm sm:max-w-md"
                          selected={field.value}
                        />
                      )}
                    />
                  </div>
                  <div className="basis-1/2 mr-2">
                    <select
                      {...register("shiftType", { required: true })}
                      className={`px-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500  ${
                        !watch("shiftType") && "opacity-50"
                      }`}
                    >
                      <option
                        value=""
                        disabled
                        selected
                        className="text-slate-400"
                      >
                        Enter shift type
                      </option>
                      <option value="Day Shift">Day Shift</option>
                      <option value="Night Shift">Night Shift</option>
                    </select>{" "}
                    {errors?.shiftType?.type === "required" && (
                      <p className="text-peach">
                        {errors?.shiftType?.message || "This field is required"}
                      </p>
                    )}
                  </div>{" "}
                  <button
                    className="mx-2 flex items-center justify-center bg-blue hover:bg-primarylight py-2 px-8 text-white font-semibold rounded-md hover:shadow-lg transition duration-3000 cursor-pointer text-center"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
            <UnitShiftListComponent unitName={unitName} />
          </div>
        </div>
      </div>
    );
  }
}
