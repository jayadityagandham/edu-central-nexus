
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Upload,
  BookOpen,
  MessageCircle,
  FileText,
  BookMarked,
  Users,
  BarChart3,
  PlusCircle,
  Edit,
  Link as LinkIcon
} from "lucide-react";

// Mock data for faculty publications
const publications = [
  {
    id: 1,
    title: "Machine Learning Applications in Climate Science",
    type: "research",
    journal: "Journal of Environmental Data Science",
    year: 2023,
    coAuthors: ["Dr. James Wilson", "Dr. Sarah Chen"],
    downloadCount: 156,
    citationCount: 12,
    abstract: "This paper explores novel machine learning approaches for analyzing climate data and predicting environmental changes with improved accuracy."
  },
  {
    id: 2,
    title: "Quantum Computing: Theory and Applications",
    type: "book",
    publisher: "Academic Press",
    year: 2022,
    coAuthors: ["Dr. Michael Lee"],
    downloadCount: 324,
    citationCount: 45,
    abstract: "A comprehensive textbook covering the fundamentals of quantum computing, algorithm design, and practical applications in various fields."
  },
  {
    id: 3,
    title: "Advanced Neural Networks for Computer Vision",
    type: "course",
    institution: "Stanford University",
    year: 2023,
    coAuthors: [],
    downloadCount: 789,
    citationCount: 0,
    abstract: "Complete course materials for advanced neural networks focused on computer vision applications, including slides, assignments, and practical exercises."
  },
  {
    id: 4,
    title: "Ethical Implications of Artificial Intelligence in Healthcare",
    type: "research",
    journal: "Journal of Medical Ethics and Technology",
    year: 2023,
    coAuthors: ["Dr. Emily Johnson", "Dr. Robert Chen", "Dr. Lisa Wang"],
    downloadCount: 204,
    citationCount: 8,
    abstract: "This research examines the ethical challenges and considerations in developing and deploying AI systems in healthcare settings."
  }
];

// Mock data for faculty student interactions
const studentInteractions = [
  {
    id: 1,
    student: {
      name: "Alex Johnson",
      avatar: "",
      department: "Computer Science"
    },
    type: "message",
    content: "Question about the latest assignment on neural networks",
    date: "2 hours ago",
    status: "unread"
  },
  {
    id: 2,
    student: {
      name: "Maria Garcia",
      avatar: "",
      department: "Data Science"
    },
    type: "request",
    content: "Request for recommendation letter for PhD application",
    date: "1 day ago",
    status: "pending"
  },
  {
    id: 3,
    student: {
      name: "David Kim",
      avatar: "",
      department: "AI & Machine Learning"
    },
    type: "submission",
    content: "Research proposal submission: 'Reinforcement Learning in Autonomous Systems'",
    date: "3 days ago",
    status: "reviewed"
  }
];

// Faculty stats
const facultyStats = {
  publications: 16,
  courses: 5,
  citations: 342,
  downloads: 2876,
  students: 128
};

