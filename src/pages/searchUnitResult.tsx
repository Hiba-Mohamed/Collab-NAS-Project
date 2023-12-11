import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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

export const SearchUnitResults = () => {
  const { unitName, shiftDate, shiftType } = useParams();
  console.log("shiftType", shiftType);
  console.log("shiftDate", shiftDate);
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

  const formattedShiftType = shiftType?.replace(/-/g, " ");
  console.log("formattedShiftType", formattedShiftType);

  console.log("unitName", unitName);
  const navigate = useNavigate();
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
  console.log("exsiting data", existingData);

  const [shifts, setShifts] = useState(existingData);

  const matchingShift = existingData?.find((shift: IUnitShiftObject) => {
    return (
      shift.data.shiftDate === shiftDate &&
      shift.data.shiftType === formattedShiftType
    );
  });

  console.log("matching shift", matchingShift);
  function cancelDelete() {
    // Close the popup without performing the delete operation
    setShowPopup(false);
  }

  function viewShift(shiftId: string) {
    console.log("View shift", shiftId);
    navigate(`/viewUnitShift/${unitName}/${shiftId}`);
  }

  function editShift(shiftId: string) {
    console.log("edit Shift", shiftId);
    navigate(`/manageUnitStaff/${unitName}/${shiftId}`);
  }

  function deleteShift(shift: IUnitShiftObject) {
    console.log("Shift Id: ", shift);
    SetShiftToDelete(shift);
    setShowPopup(true);
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

  console.log("matching shift", matchingShift);
  if (shifts && matchingShift) {
    return (
      <div className="flex flex-col bg-sky-50 items-center min-h-screen">
        {showPopup && shiftToDelete ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 ">
            <div className="bg-white p-8 rounded-lg max-w-sm sm:max-w-lg">
              <p className="text-xl font-bold mb-4">
                Are you sure you want to delete this shift?
              </p>
              <div className="flex flex-row p-2 gap-8 pb-6">
                {" "}
                <p>{formatDate(shiftToDelete.data.shiftDate)}</p>
                <p>{shiftToDelete.data.shiftType}</p>
              </div>

              <div className="flex justify-between">
                <button
                  className="bg-white hover:bg-rose-700 hover:text-white text-rose-700 border-solid border-2 border-rose-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-blue hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
        <h1 className="font-OpenSans text-center text-2xl sm:text-4xl font-bold py-8 items-center">
          Search Result
        </h1>{" "}
        <h2 className="font-OpenSans text-center text-2xl sm:text-4xl font-bold py-8 items-center">
          {unitName}
        </h2>
        <div
          className="sm:my-4 mx-2 sm:p-4 my-4 p-4 gap-2 flex sm:flex-row items-center bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 md:duration-500"
          key={existingData.shiftId}
        >
          <div className="flex flex-col bg-sky-50 text-black shadow-inner font-bold rounded-md">
            <div className="p-2 text-lg w-40 text-center">
              {formatDate(matchingShift.data.shiftDate)}
            </div>
            <div className="p-2 text-lg w-40 text-center">
              {matchingShift.data.shiftType}
            </div>
          </div>

          <div className="flex flex-col sm:gap-8 sm: px-8 gap-1 sm:flex-row items-center justify-evenly">
            {" "}
            <button
              className="mx-auto hover:border-blue hover:bg-primarylight text-white font-bold py-2 px-4 rounded-md  sm:px-8 sm:py-2 bo sm:text-sm focus:outline-none focus:shadow-outline bg-blue sm:mb-0 mb-4  items-center justify-center"
              onClick={() => viewShift(matchingShift.shiftId)}
            >
              View
            </button>
            <button
              className="mx-auto hover:border-blue hover:bg-lightblue text-blue font-bold py-2 px-4 rounded-md  sm:px-8 sm:py-2 bo sm:text-sm focus:outline-none focus:shadow-outline bg-white border-2 border-solid border-blue sm:mb-0 mb-4  items-center justify-center"
              onClick={() => editShift(matchingShift.shiftId)}
            >
              Edit
            </button>
            <button
              className="mx-auto  hover:bg-lightred text-red font-bold py-2 px-4 rounded-md  sm:px-8 sm:py-2 bo sm:text-sm focus:outline-none focus:shadow-outline bg-white border-2 border-solid border-red sm:mb-0 mb-4  items-center justify-center"
              onClick={() => deleteShift(matchingShift)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col bg-slate-100 items-center min-h-screen">
        <h1 className="font-OpenSans text-center text-2xl sm:text-4xl font-bold py-8 items-center">
          Search Result
        </h1>{" "}
        <h2 className="font-OpenSans text-center text-2xl sm:text-4xl font-bold pb-8 items-center">
          {unitName}
        </h2>
        <div className="items-center flex w-full justify-evenly">
          <img src="images/shifthistory.png" alt="" />
        </div>
      </div>
    );
  }
};

export default SearchUnitResults;
