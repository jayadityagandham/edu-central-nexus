
import { useState } from "react";
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Book } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();
  const [signUpComplete, setSignUpComplete] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Book className="h-12 w-12 text-eduBlue-500" />
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your EduCentral account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <ClerkSignUp 
            routing="path" 
            path="/sign-up" 
            signInUrl="/sign-in"
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-eduBlue-500 hover:bg-eduBlue-600 text-sm normal-case",
                footerAction: "text-eduBlue-500 hover:text-eduBlue-600",
                card: "shadow-none",
              },
            }}
            afterSignUpUrl="/"
            onComplete={() => {
              setSignUpComplete(true);
              navigate("/");
            }}
          />
        </div>
      </div>
    </div>
  );
}
