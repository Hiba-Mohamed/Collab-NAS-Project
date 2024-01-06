export function AboutPage() {
  return (
    <div className="bg-sky-50">
      <div className="flex flex-col lg:items-center lg:flex-row gap-4">
        <img
          src="images/about1.png"
          className="w-500 lg:w-600"
          alt="a picture of two nurses"
        />
        <div className="sm:pr-20 p-4 flex flex-col gap-4">
          <h1 className="text-blue sm:text-3xl lg:text-4xl text-xl font-semibold sm:pb-6">
            {" "}
            What is the NAS (Nurses Assignment Sheet)?
          </h1>
          <h2 className="font-semibold text-lg sm:text-xl sm:pb-6">
            This tool is an electronic document that replaces the paper based
            nurses assignment sheet used in some healthcare settings.
          </h2>
          <h3 className="text-lg sm:text-xl sm:pb-6">
            {" "}
            The NAS provides nurses with clear patient assignments and outlines
            their expected duties. Additionally, the NAS enables efficient
            information sharing among healthcare professionals and
            administrative staff by providing a comprehensive overview of
            patient assignments and workload for a given shift in the unit.
          </h3>
        </div>
      </div>

      <div className="font-OpenSans flex flex-col items-start mb-24 p-4 mt-12">
        <div className="flex flex-col gap-2">
          <h3 className="text-blue sm:text-3xl text-xl font-semibold sm:pb-6 sm:pl-16">
            Why Use the NAS?
          </h3>
          <p className="sm:text-xl sm:pl-16 font-semibold pb-8">
            Using the NAS offers several advantages including, but not limited
            to:
          </p>
        </div>
        <div className="flex flex-col sm:flex-row  gap-12 pb-12 sm:pb-24 md:px-20">
          <div className="flex flex-col gap-2 sm:gap-4">
            <img
              src="images/efficiencyIcon.png"
              className="sm:w-28 w-20 rounded-full shadow-lg"
            />
            <h3 className="sm:text-2xl text-blue text-xl font-semibold">
              Efficiency
            </h3>
            <p className="max-w-3xl pr-6 sm:pr-24">
              {" "}
              Electronic assignment sheets streamline the process of assigning
              and communicating patient information to nurses. They eliminate
              the need for manual entry and allow for real-time updates,
              reducing administrative burden and saving time.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:gap-4">
            <img
              src="images/errorReduction.png"
              className="sm:w-28 w-20 rounded-full shadow-lg"
            />
            <h3 className="sm:text-2xl text-blue font-semibold">
              Error Reduction:
            </h3>
            <p className="max-w-3xl pr-12 sm:pr-20">
              {" "}
              Electronic nurses' assignment sheets contribute to a reduction in
              errors compared to their paper-based counterparts. With electronic
              systems, information can be entered and updated accurately,
              minimizing the risk of transcription errors, illegible
              handwriting, or duplication errors.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:pl-16 pl-4 gap-12 pb-12 sm:pb-24 md:px-20">
          <div className="flex flex-col gap-2 sm:gap-4">
            <img
              src="images/reportingIcon.png"
              className="sm:w-28 w-20 rounded-full shadow-lg"
            />
            <h3 className="sm:text-2xl text-blue font-semibold">
              Data Analysis and Reporting
            </h3>
            <p className="max-w-3xl pr-12 sm:pr-24">
              {" "}
              Electronic systems can capture and store data, allowing for
              analysis and reporting on patient outcomes, workload distribution,
              and overall unit performance. This data-driven approach helps
              healthcare facilities identify trends, optimize resource
              allocation, and make informed decisions to improve patient care
              and operational efficiency.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:gap-4">
            <img
              src="images/envrionmentalIcon.png"
              className="sm:w-28 w-20 rounded-full shadow-lg"
            />
            <h3 className="sm:text-2xl text-blue font-semibold">
              Environmental Impact
            </h3>
            <p className="max-w-3xl pr-12 sm:pr-24">
              {" "}
              Shifting from paper-based assignment sheets to electronic ones
              reduces paper consumption and promotes sustainability. This
              environmentally-friendly approach aligns with the goals of
              healthcare organizations to minimize waste and adopt blueer
              practices.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:items-center lg:flex-row sm:pl-0">
        <img
          src="images/about2.png"
          className="w-500 lg:w-700 pb-4 "
          alt="a picture of a nurse working on a computer"
        />
        <div className="pl-6 pb-12">
          <h1 className="text-blue sm:text-3xl text-xl font-semibold sm:pb-6 sm:pl-16 pb-4">
            The Unique Features of the NAS:
          </h1>
          <h2 className="sm:pb-6 sm:pl-16 text-blue text-lg sm:text-2xl font-semibold">
            Regulated Access
          </h2>
          <p className="sm:pb-6 sm:pl-16 pr-12 sm:pr-24">
            {" "}
            Electronic nurses' assignment sheets offer regulated access,
            ensuring that only authorized users can view and make changes to the
            document. Access can be restricted to healthcare professionals
            involved in patient care, preventing unauthorized individuals from
            tampering with or accessing sensitive information.
          </p>
          <hr className="bg-orange max-w-xl sm:max-w-5xl flex sm:ml-12 mb-12 mx-4 h-1.5 md:max-w-5xl"></hr>

          <h2 className="sm:pb-6 sm:pl-16 text-blue text-lg sm:text-2xl font-semibold">
            Creating Electronic Sheets for Future Dates{" "}
          </h2>
          <p className="sm:pb-6 sm:pl-16 pr-12 sm:pr-24 pb-4">
            {" "}
            With the NAS, healthcare professionals can effortlessly generate
            electronic sheets for future dates, enabling them to plan and
            organize patient information in advance. This powerful feature
            streamlines the process of preparing for upcoming shifts,
            eliminating the need for manual data entries and ensuring the
            information is up-to-date and accurate.
          </p>
          <hr className="bg-orange max-w-xl sm:max-w-5xl flex sm:ml-12 mb-12 mx-4 h-2 md:max-w-5xl"></hr>
          <h2 className="sm:pb-6 sm:pl-16 text-blue text-lg sm:text-2xl font-semibold">
            Duplication Safeguards
          </h2>
          <p className="sm:pb-6 sm:pl-16 pr-12 sm:pr-24">
            {" "}
            Safeguards are incorporated to prevent the duplication of nurses'
            names, patient names, or room numbers. The electronic system can
            employ validation rules and checks to ensure that each entry is
            unique and that no duplicates are allowed. This helps avoid
            confusion, potential mix-ups, or errors caused by inadvertently
            assigning multiple nurses to the same patient or vice versa. By
            implementing these safeguards, the NAS promotes accuracy, reduces
            the risk of data duplication, and contributes to maintaining clear
            and unambiguous patient assignments.
          </p>
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default AboutPage;
