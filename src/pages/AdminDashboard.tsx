
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  UsersRound, 
  BookOpen, 
  BarChart3, 
  FileText, 
  Bell, 
  CheckCircle, 
  XCircle,
  Download,
  Upload,
  Database,
  Users,
  Settings,
  BookMarked
} from "lucide-react";

// Mock data
const pendingRequests = [
  {
    id: 1,
    title: "Access to IEEE Quantum Computing Papers",
    requester: {
      name: "Michael Chen",
      avatar: "",
      department: "Computer Science"
    },
    date: "2023-04-02",
    status: "pending"
  },
  {
    id: 2,
    title: "Request for 'Advanced Materials Science' textbook",
    requester: {
      name: "Emily Johnson",
      avatar: "",
      department: "Engineering"
    },
    date: "2023-04-01",
    status: "pending"
  },
  {
    id: 3,
    title: "Access to Historical Archives (1950-1970)",
    requester: {
      name: "James Wilson",
      avatar: "",
      department: "History"
    },
    date: "2023-03-30",
    status: "pending"
  }
];

const recentUploads = [
  {
    id: 1,
    title: "Quantum Computing: Latest Developments",
    uploader: "Dr. Sarah Johnson",
    date: "2023-04-03",
    downloads: 45,
    type: "research"
  },
  {
    id: 2,
    title: "Introduction to Neural Networks",
    uploader: "Prof. David Lee",
    date: "2023-04-02",
    downloads: 78,
    type: "course"
  },
  {
    id: 3,
    title: "Modern Approaches to Literary Criticism",
    uploader: "Dr. Emily Patterson",
    date: "2023-04-01",
    downloads: 32,
    type: "book"
  }
];

const userStats = {
  total: 1250,
  active: 876,
  new: 58,
  faculty: 124,
  student: 1056,
  admin: 20,
  researcher: 50
};

const resourceStats = {
  total: 3782,
  research: 1245,
  books: 985,
  courses: 1552,
  downloads: 28645,
  requests: 142
};

export default function AdminDashboard() {
  const { isSignedIn, user } = useUser();
  const userRole = user?.publicMetadata?.role as string || "student";
  
  useEffect(() => {
    document.title = "Admin Dashboard | EduCentral";
  }, []);
  
  // Redirect if not admin
  if (!isSignedIn || userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Manage resources, users, and platform settings
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
              <Button className="bg-eduBlue-500 hover:bg-eduBlue-600 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                System Settings
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Users
                </CardTitle>
                <UsersRound className="h-4 w-4 text-eduBlue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  +{userStats.new} new this month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Resources
                </CardTitle>
                <BookOpen className="h-4 w-4 text-eduPurple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resourceStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  {resourceStats.research} research papers, {resourceStats.books} books
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Total Downloads
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-eduBlue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resourceStats.downloads}</div>
                <p className="text-xs text-muted-foreground">
                  ~945 downloads this week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Pending Requests
                </CardTitle>
                <Bell className="h-4 w-4 text-eduPurple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{resourceStats.requests}</div>
                <p className="text-xs text-muted-foreground">
                  {pendingRequests.length} need immediate review
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <Tabs defaultValue="requests" className="space-y-6">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="requests">Resource Requests</TabsTrigger>
              <TabsTrigger value="uploads">Recent Uploads</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="settings">Platform Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="requests" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Resource Requests</CardTitle>
                  <CardDescription>
                    Review and approve pending requests for academic resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingRequests.map(request => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={request.requester.avatar} />
                            <AvatarFallback>{request.requester.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{request.title}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>By {request.requester.name}</span>
                              <span className="mx-2">•</span>
                              <span>{request.requester.department}</span>
                              <span className="mx-2">•</span>
                              <span>{request.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="gap-1 text-red-500 border-red-200 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4" />
                            Decline
                          </Button>
                          <Button 
                            size="sm" 
                            className="gap-1 bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="uploads" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Uploads</CardTitle>
                  <CardDescription>
                    Monitor recently uploaded academic resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUploads.map(upload => (
                      <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {upload.type === "research" ? (
                              <FileText className="h-6 w-6 text-eduBlue-500" />
                            ) : upload.type === "book" ? (
                              <BookMarked className="h-6 w-6 text-eduPurple-500" />
                            ) : (
                              <BookOpen className="h-6 w-6 text-green-500" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{upload.title}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>By {upload.uploader}</span>
                              <span className="mx-2">•</span>
                              <span>{upload.date}</span>
                              <span className="mx-2">•</span>
                              <span>{upload.downloads} downloads</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="gap-1"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="gap-1 text-red-500 border-red-200 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 flex justify-center">
                      <Button className="bg-eduBlue-500 hover:bg-eduBlue-600 gap-2">
                        <Upload className="h-4 w-4" />
                        Upload New Resource
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    View and manage user accounts and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-eduBlue-100 rounded-full">
                          <Users className="h-5 w-5 text-eduBlue-600" />
                        </div>
                        <h3 className="font-medium">User Types</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Students:</span>
                          <span className="font-medium">{userStats.student}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Faculty:</span>
                          <span className="font-medium">{userStats.faculty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Admins:</span>
                          <span className="font-medium">{userStats.admin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Researchers:</span>
                          <span className="font-medium">{userStats.researcher}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-eduPurple-100 rounded-full">
                          <Database className="h-5 w-5 text-eduPurple-600" />
                        </div>
                        <h3 className="font-medium">User Activity</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Users:</span>
                          <span className="font-medium">{userStats.total}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Active Users:</span>
                          <span className="font-medium">{userStats.active}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">New Users:</span>
                          <span className="font-medium">{userStats.new}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Active Today:</span>
                          <span className="font-medium">157</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 rounded-full">
                          <Settings className="h-5 w-5 text-green-600" />
                        </div>
                        <h3 className="font-medium">User Actions</h3>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline" className="justify-start">
                          Manage Roles & Permissions
                        </Button>
                        <Button size="sm" variant="outline" className="justify-start">
                          Reset User Passwords
                        </Button>
                        <Button size="sm" variant="outline" className="justify-start">
                          Export User Data
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">User management functionality is integrated with Clerk Authentication</p>
                    <Button className="bg-eduBlue-500 hover:bg-eduBlue-600">
                      Manage Users in Clerk Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>
                    Configure system-wide settings and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">
                      Platform settings configuration will be implemented in future updates
                    </p>
                    <Button className="bg-eduBlue-500 hover:bg-eduBlue-600">
                      Configure Platform Settings
                    </Button>
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
