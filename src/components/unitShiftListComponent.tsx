import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

interface IData {
  shiftId: string;
  data: IUnitShiftData;
}

export const UnitShiftListComponent = (unitName: { unitName: string }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [shiftToDelete, SetShiftToDelete] = useState<IUnitShiftObject>();

  function confirmDelete() {
    console.log("deleting Shift", shiftToDelete);
    console.log("delete Shift", shiftToDelete);
    const updatedShiftList = existingData.filter((items: IUnitShiftObject) => {
      return items.shiftId !== shiftToDelete?.shiftId;
    });
    matchingUnit.shifts = updatedShiftList;
    console.log("updatedShiftList", updatedShiftList);
    // Update the state
    setShifts(updatedShiftList);

    // Update localStorage
    localStorage.setItem("Hospital Data", JSON.stringify(hospitalData));
    setShowPopup(false);
  }

  function deleteShift(shift: IUnitShiftObject) {
    console.log("Shift:", shift);
    SetShiftToDelete(shift);
    setShowPopup(true);
  }
  console.log("unitName", unitName);
  const unitNameString = unitName.unitName;
  console.log("unitNameString", unitNameString);
  const navigate = useNavigate();
  const hospitalNameJSON = localStorage.getItem("Hospital Data");
  const hospitalData = hospitalNameJSON
    ? JSON.parse(hospitalNameJSON)
    : { hospitalName: "", hospitalUnits: [] };

  const hospitalUnits = hospitalData.hospitalUnits;
  console.log("hospital units", hospitalUnits);
  const matchingUnit = hospitalUnits.find((unit: IUnitObject) => {
    return unit.unitName === unitNameString;
  });
  console.log("matching unit", matchingUnit);
  const existingData = matchingUnit?.shifts;

  const [shifts, setShifts] = useState(existingData);
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

  existingData?.sort((a: IData, b: IData) => {
    const dateA = parseInt(a.data.shiftDate);
    const dateB = parseInt(b.data.shiftDate);
    return dateB - dateA;
  });

  console.log(existingData);

  function viewShift(shiftId: string) {
    console.log("View shift", shiftId);
    navigate(`/viewUnitShift/${unitNameString}/${shiftId}`);
  }

  function editShift(shiftId: string) {
    console.log("edit Shift", shiftId);
    navigate(`/manageUnitStaff/${unitNameString}/${shiftId}`);
  }
  function cancelDelete() {
    // Close the popup without performing the delete operation
    setShowPopup(false);
  }

  if (shifts?.length !== 0) {
    return (
      <div className="flex flex-col md:flex-col items-center max-w-sm sm:max-w-full">
        {showPopup && shiftToDelete ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ">
            <div className="bg-white p-8 rounded-lg max-w-sm sm:max-w-lg">
              <div className="flex flex-col items-center ">
                <img
                  src="images/danger-icon.png"
                  alt="danger sign icon"
                  className="w-24"
                />
                <p className="text-xl font-bold mb-4">Are you sure?</p>
                <p className="text-lg mb-4 text-center">
                  This action cannot be undone. Only click confirm if you are
                  certain you would like to delete this shift in unit{" "}
                  <strong>{unitNameString}</strong>
                </p>
                <div className="flex flex-col items-start w-full px-4 text-lg">
                  {" "}
                  Shift Being Deleted:{" "}
                  <strong>
                    {" "}
                    <div className="flex flex-row p-2 gap-8 pb-6">
                      {" "}
                      <p>{formatDate(shiftToDelete.data.shiftDate)}</p>
                      <p>{shiftToDelete.data.shiftType}</p>
                    </div>
                  </strong>
                </div>
              </div>

              <div className="flex flex-row p-2 gap-8 pb-6"> </div>

              <div className="flex justify-between flex-col gap-4">
                <button
                  className="bg-red hover:text-red hover:bg-white hover:border-solid hover:border-2 hover:border-red border-solid border-2 border-red text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={confirmDelete}
                >
                  Confirm & Delete
                </button>
                <button
                  className="bg-white hover:bg-blue hover:text-white text-blue border-solid border-2 border-blue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="hidden  w-full md:flex  flex-row text-blue font-bold text-lg  w-800">
          <p className="px-12">Date</p>
          <p className="pl-44">Shift Type</p>
          <p className="pl-48">Actions</p>
        </div>
        <div className="flex flex-col lg:flex-col text-sm sm:text-md md:flex-col items-center ">
          {existingData?.map((existingData: IUnitShiftObject) => (
            <div className="flex flex-col items-center">
              <div
                className="hidden md:flex w-800 sm:my-4  p-4 justify-between flex-row items-center bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 md:duration-500"
                key={existingData.shiftId}
              >
                <div className="p-2 text-md font-semibold w-40 text-center">
                  {formatDate(existingData.data.shiftDate)}
                </div>
                <div className="p-2 text-md font-semibold w-40 text-center">
                  {existingData.data.shiftType}
                </div>

                <div className="flex sm:gap-4 gap-1 flex-row items-center">
                  {" "}
                  <button
                    className="bg-blue font-semibold text-white w-20 h-9 rounded"
                    onClick={() => viewShift(existingData.shiftId)}
                  >
                    View
                  </button>
                  <button
                    className="bg-white text-blue font-bold w-20 h-9 rounded border-solid border-blue border-2"
                    onClick={() => editShift(existingData.shiftId)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-white text-red font-bold w-20 h-9 rounded border-solid border-red border-2"
                    onClick={() => deleteShift(existingData)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div
                className="flex md:hidden sm:my-4 mx-2 sm:p-4 my-4 p-4 gap-2 sm:flex-row items-center bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 md:duration-500"
                key={existingData.shiftId}
              >
                <div className="flex flex-col bg-sky-50 text-black shadow-inner font-bold rounded-md">
                  <div className="p-2 text-lg w-40 text-center">
                    {formatDate(existingData.data.shiftDate)}
                  </div>
                  <div className="p-2 text-lg w-40 text-center">
                    {existingData.data.shiftType}
                  </div>
                </div>

                <div className="flex flex-col sm:gap-8 sm: px-8 gap-1 sm:flex-row items-center justify-evenly">
                  {" "}
                  <button
                    className="mx-auto hover:border-blue hover:bg-primarylight text-white font-bold py-2 px-4 rounded-md  sm:px-8 sm:py-2 bo sm:text-sm focus:outline-none focus:shadow-outline bg-blue sm:mb-0 mb-4  items-center justify-center"
                    onClick={() => viewShift(existingData.shiftId)}
                  >
                    View
                  </button>
                  <button
                    className="mx-auto hover:border-blue hover:bg-lightblue text-blue font-bold py-2 px-4 rounded-md  sm:px-8 sm:py-2 bo sm:text-sm focus:outline-none focus:shadow-outline bg-white border-2 border-solid border-blue sm:mb-0 mb-4  items-center justify-center"
                    onClick={() => editShift(existingData.shiftId)}
                  >
                    Edit
                  </button>
                  <button
                    className="mx-auto  hover:bg-lightred text-red font-bold py-2 px-4 rounded-md  sm:px-8 sm:py-2 bo sm:text-sm focus:outline-none focus:shadow-outline bg-white border-2 border-solid border-red sm:mb-0 mb-4  items-center justify-center"
                    onClick={() => deleteShift(existingData)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    console.log("no shifts entered yet");
  }
};

export default UnitShiftListComponent;
