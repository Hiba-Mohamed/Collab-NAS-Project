import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface IUnitShiftData {
  shiftDate: Date;
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

export default function HospitalView() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState("");

  function confirmDelete() {
    console.log("deleting Unit", unitToDelete);
    const updatedUnitsList = hospitalUnitsList.filter((items: IUnitObject) => {
      return items.unitName !== unitToDelete;
    });
    hospitalData.hospitalUnits = updatedUnitsList;
    console.log("updatedUnitsList", updatedUnitsList);
    // Update the state
    setUnits(updatedUnitsList);
    // Update localStorage
    localStorage.setItem("Hospital Data", JSON.stringify(hospitalData));
    // Close the popup
    setShowPopup(false);
  }

  function cancelDelete() {
    // Close the popup without performing the delete operation
    setShowPopup(false);
  }
  const hospitalNameJSON = localStorage.getItem("Hospital Data");

  const hospitalData = hospitalNameJSON
    ? JSON.parse(hospitalNameJSON)
    : { hospitalName: "", hospitalUnits: [] };
  const hospitalUnitsList = hospitalData.hospitalUnits;
  console.log("hospital Units", hospitalUnitsList);

  const [units, setUnits] = useState(hospitalUnitsList);
  // Function to concatenate staff arrays for all shifts of a unit
function getAllStaffForUnit(unit: IUnitObject): number {
  const uniqueNurseNames = new Set<string>();
  const uniqueStaff: IStaffData[] = [];

  unit.shifts.forEach((shift) => {
    shift.staff.forEach((staffData) => {
      const nurseName = staffData.nurseData.nurseName;

      // Check if the nurse name is not already in the Set
      if (!uniqueNurseNames.has(nurseName)) {
        uniqueNurseNames.add(nurseName);
        uniqueStaff.push(staffData);
      }
    });
  });

  return uniqueStaff.length;
}

  // Function to create array of concatenated staff for each unit
  function createAllStaffArrayForUnits(unitsList: IUnitObject[]): void {
    unitsList.forEach((unit) => {
      const allStaffForUnit = getAllStaffForUnit(unit);
      console.log(`Unit: ${unit.unitName}, All Staff: `, allStaffForUnit);
      // You can store or use the allStaffForUnit array as needed
    });
  }

  // Call the function to create arrays for all units
  createAllStaffArrayForUnits(units);

  function viewUnit(unitName: string) {
    navigate(`/specificUnitNav/${unitName}`);
  }

  function editUnit(unitName: string) {
    console.log(unitName);
    const modifiedUnitName = unitName.replace(/ /g, "-");
    navigate(`/editUnitName/${modifiedUnitName}`);
  }

  function deleteUnit(unitName: string) {
    setShowPopup(true);
    setUnitToDelete(unitName);
  }


  if (units) {
    return (
      <div className="font-OpenSans flex flex-col items-center min-h-screen pb-24 sm:pb-32 bg-sky-50">
        {showPopup ? (
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
                  certain you would like to delete this unit
                </p>
                <p className="text text-lg ">
                  {" "}
                  Unit Being Deleted: <strong>{unitToDelete}</strong>
                </p>
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
        <div className="sm:pb-6 sm:pt-12 flex w-full flex-col items-center justify-between py-6">
          <h1 className=" text-2xl flex flex-row gap-2 font-bold sm:text-3xl lg:text-5xl ">
            <p className="">{hospitalData.hospitalName}</p>
            <Link to="/getStarted">
              {" "}
              <img className="h-6 lg:h-8" src="images/edit-grey.png" />
            </Link>
          </h1>
        </div>

        <hr className="border-1 border-faint w-full max-w-6xl px-6"></hr>

        <div className="flex flex-col w-full items-center sm:items-end pt-8">
          {" "}
          <Link
            to="/addingNewUnit"
            className="hover:bg-primarylight text-white font-bold border-solid sm:mx-12 lg:mx-48 border-2 w-32 sm:py-1 text-center border-blue hover:border-primarylight sm:text-sm rounded focus:outline-none focus:shadow-outline bg-blue"
          >
            + Add Unit
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-evenly pb-6">
          {hospitalUnitsList.map((unit: IUnitObject) => (
            <div className="shadow-lg bg-white flex flex-col rounded-lg my-6 sm:my-6  max-w-sm mx-2 text-sm sm:text-xl w-56 sm:w-80 p-4">
              {" "}
              <button
                onClick={() => deleteUnit(unit.unitName)}
                className="flex justify-end"
              >
                <img src="images/delete-icon.png" className="h-4" />
              </button>
              <p className="text-md font-bold  sm:text-xl text-center flex justify-center p-4 ">
                {unit.unitName}
              </p>
              <div className="flex flex-row gap-8 sm:gap-24 sm:text-md sm:px-4 pb-2 text-sm ">
                <div>
                  <p className="font-bold"># of Shifts: </p>
                  <p>{unit.shifts.length}</p>
                </div>
                <div>
                  <p className="font-bold"># of Nurses:</p>
                  <p>{getAllStaffForUnit(unit)}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row text-sm sm:text-md lg:flex-row items-center justify-evenly">
                  {" "}
                  <button
                    onClick={() => editUnit(unit.unitName)}
                    className="flex flex-row mx-auto hover:bg-lightblue text-blue font-bold sm:px-10 sm:py-1 sm:text-sm py-2 px-6 rounded focus:outline-none focus:shadow-outline bg-white border-solid border-2 border-blue  sm:mt-0 mt-6"
                  >
                    <p> Edit</p>
                  </button>
                  <button
                    className="mx-auto hover:bg-primarylight text-white font-bold py-2 px-4  border-solid border-2 border-blue hover:border-primarylight sm:px-10 sm:py-1 bo sm:text-sm rounded focus:outline-none focus:shadow-outline bg-blue sm:mt-0 mt-6"
                    onClick={() => viewUnit(unit.unitName)}
                  >
                    View
                  </button>
                </div>
              </div>
              <div className="flex hidden flex-row text-sm sm:text-md lg:flex-row items-center justify-evenly">
                <button
                  className="sm:mx-2 mx-1 bg-sky-600 hover:bg-sky-500 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => editUnit(unit.unitName)}
                >
                  Edit Name
                </button>
                <button
                  className="sm:mx-2 mx-1 bg-red hover:bg-red text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => deleteUnit(unit.unitName)}
                >
                  Delete Unit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <p className="p-12 text-2xl font-bold sm:text-5xl">
          No Units Have been added yet, to start adding units, please click
          button below.
        </p>{" "}
        <Link
          to="/getStarted"
          className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold sm:py-4 sm:px-14 py-4 px-24 rounded sm:text-xl text-md"
        >
          Get Started
        </Link>
      </div>
    );
  }
}
