import Link from "next/link";
import "./globals.css";
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="max-w-4xl text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">
          Practice Your USA Visa Interview with AI
        </h1>
        <p className="text-xl mb-8">
          Prepare for your student visa interview with our AI-powered practice
          platform. Get realistic interview simulations, feedback, and improve
          your confidence.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started Free
          </Link>
          <Link
            href="/auth/login"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
          >
            Login
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-4">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="font-bold mb-2">Create an Account</h3>
            <p>
              Sign up with your email to access the interview practice platform.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="font-bold mb-2">Practice Interviews</h3>
            <p>
              Engage with our AI interviewer in realistic visa interview
              scenarios.
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="font-bold mb-2">Get Feedback</h3>
            <p>
              Receive detailed feedback and tips to improve your interview
              performance.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mb-12 bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Features</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          <li className="flex items-start gap-2">
            <div className="text-green-600 font-bold">✓</div>
            <div>Realistic F-1 student visa interview questions</div>
          </li>
          <li className="flex items-start gap-2">
            <div className="text-green-600 font-bold">✓</div>
            <div>AI-powered conversation practice</div>
          </li>
          <li className="flex items-start gap-2">
            <div className="text-green-600 font-bold">✓</div>
            <div>Detailed performance feedback</div>
          </li>
          <li className="flex items-start gap-2">
            <div className="text-green-600 font-bold">✓</div>
            <div>Practice anytime, anywhere</div>
          </li>
          <li className="flex items-start gap-2">
            <div className="text-green-600 font-bold">✓</div>
            <div>Common pitfall warnings</div>
          </li>
          <li className="flex items-start gap-2">
            <div className="text-green-600 font-bold">✓</div>
            <div>Tips from successful applicants</div>
          </li>
        </ul>
      </section>
    </div>
  );
}
