import { useParams } from "react-router-dom";
import ViewNurseCard from "../components/viewNursesComponent";
import { Link } from "react-router-dom";
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

interface IUnitShiftData {
  unitName: string;
  shiftDate: string;
  shiftType: string;
}

function formatDate(dateString: string): string {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);

  return `${day} ${getMonthName(month)}, ${year}`;
}

function getMonthName(month: string): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Subtract 1 from the month because JavaScript Date months are zero-based
  const monthIndex = parseInt(month, 10) - 1;

  return months[monthIndex];
}

export function ViewUnitShift() {
  const { unitName, ShiftId } = useParams();
  console.log("unitName", unitName);
  const hospitalNameJSON = localStorage.getItem("Hospital Data");
  const hospitalData = hospitalNameJSON
    ? JSON.parse(hospitalNameJSON)
    : { hospitalName: "", hospitalUnits: [] };
  const hospitalUnits = hospitalData.hospitalUnits;
  console.log("hospital units", hospitalUnits);
  const matchingUnit = hospitalUnits.find((unit: IUnitObject) => {
    return unit.unitName === unitName;
  });
  console.log("matching unit", matchingUnit);
  const existingData = matchingUnit?.shifts;

  const matchingShift = existingData?.find((shift: IUnitShiftObject) => {
    return shift.shiftId === ShiftId;
  });

  if (ShiftId) {
    // Check if ShiftId is defined

    if (ShiftId) {
      const staffData = matchingShift?.staff ?? [];

      console.log("staffData", staffData);
      if (matchingShift) {
        return (
          <div className="font-OpenSans bg-sky-50 sm:max-w-full min-h-screen items-center pb-24">
            <div className="flex flex-col gap-6 lg:gap-32 text-lg py-8 sm:text-xl lg:flex-row items-center justify-center">
              <p className="sm:text-3xl text-2xl font-bold lg:hidden">{unitName} Unit</p>
              <p className="flex flex-row gap-2">
                {" "}
                {formatDate(matchingShift.data.shiftDate)}
              </p>
              <p className="sm:text-3xl font-bold hidden lg:flex">{unitName} Unit</p>
              <p>{matchingShift.data.shiftType}</p>
            </div>

            <hr className=" hidden lg:block h-0.25 my-2 max-w-5xl w-full px-2 bg-slate-300"></hr>

            <div>
              {" "}
              <ViewNurseCard staffData={staffData} />{" "}
            </div>
            <Link
              className="flex flex-row gap-2 text-blue w-full justify-end px-12 mt-12 lg:mt-24"
              to={`/manageUnitStaff/${unitName}/${ShiftId}`}
            >
              {" "}
              Edit This Shift
              <img src="images/arrow.png" alt="edit icon" className="h-6" />
            </Link>
          </div>
        );
      }
    } else {
      console.log("ShiftId is undefined.");
    }
  } else {
    console.log("ShiftId is undefined.");
  }
}

export default ViewUnitShift;
