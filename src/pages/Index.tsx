
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Search, Users, MessageCircle, Calendar, Lock } from "lucide-react";

export default function Index() {
  const { isSignedIn, user } = useUser();
  const userRole = user?.publicMetadata?.role as string || "student";

  useEffect(() => {
    document.title = "EduCentral - Academic Resource Hub";
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-eduBlue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-eduBlue-900 mb-6">
              Breaking Barriers to Academic Resources
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              EduCentral provides unified access to research papers, books, and academic resources 
              for students and researchers around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isSignedIn ? (
                <>
                  <Button asChild size="lg" className="bg-eduBlue-500 hover:bg-eduBlue-600">
                    <Link to="/sign-up">Get Started</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/resources">Browse Resources</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-eduBlue-500 hover:bg-eduBlue-600">
                    <Link to="/resources">Browse Resources</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/discussions">Join Discussions</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EduCentral?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a comprehensive suite of tools designed specifically for the academic community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover border-t-4 border-t-eduBlue-500">
              <CardContent className="pt-6">
                <div className="mb-4 bg-eduBlue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-eduBlue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Organized Repository</h3>
                <p className="text-gray-600">
                  Access a centralized platform for research papers, books, and course materials.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-t-4 border-t-eduPurple-500">
              <CardContent className="pt-6">
                <div className="mb-4 bg-eduPurple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Search className="h-6 w-6 text-eduPurple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Search</h3>
                <p className="text-gray-600">
                  Find exactly what you need with advanced filters by topic, author, or publication year.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-t-4 border-t-eduBlue-500">
              <CardContent className="pt-6">
                <div className="mb-4 bg-eduBlue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Lock className="h-6 w-6 text-eduBlue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Access Control</h3>
                <p className="text-gray-600">
                  Role-based permissions ensure the right content reaches the right users.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-t-4 border-t-eduPurple-500">
              <CardContent className="pt-6">
                <div className="mb-4 bg-eduPurple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Users className="h-6 w-6 text-eduPurple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Resource Requests</h3>
                <p className="text-gray-600">
                  Request materials you need; universities can review and upload them.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-t-4 border-t-eduBlue-500">
              <CardContent className="pt-6">
                <div className="mb-4 bg-eduBlue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-eduBlue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Discussion Forums</h3>
                <p className="text-gray-600">
                  Collaborate with peers in subject-specific Q&A forums.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-hover border-t-4 border-t-eduPurple-500">
              <CardContent className="pt-6">
                <div className="mb-4 bg-eduPurple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-eduPurple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Book Borrowing</h3>
                <p className="text-gray-600">
                  Reserve physical books with our slot-based borrowing system and return reminders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Role-based CTA */}
      {isSignedIn && (
        <section className="py-16 bg-eduBlue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {userRole === "admin" 
                    ? "Manage Your Academic Resources" 
                    : userRole === "faculty" 
                      ? "Share Your Research & Materials" 
                      : "Continue Your Academic Journey"}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {userRole === "admin" 
                    ? "Access the admin panel to manage users, resources and monitor platform activity." 
                    : userRole === "faculty" 
                      ? "Upload your papers, course materials and connect with students and researchers." 
                      : "Discover resources, participate in discussions, and request materials you need."}
                </p>
                <Button asChild className="bg-eduBlue-500 hover:bg-eduBlue-600">
                  <Link to={
                    userRole === "admin" 
                      ? "/admin" 
                      : userRole === "faculty" 
                        ? "/faculty" 
                        : "/resources"
                  }>
                    {userRole === "admin" 
                      ? "Go to Admin Panel" 
                      : userRole === "faculty" 
                        ? "Access Faculty Portal" 
                        : "Explore Resources"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
