import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Make sure to adjust this import

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  class: string;
  section: string;
  rollNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

const EditStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the student ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [student, setStudent] = useState<Student | null>(null); // Fixed: Student type as object
  const [loading, setLoading] = useState<boolean>(true);

  // Updated form data to match the student interface
  const [formData, setFormData] = useState<Student>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    class: "",
    section: "",
    rollNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const studentDoc = doc(db, "students", id);
          const studentSnap = await getDoc(studentDoc);

          if (studentSnap.exists()) {
            const studentData = studentSnap.data() as Student; // Ensure it's treated as a Student type
            setStudent(studentData);
            setFormData(studentData); // Populate form data with current student data
          } else {
            console.log("No such student!");
          }
        } catch (error) {
          console.error("Error fetching student:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchStudent();
    }
  }, [id]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: Student) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (save the data)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) {
        console.error("Student ID is missing");
        return;
      }
      const studentDocRef = doc(db, "students", id);
      await updateDoc(studentDocRef, formData); // Update the student document in Firestore
      alert("Student details updated successfully!");
      navigate(`/students`); // Redirect to the View page after save
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student. Please try again.");
    }
  };

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-blue-100 shadow-lg rounded-lg">
      <div className="mb-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/students`)} // Navigate to the previous page
          className="text-blue-600 hover:text-blue-800 font-semibold py-2 px-4 border border-blue-600 rounded-md"
        >
          &larr; Back
        </button>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Edit Student</h2>
        <p className="text-lg text-gray-500">
          Modify the details of the student
        </p>
      </div>

      {student ? (
        <form onSubmit={handleSave} className="space-y-6">
          {/* Render form fields */}
          {Object.keys(formData).map((key) => {
            // Skip 'id' field as we don't want to edit it
            if (key === "id") return null;

            return (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">
                  {key}
                </label>
                <input
                  type={key === "dateOfBirth" ? "date" : "text"}
                  name={key}
                  value={(formData as any)[key]} // Cast formData to handle dynamic keys
                  onChange={handleInputChange}
                  className="mt-1 p-2 border bg-white border-gray-300 rounded-md"
                  required
                />
              </div>
            );
          })}

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <p className="text-center text-lg text-red-600">No student found</p>
      )}
    </div>
  );
};

export default EditStudent;
