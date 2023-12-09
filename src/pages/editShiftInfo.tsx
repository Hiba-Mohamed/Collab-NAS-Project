import EditShiftForm from "../components/editShiftInfoForm";
import { useParams } from "react-router-dom";
export function EditShiftInfo() {
  const { unitName } = useParams();
  console.log("unitName", unitName);

  return (
    <div className="flex flex-col items-center sm:pt-12 pt-14 gap-8 font-OpenSans min-h-screen bg-sky-50">
      <p className="w-screen flex flex-col items-center justify-center text-nunito-900 font-extrabold text-2xl sm:text-3xl tracking-tight text-center">
        Editing Shift
      </p>
      <EditShiftForm />{" "}
    </div>
  );
}