export default function FacultyPortal() {
  const { isSignedIn, user } = useUser();
  const userRole = user?.publicMetadata?.role as string || "student";
  
  useEffect(() => {
    document.title = "Faculty Portal | EduCentral";
  }, []);
  
  // Redirect if not faculty
  if (!isSignedIn || userRole !== "faculty") {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Faculty Portal</h1>
              <p className="text-gray-600 mt-1">
                Manage your publications, courses, and student interactions
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button className="bg-eduBlue-500 hover:bg-eduBlue-600 flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload New Publication
              </Button>
            </div>
          </div>

          {/* Faculty Profile */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>{user?.firstName?.charAt(0) || "F"}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {user?.fullName || "Faculty Member"}
                      </h2>
                      <p className="text-gray-600">Professor of Computer Science</p>
                      <p className="text-sm text-gray-500 mt-1">Stanford University</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-eduBlue-500" />
                      <span>
                        <strong>{facultyStats.publications}</strong> Publications
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-eduPurple-500" />
                      <span>
                        <strong>{facultyStats.courses}</strong> Courses
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-5 w-5 text-eduBlue-500" />
                      <span>
                        <strong>{facultyStats.citations}</strong> Citations
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-eduPurple-500" />
                      <span>
                        <strong>{facultyStats.downloads}</strong> Downloads
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-eduBlue-500" />
                      <span>
                        <strong>{facultyStats.students}</strong> Students
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-700">
                      Expert in artificial intelligence, machine learning, and computer vision with a focus on developing algorithms for environmental science applications.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main content */}
          <Tabs defaultValue="publications" className="space-y-6">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="students">Student Interactions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="publications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>My Publications</CardTitle>
                  <CardDescription>
                    Manage your research papers, books, and academic content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {publications.map(publication => (
                      <div key={publication.id} className="border rounded-lg bg-white overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-lg border">
                              {publication.type === "research" ? (
                                <FileText className="h-5 w-5 text-eduBlue-500" />
                              ) : publication.type === "book" ? (
                                <BookMarked className="h-5 w-5 text-eduPurple-500" />
                              ) : (
                                <BookOpen className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">{publication.title}</h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <span>
                                  {publication.type === "research" 
                                    ? publication.journal 
                                    : publication.type === "book" 
                                      ? publication.publisher 
                                      : publication.institution}
                                </span>
                                <span className="mx-2">•</span>
                                <span>{publication.year}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-eduBlue-500 hover:bg-eduBlue-600"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-700 mb-3">
                            {publication.abstract}
                          </p>
                          {publication.coAuthors.length > 0 && (
                            <div className="mb-3">
                              <span className="text-sm font-medium">Co-authors: </span>
                              <span className="text-sm text-gray-600">
                                {publication.coAuthors.join(", ")}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <BarChart3 className="h-4 w-4 text-gray-500" />
                                <span>{publication.downloadCount} downloads</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <LinkIcon className="h-4 w-4 text-gray-500" />
                                <span>{publication.citationCount} citations</span>
                              </div>
                            </div>
                            <div>
                              <span className="edu-badge edu-badge-purple">
                                {publication.type === "research" 
                                  ? "Research Paper" 
                                  : publication.type === "book" 
                                    ? "Book" 
                                    : "Course Material"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-6 flex justify-center">
                      <Button className="gap-2 bg-eduBlue-500 hover:bg-eduBlue-600">
                        <PlusCircle className="h-4 w-4" />
                        Add New Publication
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>My Courses</CardTitle>
                  <CardDescription>
                    Manage your courses and educational materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Course Management Coming Soon</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      The course management feature is currently under development. You'll soon be able to create and manage courses, materials, and assignments.
                    </p>
                    <Button className="bg-eduBlue-500 hover:bg-eduBlue-600">
                      Request Early Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="students" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Student Interactions</CardTitle>
                  <CardDescription>
                    Manage communications and requests from students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentInteractions.map(interaction => (
                      <div key={interaction.id} className="border rounded-lg bg-white overflow-hidden">
                        <div className={`p-4 ${
                          interaction.status === "unread" ? "border-l-4 border-l-eduBlue-500" : ""
                        }`}>
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={interaction.student.avatar} />
                              <AvatarFallback>{interaction.student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{interaction.student.name}</h3>
                                <span className="text-xs text-gray-500">{interaction.date}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{interaction.student.department}</p>
                              <p className={`text-sm ${
                                interaction.status === "unread" ? "font-medium" : ""
                              }`}>
                                {interaction.content}
                              </p>
                              <div className="mt-3 flex justify-between items-center">
                                <div>
                                  {interaction.type === "message" ? (
                                    <span className="edu-badge edu-badge-blue">Message</span>
                                  ) : interaction.type === "request" ? (
                                    <span className="edu-badge edu-badge-purple">Request</span>
                                  ) : (
                                    <span className="edu-badge bg-green-100 text-green-800">Submission</span>
                                  )}
                                  {interaction.status === "unread" && (
                                    <span className="ml-2 edu-badge bg-eduBlue-100 text-eduBlue-800">Unread</span>
                                  )}
                                  {interaction.status === "pending" && (
                                    <span className="ml-2 edu-badge bg-yellow-100 text-yellow-800">Pending</span>
                                  )}
                                </div>
                                <div>
                                  {interaction.type === "message" ? (
                                    <Button size="sm" className="gap-1 bg-eduBlue-500 hover:bg-eduBlue-600">
                                      <MessageCircle className="h-4 w-4" />
                                      Reply
                                    </Button>
                                  ) : interaction.type === "request" ? (
                                    <div className="flex gap-2">
                                      <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                                        Decline
                                      </Button>
                                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                        Approve
                                      </Button>
                                    </div>
                                  ) : (
                                    <Button size="sm" className="bg-eduPurple-500 hover:bg-eduPurple-600">
                                      Review
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
