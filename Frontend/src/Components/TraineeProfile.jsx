import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function TraineeProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    fatherName: "",
    residentialAddress: "",
    mobileNumber: "",
    permanentAddress: "",
    alternateMobileNumber: "",
    aadhaarNumber: "",
    colleges: [
      { institutionName: "", course: "", semester: "", year: "" },
      { institutionName: "", course: "", semester: "", year: "" },
      { institutionName: "", course: "", semester: "", year: "" },
    ],
    photo: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCollegeChange = (e, index) => {
    const { name, value } = e.target;
    const updatedColleges = [...formData.colleges];
    updatedColleges[index][name] = value;
    setFormData({ ...formData, colleges: updatedColleges });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.mobileNumber || !formData.aadhaarNumber) {
      return toast.error("Please fill in required fields.");
    }

    const submissionData = new FormData();
    for (let key in formData) {
      if (key === "colleges") {
        submissionData.append(key, JSON.stringify(formData[key]));
      } else {
        submissionData.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch("http://localhost:5050/api/traineeProfile", {
        method: "POST",
        body: submissionData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Form Data saved successfully!");
        navigate("/trainee-form");
      } else {
        toast.error(data.error || "Failed to save Form Data");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Network error. Please try again later.");
    }
  };

  return (
    <div className="my-10 border border-gray-300 max-w-5xl mx-auto bg-white shadow-xl p-6 rounded-lg">
      <div className="flex justify-center h-15 mb-2">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhIQpSJ6ueYwv5JjQUKJanAyxI60Mkfz2tFw&s" alt="img" />
      </div>
      <h2 className="text-center text-xl font-bold mb-6 uppercase">
        APV Technologies Pvt. Ltd.
      </h2>

      <h3 className="text-lg font-semibold underline mb-4">
        Personal Profile Format of Trainee
      </h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-medium">Upload Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-55 border border-gray-400 p-2 rounded-xl"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 w-32 h-35 object-cover border rounded"
            />
          )}
        </div>
        {[ "fullName", "dateOfBirth", "fatherName", "mobileNumber", "alternateMobileNumber", "aadhaarNumber" ].map((field) => (
          <div className="flex flex-col" key={field}>
            <label className="font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}:</label>
            <input
              type={field === "dateOfBirth" ? "date" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="border border-gray-400 p-2 rounded-md"
              required={["fullName", "mobileNumber", "aadhaarNumber"].includes(field)}
            />
          </div>
        ))}

        {[ "residentialAddress", "permanentAddress" ].map((field) => (
          <div className="flex flex-col" key={field}>
            <label className="font-medium capitalize">{field.replace(/([A-Z])/g, " $1")}:</label>
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              rows={2}
              className="border border-gray-400 p-2 rounded-md"
            />
          </div>
        ))}


        <h3 className="font-semibold mt-6">
          Present College / Institution Name, Course & Semester Details:
        </h3>

        <table className="table-auto w-full border mt-2 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border py-2">Institution Name</th>
              <th className="border py-2">Course</th>
              <th className="border py-2">Semester</th>
              <th className="border py-2">Year</th>
            </tr>
          </thead>
          <tbody>
            {formData.colleges.map((college, idx) => (
              <tr key={idx}>
                {["institutionName", "course", "semester", "year"].map((field) => (
                  <td className="border px-2 py-1" key={field}>
                    <input
                      type="text"
                      name={field}
                      value={college[field]}
                      onChange={(e) => handleCollegeChange(e, idx)}
                      className="w-full h-full p-1 focus:outline-none rounded"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}