import Login from "./pages/login";
import AboutPage from "./pages/about";
import { Routes, Route } from "react-router-dom";
import Heading from "./components/header/header";
import Footer from "./components/footer/footer";
import Account from "./pages/account";
import LandingPage from "./pages/introPage";
import GetStarted from "./pages/getStarted";
import HospitalView from "./pages/hospitalView";
import NewUnit from "./pages/addingNewUnit";
import { StartUnitSheet } from "./pages/startUnitShift";
import UnitNurseForm from "./pages/manageUnitStaff";
import EditUnitNursePage from "./pages/editUnitNurse";
import SpecificUnitNav from "./pages/specificUnitNav";
import { UnitShiftHistory } from "./pages/unitShiftHistory";
import ViewUnitShift from "./pages/viewUnitShift";
import SearchUnitResults from "./pages/searchUnitResult";
import EditUnit from "./pages/editUnitName";
import { EditShiftInfo } from "./pages/editShiftInfo";
import StartStaff from "./pages/addNurse";


function App() {
  return (
    <div className="App font-OpenSans font-normal">
      <Heading />
      <Routes>
        <Route path="/addingNewUnit" element={<NewUnit />} />
        <Route path="/hospitalView" element={<HospitalView />} />
        <Route path="getStarted" element={<GetStarted />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/addNurse/:unitName/:ShiftId" element={<StartStaff />} />
        <Route path="/editUnitName/:unitName" element={<EditUnit />} />
        <Route
          path="/editShiftInfo/:unitName/:ShiftId"
          element={<EditShiftInfo />}
        />
        <Route
          path="/unitShiftHistory/:unitName"
          element={<UnitShiftHistory />}
        />
        <Route
          path="/searchUnitResult/:unitName/:shiftDate/:shiftType"
          element={<SearchUnitResults />}
        />
        <Route
          path="/viewUnitShift/:unitName/:ShiftId"
          element={<ViewUnitShift />}
        />
        <Route
          path="/editUnitNurse/:unitName/:ShiftId/:nurseId"
          element={<EditUnitNursePage />}
        />
        <Route
          path="/specificUnitNav/:unitName"
          element={<SpecificUnitNav />}
        />
        <Route
          path="/manageUnitStaff/:unitName/:ShiftId"
          element={<UnitNurseForm />}
        />
        <Route path="/startUnitShift/:unitName" element={<StartUnitSheet />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/introPage" element={<LandingPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
