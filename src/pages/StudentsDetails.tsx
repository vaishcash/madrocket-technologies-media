import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // Make sure to adjust this import

const StudentsDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the student ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [student, setStudent] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const studentDoc = doc(db, "students", id);
          const studentSnap = await getDoc(studentDoc);

          if (studentSnap.exists()) {
            setStudent(studentSnap.data());
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

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-blue-100 shadow-lg rounded-lg">
      <div className="mb-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // Navigate to the previous page
          className="text-blue-600 hover:text-blue-800 font-semibold py-2 px-4 border border-blue-600 rounded-md"
        >
          &larr; Back
        </button>
      </div>

      {student ? (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">
              <strong>Name:</strong> {student.firstName} {student.lastName}
            </h2>
            <p className="font-bold text-2xl text-gray-500">Student Details</p>
          </div>

          <div className="space-y-6">
            {/* Student Details */}
            <div className="bg-gray-50 p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                Personal Information
              </h3>
              <p className="text-gray-600">
                <strong>Email:</strong> {student.email}
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> {student.phoneNumber}
              </p>
              <p className="text-gray-600">
                <strong>Full Name:</strong> {student.firstName}{" "}
                {student.lastName}
              </p>
              <p className="text-gray-600">
                <strong>Gender:</strong> {student.gender}
              </p>
              <p className="text-gray-600">
                <strong>Date of Birth:</strong> {student.dateOfBirth}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold text-blue-900  mb-3">
                Academic Details
              </h3>
              <p className="text-gray-600">
                <strong>Class:</strong> {student.class}
              </p>
              <p className="text-gray-600">
                <strong>Section:</strong> {student.section}
              </p>
              <p className="text-gray-600">
                <strong>Roll Number:</strong> {student.rollNumber}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-md shadow-md">
              <h3 className="text-xl font-semibold text-blue-900  mb-3">
                Address
              </h3>
              <p className="text-gray-600">
                <strong>Address:</strong> {student.address}, {student.city},{" "}
                {student.state}, {student.pinCode}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-lg text-red-600">No student found</p>
      )}
    </div>
  );
};

export default StudentsDetails;
