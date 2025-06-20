"use client";
import { useSession, signOut } from "next-auth/react";
import Notes from "../../components/Notes";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allNotes, setAllNotes] = useState([]);

  async function fetch() {
    try {
      const result = await axios.get("/api/notes");
      console.log(result.data);
      setAllNotes(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("/api/notes", {
        id: session.user.id,
        title: title,
        content: content,
      });

      setTitle("");
      setContent("");
      alert("Note created Successfully");

      fetch();
    } catch (error) {
      console.error("Error", error);
      alert("Error creating note");
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Welcome!</h1>
            <p className="mt-4 text-gray-600">You are not logged in.</p>
          </div>

          <div className="space-y-4">
            <a
              href="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </a>

            <a
              href="/signup"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Create New Note
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    placeholder="Enter note title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    rows="8"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    placeholder="Write your note here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
                >
                  Save Note
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Dashboard
                  </h1>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Sign Out
                  </button>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-8">
                  <h2 className="text-lg font-semibold text-green-800 mb-4">
                    Welcome back!
                  </h2>
                  <p className="text-green-700">
                    You are successfully logged in.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-md p-6 mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Session Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-32">
                        Email:
                      </span>
                      <span className="text-gray-900">
                        {session.user.email}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-32">
                        User ID:
                      </span>
                      <span className="text-gray-900">{session.user.id}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-32">
                        Session expires:
                      </span>
                      <span className="text-gray-900">
                        {new Date(session.expires).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Your Notes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {allNotes.map((notes) => (
                      <Notes
                        key={notes.id}
                        id = {notes.id}
                        title={notes.title}
                        content={notes.content}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
