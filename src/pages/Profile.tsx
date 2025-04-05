
import { useEffect } from "react";
import { UserProfile } from "@clerk/clerk-react";
import { Layout } from "@/components/layout/Layout";

export default function Profile() {
  useEffect(() => {
    document.title = "Profile | EduCentral";
  }, []);

  return (
    <Layout>
      <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-10">Your Profile</h1>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none border-0",
                navbar: "hidden",
                pageScrollBox: "p-0",
                formButtonPrimary: 
                  "bg-eduBlue-500 hover:bg-eduBlue-600 text-sm normal-case",
              }
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
