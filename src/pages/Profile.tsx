
import { useEffect } from "react";
import { UserProfile } from "@clerk/clerk-react";
import { Layout } from "@/components/layout/Layout";

export default function Profile() {
  useEffect(() => {
    document.title = "Profile | EduCentral";
  }, []);

  return (
    <Layout>
      <div className="py-8 md:py-12 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10">Your Profile</h1>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "w-full mx-auto",
                card: "shadow-none border-0",
                navbar: "hidden",
                pageScrollBox: {
                  base: "p-0 sm:p-2 md:p-4",
                  xs: "p-0",
                  sm: "p-2",
                  md: "p-4"
                },
                formButtonPrimary: 
                  "bg-eduBlue-500 hover:bg-eduBlue-600 text-sm normal-case",
                // Make the form elements responsive
                formFieldRow: "flex flex-col sm:flex-row gap-2 sm:gap-4",
                formFieldInput: "w-full text-sm py-2",
                formFieldLabel: "text-sm font-medium mb-1",
                profileSectionTitle: "text-base md:text-lg font-semibold",
                profilePage: "p-2 sm:p-4 md:p-6",
                // Fix avatar size on small screens
                userProfileAvatarBox: "flex justify-center items-center",
                userProfileAvatarImage: "w-20 h-20 md:w-24 md:h-24 object-cover",
                // Responsive buttons
                userButtonBox: "w-full sm:w-auto",
                formFieldAction: "text-xs sm:text-sm",
                // Better spacing for phone and email sections
                phoneNumberPrimary: "text-xs sm:text-sm",
                emailAddressPrimary: "text-xs sm:text-sm"
              }
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
