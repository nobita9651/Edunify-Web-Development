// AddSchool.jsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AddSchool() {
  const { control, handleSubmit, formState, setError, reset } = useForm();
  const fileInputRef = React.useRef(null); // Add a ref for the file input
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      formData.append("image", data.image[0]);

      const response = await axios.post("/api/addSchool", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Inside the try block after successful submission
      if (response.data.success) {
        console.log("School added successfully!");

        // Reset the form only on successful submission
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);

          // Use the ref to clear the file input
          fileInputRef.current.value = null;

          reset(); // Move reset inside this block
        }, 700);
      } else {
        // Handle error case
        setError("submit", {
          type: "manual",
          message: response.data.error,
        });
      }
    } catch (error) {
      console.error("Error adding school:", error);

      // Log the specific error message
      console.error(error.message);

      // You may want to reset the form even in case of an error
      // to allow the user to try again
      reset();

      // Display an error message to the user
      setError("submit", {
        type: "manual",
        message: "An error occurred while adding the school.",
      });
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Navbar />
      <h1 style={{ fontWeight: "bold", padding: "5px", margin: "5px" }}>
        Add School
      </h1>
      <div
        style={{
          border: "2px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "450px",
          margin: "auto",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ maxWidth: "300px", margin: "auto" }}
        >
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              School Name:
            </label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter school name"
                  style={{ width: "100%", padding: "5px" }}
                />
              )}
              rules={{ required: true }}
            />
          </div>

          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Email:
            </label>
            <Controller
              name="email_id"
              control={control}
              defaultValue="" // Add defaultValue for the input
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter email"
                  style={{ width: "100%", padding: "5px" }}
                />
              )}
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
            />
          </div>

          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Address:
            </label>
            <Controller
              name="address"
              control={control}
              defaultValue="" // Add defaultValue for the input
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter address"
                  style={{ width: "100%", padding: "5px" }}
                />
              )}
              rules={{ required: true }}
            />
          </div>

          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <labe style={{ display: "block", marginBottom: "5px" }}>City:</labe>
            <Controller
              name="city"
              control={control}
              defaultValue="" // Add defaultValue for the input
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter city"
                  style={{ width: "100%", padding: "5px" }}
                />
              )}
              rules={{ required: true }}
            />
          </div>

          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              State:
            </label>
            <Controller
              name="state"
              control={control}
              defaultValue="" // Add defaultValue for the input
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter state"
                  style={{ width: "100%", padding: "5px" }}
                />
              )}
              rules={{ required: true }}
            />
          </div>

          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Contact:
            </label>
            <Controller
              name="contact"
              control={control}
              defaultValue="" // Add defaultValue for the input
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter contact number"
                  style={{ width: "100%", padding: "5px" }}
                />
              )}
              rules={{ required: true }}
            />
          </div>

          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Image:
            </label>
            <Controller
              name="image"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files)}
                  onBlur={(e) => field.onBlur(e.target.files)}
                  ref={(inputRef) => {
                    field.ref(inputRef); // Assign the ref to the file input
                    fileInputRef.current = inputRef; // Store the ref in the ref object
                  }}
                />
              )}
              rules={{ required: true }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px",
              cursor: "pointer",
              border: "2px solid green",
              backgroundColor: "green",
              color: "white",
              width: "100%",
            }}
          >
            Submit
          </button>

          {formState.errors.submit && (
            <p style={{ color: "red", marginTop: "10px" }}>
              {formState.errors.submit.message}
            </p>
          )}

          {showSuccessMessage && (
            <p style={{ color: "green", marginTop: "10px" }}>
              Added Successfully!
            </p>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}
