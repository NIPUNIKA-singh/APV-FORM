import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function TraineeForm() {
  const navigate = useNavigate();
  const [qualifications, setQualifications] = useState([
    { year: '', examination: '', board: '', subject: '', percentage: '' },
    { year: '', examination: '', board: '', subject: '', percentage: '' },
    { year: '', examination: '', board: '', subject: '', percentage: '' },
  ]);
  const [references, setReferences] = useState([
    { name: '', address: '', mobile: '' },
    { name: '', address: '', mobile: '' },
  ]);
  const [documents, setDocuments] = useState({
    requestLetter: false,
    idProof: false,
    photo: false,
  });
  const [submitted, setSubmitted] = useState('No');
  const [signature, setSignature] = useState(null);

  const handleFileChange = (e) => {
    setSignature(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('qualifications', JSON.stringify(qualifications));
    formData.append('references', JSON.stringify(references));
    formData.append('documents', JSON.stringify(documents));
    formData.append('submitted', submitted);
    if (signature) formData.append('signature', signature);

    try {
      const res = await fetch('https://apv-form.onrender.com/api/traineeForm', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Form submitted successfully!');
        navigate('/training-form');
      } else {
        toast.error(data.error || 'Submission failed');
      }
    } catch (err) {
      console.error('Submit Error:', err);
      toast.error('Network error. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-10 border border-gray-300 p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <div className="flex justify-center h-15 mb-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhIQpSJ6ueYwv5JjQUKJanAyxI60Mkfz2tFw&s"
            alt="img"
          />
      </div>
      <h1 className="text-2xl font-bold text-center">APV Technologies Pvt. Ltd.</h1>

      <div>
        <h2 className="text-lg font-semibold mb-2">Qualification Details:</h2>
        <div className="grid grid-cols-5 gap-4 text-sm font-medium mb-1">
          <label>Year</label>
          <label>Examinations</label>
          <label>Board / University</label>
          <label>Main Subjects / Branch</label>
          <label>% Marks / Division</label>
        </div>
        {qualifications.map((q, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 mb-2">
            <input
              type="text"
              className="border border-gray-500 p-1 rounded"
              placeholder="Year"
              value={q.year}
              onChange={e => {
                const newQ = [...qualifications];
                newQ[i].year = e.target.value;
                setQualifications(newQ);
              }}
              required
            />
            <input
              type="text"
              className="border border-gray-500 p-1 rounded"
              placeholder="Examination"
              value={q.examination}
              onChange={e => {
                const newQ = [...qualifications];
                newQ[i].examination = e.target.value;
                setQualifications(newQ);
              }}
              required
            />
            <input
              type="text"
              className="border border-gray-500 p-1 rounded"
              placeholder="Board/University"
              value={q.board}
              onChange={e => {
                const newQ = [...qualifications];
                newQ[i].board = e.target.value;
                setQualifications(newQ);
              }}
              required
            />
            <input
              type="text"
              className="border border-gray-500 p-1 rounded"
              placeholder="Subjects"
              value={q.subject}
              onChange={e => {
                const newQ = [...qualifications];
                newQ[i].subject = e.target.value;
                setQualifications(newQ);
              }}
              required
            />
            <input
              type="text"
              className="border border-gray-500 p-1 rounded"
              placeholder="% Marks"
              value={q.percentage}
              onChange={e => {
                const newQ = [...qualifications];
                newQ[i].percentage = e.target.value;
                setQualifications(newQ);
              }}
              required
            />
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Please give two references:</h2>
        {references.map((ref, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 mb-2">
            <input
              type="text"
              className="border border-gray-500 p-1 rounded"
              placeholder={`Name ${i + 1}`}
              value={ref.name}
              onChange={e => {
                const newR = [...references];
                newR[i].name = e.target.value;
                setReferences(newR);
              }}
              required
            />
            <input
              type="text"
              className="border border-gray-500 p-1 rounded"
              placeholder="Address"
              value={ref.address}
              onChange={e => {
                const newR = [...references];
                newR[i].address = e.target.value;
                setReferences(newR);
              }}
              required
            />
            <input
              type="text"
              className="border border-gray-500 p-1 rounded"
              placeholder="Mobile"
              value={ref.mobile}
              onChange={e => {
                const newR = [...references];
                newR[i].mobile = e.target.value;
                setReferences(newR);
              }}
              required
            />
          </div>
        ))}
      </div>


      <div>
        <h2 className="text-lg font-semibold mb-2">Please furnish self-attached copies of the following documents also before your training can begin.</h2>
        <div className="space-y-1">
          <label className="block"><input type="checkbox" checked={documents.requestLetter} onChange={e => setDocuments({ ...documents, requestLetter: e.target.checked })} /> Training Request Letter from College/Instituition</label>
          <label className="block"><input type="checkbox" checked={documents.idProof} onChange={e => setDocuments({ ...documents, idProof: e.target.checked })} /> Self attested copies of the CV, High School, Intermediate, Aadhaar & PAN</label>
          <label className="block"><input type="checkbox" checked={documents.photo} onChange={e => setDocuments({ ...documents, photo: e.target.checked })} />One self attested  photograph of yourself</label>
        </div>
      </div>

      <div>
        <label className="block text-lg font-semibold mb-2">Submitted:
          <select value={submitted} onChange={e => setSubmitted(e.target.value)} className="ml-2 border border-gray-500 p-1 rounded">
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <label className="block">
          <div className='font-semibold text-lg'>
            Signature of Training Incharge:
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="block mt-1"
            required
          />
          {signature && (
            <div className="mt-2">
              {/* <p className="text-sm text-gray-600">Preview:</p> */}
              <img
                src={URL.createObjectURL(signature)}
                alt="Signature Preview"
                className="h-15 w-50 object-contain border rounded p-1"
              />
            </div>
          )}
        </label>

      </div>

      <div className="text-center pt-4">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </div>
    </form>
  );
}
