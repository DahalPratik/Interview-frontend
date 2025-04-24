"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthFormProps } from "../types";
import { useAuth } from "../context/AuthContext";

// API URLs based on your Django backend
const API_URL = "http://127.0.0.1:8000/api";
const LOGIN_URL = `${API_URL}/token/`;
const SIGNUP_URL = `${API_URL}/auth/registration/`;

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const { login, user, isAuthenticated } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // If user is already authenticated, show user info and option to go to dashboard
  if (isAuthenticated && user) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          You're Logged In
        </h2>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {user.name[0]}
            </div>
          </div>
          
          <h3 className="font-medium text-lg text-center">{user.name}</h3>
          <p className="text-gray-600 text-center">{user.email}</p>
          
          <div className="mt-4 border-t pt-4">
            <p className="text-center mb-4">
              You're already logged in to your account.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simple validation
      if (!email || !password) {
        setError("Email and password are required");
        setLoading(false);
        return;
      }

      if (type === "signup") {
        if (!name) {
          setError("Full name is required");
          setLoading(false);
          return;
        }
        if (password !== password2) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }
      }

      // Use different API endpoints for login and signup
      const apiUrl = type === "login" ? LOGIN_URL : SIGNUP_URL;

      // Prepare request body based on operation type
      const requestBody = type === "login" 
        ? { username: email, password } 
        : { 
            email, 
            username: username || email.split('@')[0], // Default username from email if not provided
            password1: password,
            password2: password,
            name: name
          };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle API error response
        let errorMessage = "Authentication failed. Please check your credentials.";
        
        // Check for Django API format {"detail": "something wrong"}
        if (data.detail) {
          errorMessage = data.detail;
        } 
        // Check for field-specific errors
        else if (data.non_field_errors && data.non_field_errors.length > 0) {
          errorMessage = data.non_field_errors[0];
        }
        // Check for field-specific errors like {"email": ["This email is already taken"]}
        else {
          const fieldErrors = Object.entries(data).map(([field, errors]) => {
            if (Array.isArray(errors) && errors.length > 0) {
              return `${field}: ${errors[0]}`;
            }
            return null;
          }).filter(Boolean);
          
          if (fieldErrors.length > 0) {
            errorMessage = fieldErrors.join(', ');
          }
        }
        
        throw new Error(errorMessage);
      }

      // Handle successful authentication
      if (type === "login") {
        // Use the login function from context instead of directly setting localStorage
        await login(data.access, data.refresh);
      } else {
        // For signup, redirect to login page
        router.push("/auth/login?signup=success");
        return;
      }

      // Redirect to dashboard after successful authentication
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === "login" ? "Log In to Your Account" : "Create an Account"}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {type === "signup" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder="Enter your full name"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="you@example.com"
          />
        </div>

        {type === "signup" && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username (Optional)
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              placeholder="Choose a username (or we'll use your email)"
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder={
              type === "signup" ? "Create a password" : "Enter your password"
            }
          />
        </div>

        {type === "signup" && (
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password2">
              Confirm Password
            </label>
            <input
              id="password2"
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password2}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword2(e.target.value)
              }
              placeholder="Confirm your password"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded-lg font-medium ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Please wait..." : type === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>

      <div className="mt-6 text-center">
        {type === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
