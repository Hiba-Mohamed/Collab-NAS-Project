import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div className="min-h-screen items-center bg-sky-50 font-OpenSans flex flex-col max-w-xl sm:max-w-full px-2">
      <div className="flex flex-row bg-[url('/images/banner.png')] w-full items-center justify-center bg-cover">
        <div className="max-w-3xl flex flex-col w-full items-center pt-12">
          <div className="flex sm:pt-12 flex-col  lg:text-5xl items-center py-4 text-blue text-2xl sm:text-4xl text-center font-bold">
            <p>Welcome to the Electronic NAS </p>
            <p> (Nurses Assignment Sheet)!</p>
          </div>
          <div className="flex flex-col items-center p-4 text-start  mb-6 p-12">
            <p className="text-center text-md sm:text-lg lg:text-xl">
              The NAS is an elctronic document that replaces the paper-based
              nurses assignment sheet used in some healthcare settings. It is
              used to communicate vital information to nurses and other staff
              throughout the shift.
            </p>
          </div>
          <Link
            to="/getStarted"
            className="bg-blue lg:text-lg hover:bg-sky-500 text-white font-bold py-2 px-10 rounded-lg mb-12 focus:outline-none focus:shadow-outline"
          >
            {" "}
            Get Started!
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center sm:mt-28 mx-4 p-4 text-start text-lg">
        <p className="font-bold text-blue text-xl sm:text-2xl lg:text-4xl">
          A Quick Guide to Get Started Below:
        </p>
      </div>
      <div className="flex flex-col justify-evenly items-center">
        <div className=" flex flex-col justify-evenly lg:flex-row">
          <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start m-2 py-4">
            <div className="flex flex-col gap-2">
              <div className="pb-4 w-300 sm:w-400">
                <p className="font-extrabold text-lg sm:text-2xl">
                  Step 1: Create Hospital Profile
                </p>
                <p className="">
                  Click on "Get Started" button above to create a Hospital
                  profile.
                </p>
              </div>
              <img
                src="images/features1.png"
                alt=""
                className="rounded-xl w-300 sm:w-400"
              />
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start m-2 py-4">
            <div className="flex flex-col gap-2">
              <div className="pb-4 w-300 sm:w-400">
                <p className="font-extrabold text-lg sm:text-2xl">
                  Step 2: Create New Unit profile
                </p>
                <p className="">Type your new hospital units's name.</p>
              </div>
              <img
                src="images/features6.png"
                alt=""
                className="rounded-xl w-300 sm:w-400"
              />
            </div>
          </div>
        </div>
        <div className=" flex flex-col lg:flex-row ">
          <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start m-2 py-4">
            <div className="flex flex-col gap-2">
              <div className="pb-4 w-300 sm:w-400">
                <p className="font-extrabold text-lg sm:text-2xl">
                  Step 3: Create New Shifts
                </p>
                <p className="">
                  Click on the icon on the left to start creating shifts for the
                  unit.
                </p>
                <p>Specify the date and type of the shift.</p>
              </div>
              <img
                src="images/features5.png"
                alt=""
                className="rounded-xl w-300 sm:w-400"
              />
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start m-2 py-4">
            <div className="flex flex-col gap-2">
              <div className="pb-4 w-300 sm:w-400">
                <p className="font-extrabold text-lg sm:text-2xl">
                  Step 4: Manage Shifts Assignments
                </p>
                <p className="">
                  Edit shift and assignment information as necessary.
                </p>
                <p>Specify the date and type of the shift.</p>
              </div>
              <img
                src="images/features4.png"
                alt=""
                className="rounded-xl w-300 sm:w-400"
              />
            </div>
          </div>
        </div>
        <div className=" flex flex-col lg:flex-row ">
          <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start m-2 py-4">
            <div className="flex flex-col gap-2">
              <div className="pb-4 w-300 sm:w-400">
                <p className="font-extrabold text-lg sm:text-2xl">
                  Step 5: Review or Search for Shifts
                </p>
                <p className="">
                  Click on the icon on the left to access your shifts record.
                </p>
                <p>
                  Shifts are autosaved and organized from newest to oldest. Use
                  the search bar to quickly find a specific shift.
                </p>
              </div>
              <img
                src="images/features5.png"
                alt=""
                className="rounded-xl w-300 sm:w-400"
              />
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white flex flex-row items-start px-6 shadow-lg text-start m-2 py-4">
            <div className="flex flex-col gap-2">
              <div className="pb-4 w-300 sm:w-400">
                <p className="font-extrabold text-lg sm:text-2xl">
                  Step 6: Review Hospital Profile
                </p>
                <p className="">
                  Click on "Hospital Units" from the navigation menu.
                </p>
                <p>Review and edit your Hospital profile as necassary.</p>
              </div>
              <img
                src="images/features3.png"
                alt=""
                className="rounded-xl w-300 sm:w-400"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center py-16">
        <p className="py-10 lg:text-xl max-w-xl text-center">
          There is no need to have an account as of now. You can log in as a
          guest and explore the tool!
        </p>
        <Link
          to="/getStarted"
          className="bg-blue lg:text-lg hover:bg-sky-500 text-white font-bold py-2 px-10 rounded-lg mb-12 focus:outline-none focus:shadow-outline"
        >
          {" "}
          Try it Now!
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
