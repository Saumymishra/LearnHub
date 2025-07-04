import React, { useState, useRef } from "react";

const CourseUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setError("");
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!file) {
      setError("Please upload a file by drag & drop or file selector");
      setLoading(false);
      return;
    }
    if (!title.trim()) {
      setError("Course title is required");
      setLoading(false);
      return;
    }
    if (!description.trim()) {
      setError("Course description is required");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to upload a course");
        setLoading(false);
        return;
      }

      const createCourseRes = await fetch("https://liveroom-backend.onrender.com/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (!createCourseRes.ok) {
        const data = await createCourseRes.json();
        throw new Error(data.message || "Failed to create course");
      }

      const courseData = await createCourseRes.json();

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch(
          `https://liveroom-backend.onrender.com/api/courses/${courseData._id}/upload`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!uploadRes.ok) {
          const data = await uploadRes.json();
          throw new Error(data.message || "Failed to upload media");
        }
      }

      alert("Course uploaded successfully!");
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-10 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 mb-8 tracking-wide">
          Upload Your Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Drag and drop area first */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
            className={`cursor-pointer flex flex-col items-center justify-center border-2 border-dashed rounded-md border-gray-400 dark:border-gray-600 p-8 text-center
              ${
                file ? "bg-indigo-100 dark:bg-indigo-900 border-indigo-600" : "hover:border-indigo-500"
              } transition-colors duration-300`}
            aria-label="Drag and drop your file here or click to select"
          >
            {file ? (
              <p className="text-indigo-700 dark:text-indigo-300 font-semibold">{file.name}</p>
            ) : (
              <>
                <p className="text-gray-500 dark:text-gray-400 mb-2">Drag and drop a file here, or click to select</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">(Supported file types: any)</p>
              </>
            )}
            <input
              ref={fileInputRef}
              id="file"
              type="file"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Course Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Course Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-indigo-500 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description"
              rows={4}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-indigo-500 transition resize-none"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-center font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3 rounded-lg font-semibold text-white shadow-md transition 
              ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
              }`}
          >
            {loading ? "Uploading..." : "Upload Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseUpload;
