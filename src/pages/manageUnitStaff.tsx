import { useParams } from "react-router-dom";
import UnitNurseCardDisplay from "../components/unitNurseCardDisplay";
import { v4 as uuidv4 } from "uuid";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import ManageStaffForm from "../components/manageStaffForm";
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

interface IHospitalData {
  hospitalName: string;
  hospitalUnits: IUnitObject[];
}
interface IFormInput {
  nurseName: string;
  nurseBreak: string;
  reliefName: string;
  extraDuties: string;
  fireCode: string;
  assignedPatient: IpatientObject[];
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

export function UnitNurseForm() {
  const { unitName, ShiftId } = useParams();
  const nurseId = uuidv4();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  console.log(unitName);
    const [showPopup, setShowPopup] = useState(false);


  // Retrieve existing data from localStorage or create an empty array
  const hospitalNameJSON = localStorage.getItem("Hospital Data");
  const [hospitalData, setHospitalData] = useState<IHospitalData>(
    hospitalNameJSON
      ? JSON.parse(hospitalNameJSON)
      : { hospitalName: "", hospitalUnits: [] }
  );

  const matchingUnit = hospitalData.hospitalUnits.find((item) => {
    return item.unitName === unitName;
  });
  console.log("matching unit", matchingUnit);
  const matchingShift = matchingUnit?.shifts.find((item) => {
    return item.shiftId === ShiftId;
  });
  console.log("matching Shift", matchingShift);

  const form = useForm<IFormInput>({ defaultValues: { assignedPatient: [] } });
  const onSubmitForm: SubmitHandler<IFormInput> = (nurseData, event) => {
    event?.preventDefault();
    const isnotDuplicate = validatePatientsfieldsAgainstEachOther(nurseData);
    if (isnotDuplicate) {
      makeAndAddNurseDataToLS(nurseData);
      form.reset();
      console.log(nurseData);
      setErrorMessage(null);
      setShowPopup(false)
      setHospitalData(hospitalData)
    } else
      setErrorMessage(
        "Error: duplicate patient name and/or room is being assigned to the same nurse"
      );
  };

  const validatePatientsfieldsAgainstEachOther = (nurseData: IFormInput) => {
    console.log("validate");
    console.log("nurse data validation", nurseData);
    const patientsArray = nurseData.assignedPatient;
    console.log("patients objects array", patientsArray);
    const patientNamesArray: string[] = [];
    const patientRoomsArray: string[] = [];

    for (const patient of patientsArray) {
      // Add patient names to the patientNames array
      patientNamesArray.push(patient.patientName);

      // Add patient rooms to the patientRooms array
      patientRoomsArray.push(patient.patientRoom);

      console.log("Patient Names:", patientNamesArray);
      console.log("Patient Rooms:", patientRoomsArray);
    }

    const isDuplicateName = patientNamesArray.some(
      (name, index) => patientNamesArray.indexOf(name) !== index
    );
    const isDuplicateRoom = patientRoomsArray.some(
      (room, index) => patientRoomsArray.indexOf(room) !== index
    );

    if (!isDuplicateName && !isDuplicateRoom) {
      return true;
    } else return false;
  };

  function makeAndAddNurseDataToLS(nurseData: IFormInput) {
    console.log("nurse data manage staff", nurseData);

    if (matchingUnit && matchingShift) {
      matchingShift.staff.push({ nurseId, nurseData });
      localStorage.setItem("Hospital Data", JSON.stringify(hospitalData));
      setHospitalData(hospitalData);
    }
  }

  if (ShiftId) {
    if (unitName && ShiftId && matchingShift && matchingUnit) {
      return (
        <div className="font-OpenSans bg-sky-50 sm:max-w-full min-h-screen items-center">
          {showPopup ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center p-4 ">
              <button
                className="bg-white px-6 py-2 rounded-full m-4 font-bold text-red"
                onClick={() => setShowPopup(false)}
              >
                &#10060;
              </button>
              <div className="flex flex-col items-center">
                {" "}
                <ManageStaffForm
                  onSubmit={onSubmitForm}
                  Shifturl={ShiftId}
                  form={form}
                  validationArray={matchingShift.staff}
                  shiftType={matchingShift.data.shiftType}
                  shiftDate={formatDate(matchingShift.data.shiftDate)}
                />
                {errorMessage && (
                  <div className="bg-white sm:px-8 shadow-lg flex flex-col mb-8 sm:flex-row items-center sm:w-80 w-60 max-w-sm rounded-lg max-w-sm  sm:max-w-xl text-xsm p-4 sm:text-sm text-center mx-4">
                    <img
                      className="w-20 sm:w-16"
                      src="images/danger-icon.png"
                    />{" "}
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col items-center justify-center ">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 px-4 py-12">
              <div className="flex flex-row gap-2 items-center text-blue text-lg font-bold">
                <p className="py-2 sm:py-2 px-4 sm:px-3 text-white font-bold sm:text-sm bg-blue rounded-full">
                  &#10004;
                </p>
                <p>Date & Shift Type</p>
              </div>
              <hr className="w-32 bg-black hidden sm:block border-1 border-black"></hr>
              <div className="flex flex-row gap-2 items-center text-blue text-lg font-bold">
                <p className="py-2 sm:py-2 px-4 sm:px-3 text-white font-bold sm:text-sm bg-blue rounded-full">
                  &#10004;
                </p>
                <p>Staff & Patient Info</p>
              </div>
              <hr className="w-32 bg-black hidden sm:block border-1 border-black"></hr>

              <div className="flex flex-row gap-2 items-center text-blue text-lg font-bold">
                <p className="py-2 sm:py-1 px-4 sm:px-3 text-blue font-bold sm:text-lg border-2 border-blue rounded-full">
                  3
                </p>
                <p>Shift Overview</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-56  gap-6 text-sm items-center justify-center ">
              <div className="flex flex-col-reverse gap-6 lg:gap-32 text-lg sm:text-md lg:flex-row items-center justify-center">
                <p className="flex flex-row gap-2">
                  {" "}
                  {formatDate(matchingShift.data.shiftDate)} |{" "}
                  {matchingShift.data.shiftType}
                  <Link to={`/editShiftInfo/${unitName}/${ShiftId}`}>
                    {" "}
                    <img className="h-6" src="images/edit-grey.png" />
                  </Link>
                </p>
                <p className="sm:text-3xl font-bold">{unitName} Unit</p>
              </div>
              <button
                onClick={() => setShowPopup(true)}
                className="mx-auto hover:border-blue hover:bg-primarylight text-white font-bold py-2 px-4 rounded-md  sm:px-8 sm:py-2 bo sm:text-sm focus:outline-none focus:shadow-outline bg-blue sm:mb-0 mb-4  items-center justify-center"
              >
                + Add Nurse
              </button>
            </div>
            <hr className=" hidden lg:block h-0.25 my-2 max-w-5xl w-full px-2 bg-slate-300"></hr>
          </div>

          <div>
            {" "}
            <UnitNurseCardDisplay
              unitName={unitName}
              staffData={matchingShift.staff}
            />{" "}
          </div>
  
          <Link
            className="flex flex-row gap-2 text-blue w-full justify-end px-12 mt-12 lg:mt-24"
            to={`/viewUnitShift/${unitName}/${ShiftId}`}
          >
              Go to Shift View Only Screen
              <img src="images/arrow.png" alt="edit icon" className="h-6" />
          </Link>
        </div>
      );
    } else {
      console.log("ShiftId is undefined.");
    }
  } else {
    console.log("ShiftId is undefined.");
  }
}

export default UnitNurseForm;
