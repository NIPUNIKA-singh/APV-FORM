export default function RequiredDocuments() {
  return (
    <div className="max-w-5xl bg-white mx-auto border border-gray-300 p-6 rounded-lg shadow-md my-10">
      <div className="text-center mb-6">
        <div className="flex justify-center h-15 mb-2">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhIQpSJ6ueYwv5JjQUKJanAyxI60Mkfz2tFw&s" alt="img" />
        </div>
        <h1 className="text-xl font-bold uppercase">APV Technologies Pvt. Ltd.</h1>
        <p className="text-lg text-gray-600 italic mt-1">
          Note: Please submit following documents before joining of Training
        </p>
      </div>

      <ol className="list-decimal list-inside space-y-2 text-base font-medium text-lg">
        <li>Latest signed CV</li>
        <li>
          All Educational and Professional Mark sheets &amp; Certificates –{" "}
          <span className="italic">Self Attested</span>
        </li>
        <li>Training request letter by College / Institution</li>
        <li>Aadhaar</li>
        <li>PAN</li>
      </ol>

      <p className="mt-6 text-lg text-gray-700 leading-relaxed">
        As per our rules, allow joining only after receiving the above documents and
        completion of other required formalities.
      </p>
    </div>
  );
}