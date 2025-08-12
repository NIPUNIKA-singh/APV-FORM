import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TrainingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    checkedBy: "",
    verifiedBy: "",
    approvedBy: "",
    startDate: "",
    endDate: "",
    projectDesc: "",
    teamLeader: "",
    projectManager: "",
    certificateNo: "",
    issueDate: "",
    signature: null,
  });

  const [signaturePreview, setSignaturePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "signature") {
      const file = files[0];
      setFormData({ ...formData, signature: file });
      setSignaturePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:5050/api/training", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Form submitted successfully");
      navigate("/required-documents");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="my-10 border border-gray-300 max-w-5xl mx-auto bg-white p-6 shadow-md rounded-xl"
        encType="multipart/form-data"
      >
        <div className="flex justify-center h-15 mb-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhIQpSJ6ueYwv5JjQUKJanAyxI60Mkfz2tFw&s"
            alt="img"
          />
        </div>

        <h1 className="text-2xl font-semibold text-center mb-4">
          APV Technologies Pvt. Ltd.
        </h1>
        <p className="text-sm italic">For office use only</p>

        <div className="grid grid-cols-3 gap-4 mt-4 mb-6">
          <div>
            <label className="block font-medium">Checked by:</label>
            <input
              type="text"
              name="checkedBy"
              value={formData.checkedBy}
              onChange={handleChange}
              className="w-full border border-gray-400 px-2 py-1 rounded"
              placeholder="Training Incharge"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Verified and recommended by:</label>
            <input
              type="text"
              name="verifiedBy"
              value={formData.verifiedBy}
              onChange={handleChange}
              className="w-full border border-gray-400 px-2 py-1 rounded"
              placeholder="Sr. Project Manager"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Approved by:</label>
            <input
              type="text"
              name="approvedBy"
              value={formData.approvedBy}
              onChange={handleChange}
              className="w-full border border-gray-400 px-2 py-1 rounded"
              placeholder="Director"
              required
            />
          </div>
        </div>

        <h2 className="font-semibold mb-2">After Successful Training:</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-medium">Date of Start of Training:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-gray-400 px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Date of Completion of Training:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-gray-400 px-2 py-1 rounded"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block font-medium">
              Name of Project / Brief description of training:
            </label>
            <textarea
              name="projectDesc"
              value={formData.projectDesc}
              onChange={handleChange}
              className="w-full border border-gray-400 px-2 py-1 rounded"
              rows={3}
              required
            ></textarea>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-medium">Verified by the Team Leader:</label>
            <input
              type="text"
              name="teamLeader"
              value={formData.teamLeader}
              onChange={handleChange}
              className="w-full border border-gray-400 px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Approved by the Sr. Project Manager:</label>
            <input
              type="text"
              name="projectManager"
              value={formData.projectManager}
              onChange={handleChange}
              className="w-full border border-gray-400 px-2 py-1 rounded"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-medium">Issuing Certificate No:</label>
            <input
              type="text"
              name="certificateNo"
              value={formData.certificateNo}
              onChange={handleChange}
              className="w-full border border-gray-400 px-2 py-1 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Issue Date:</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="w-full border border-gray-400 px-2 py-1 rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Training Incharge Signature:</label>
          <input
            type="file"
            name="signature"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
            required
          />
          {signaturePreview && (
            <div className="mt-2">
              <img src={signaturePreview} alt="Signature Preview" className="w-30 object-contain border rounded" />
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
  );
};

export default TrainingForm;