
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Heart, 
  MessageSquare, 
  ChevronUp,
  Bookmark,
  Filter
} from "lucide-react";

// Mock data for discussions
const discussions = [
  {
    id: 1,
    title: "How to approach research on quantum computing algorithms?",
    category: "Computer Science",
    author: {
      name: "Alex Johnson",
      avatar: "",
      role: "student",
      institution: "MIT"
    },
    date: "2 days ago",
    content: "I'm starting a research project on quantum computing algorithms and looking for guidance on the best approach. Has anyone worked on similar topics? What are the key resources I should look into?",
    votes: 24,
    replies: 8,
    liked: false,
    bookmarked: false
  },
  {
    id: 2,
    title: "Recommended textbooks for advanced organic chemistry?",
    category: "Chemistry",
    author: {
      name: "Emily Chen",
      avatar: "",
      role: "faculty",
      institution: "Stanford University"
    },
    date: "1 week ago",
    content: "I'm preparing a course on advanced organic chemistry and looking for contemporary textbooks that cover recent developments in the field. Any recommendations from fellow professors?",
    votes: 18,
    replies: 15,
    liked: true,
    bookmarked: true
  },
  {
    id: 3,
    title: "Accessing historical archives for 19th century literature research",
    category: "Literature",
    author: {
      name: "Michael Roberts",
      avatar: "",
      role: "student",
      institution: "Oxford University"
    },
    date: "3 days ago",
    content: "I'm working on a dissertation about Victorian literature and need access to some rare manuscripts. Does anyone know how to access the digital archives of British libraries for this period?",
    votes: 12,
    replies: 6,
    liked: false,
    bookmarked: false
  },
  {
    id: 4,
    title: "Statistical methods for small sample sizes in medical research",
    category: "Medicine",
    author: {
      name: "Dr. Sarah Williams",
      avatar: "",
      role: "faculty",
      institution: "Johns Hopkins University"
    },
    date: "5 days ago",
    content: "I'm conducting research with limited patient data. What statistical approaches would you recommend for meaningful analysis with small sample sizes?",
    votes: 32,
    replies: 21,
    liked: false,
    bookmarked: true
  },
  {
    id: 5,
    title: "Resources for learning about sustainable engineering practices",
    category: "Engineering",
    author: {
      name: "David Kim",
      avatar: "",
      role: "student",
      institution: "ETH Zurich"
    },
    date: "1 day ago",
    content: "I'm interested in learning more about sustainable engineering practices. Are there any comprehensive resources or courses available that cover this topic in depth?",
    votes: 15,
    replies: 7,
    liked: true,
    bookmarked: false
  },
  {
    id: 6,
    title: "Collaboration opportunity: Climate change impact on marine ecosystems",
    category: "Environmental Science",
    author: {
      name: "Prof. James Patterson",
      avatar: "",
      role: "faculty",
      institution: "University of California"
    },
    date: "4 days ago",
    content: "I'm leading a research project on the impacts of climate change on marine ecosystems and looking for collaborators with expertise in oceanography and marine biology. Please reach out if interested.",
    votes: 29,
    replies: 14,
    liked: false,
    bookmarked: false
  },
];

export default function Discussions() {
  const { isSignedIn, user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("popular");
  const [localDiscussions, setLocalDiscussions] = useState([...discussions]);

  useEffect(() => {
    document.title = "Discussions | EduCentral";
  }, []);

  // Filter discussions based on search and category
  const filteredDiscussions = localDiscussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || discussion.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sort discussions based on active tab
  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (activeTab === "popular") return b.votes - a.votes;
    if (activeTab === "recent") {
      // This is a simplified sort for the mock data
      // In a real app, you'd sort by actual date objects
      return a.date.includes("day") ? -1 : 1;
    }
    return 0;
  });

  // Get unique categories
  const categories = ["all", ...new Set(discussions.map(d => d.category))];

  // Handle voting
  const handleVote = (id: number) => {
    setLocalDiscussions(prev => 
      prev.map(discussion => 
        discussion.id === id 
          ? { ...discussion, votes: discussion.votes + 1 } 
          : discussion
      )
    );
  };

  // Handle like
  const handleLike = (id: number) => {
    setLocalDiscussions(prev => 
      prev.map(discussion => 
        discussion.id === id 
          ? { ...discussion, liked: !discussion.liked } 
          : discussion
      )
    );
  };

  // Handle bookmark
  const handleBookmark = (id: number) => {
    setLocalDiscussions(prev => 
      prev.map(discussion => 
        discussion.id === id 
          ? { ...discussion, bookmarked: !discussion.bookmarked } 
          : discussion
      )
    );
  };

  return (
    <Layout>
      <section className="py-8 bg-gradient-to-b from-eduBlue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Academic Discussions</h1>
            <p className="text-lg text-gray-600">
              Join the conversation with students, researchers, and faculty from around the world.
            </p>
          </div>

          {/* Search and filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button className="bg-eduBlue-500 hover:bg-eduBlue-600 shrink-0">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Discussion
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar with categories */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="font-semibold text-lg mb-4">Categories</h2>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category}>
                      <button
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          categoryFilter === category
                            ? "bg-eduBlue-50 text-eduBlue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setCategoryFilter(category)}
                      >
                        {category === "all" ? "All Categories" : category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main content with discussions */}
            <div className="lg:col-span-3">
              <Tabs 
                defaultValue="popular" 
                value={activeTab} 
                onValueChange={setActiveTab}
              >
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                    {isSignedIn && (
                      <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
                    )}
                  </TabsList>

                  <div className="lg:hidden">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("categories")}>
                      <Filter className="h-4 w-4 mr-1" />
                      Categories
                    </Button>
                  </div>
                </div>

                <TabsContent value="categories" className="lg:hidden mb-4">
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-0">
                      <div className="flex flex-wrap gap-2 my-2">
                        {categories.map(category => (
                          <Button
                            key={category}
                            variant={categoryFilter === category ? "default" : "outline"}
                            size="sm"
                            className={categoryFilter === category ? "bg-eduBlue-500 hover:bg-eduBlue-600" : ""}
                            onClick={() => setCategoryFilter(category)}
                          >
                            {category === "all" ? "All" : category}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="popular" className="m-0">
                  <DiscussionList 
                    discussions={sortedDiscussions} 
                    onVote={handleVote}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                  />
                </TabsContent>
                
                <TabsContent value="recent" className="m-0">
                  <DiscussionList 
                    discussions={sortedDiscussions}
                    onVote={handleVote}
                    onLike={handleLike}
                    onBookmark={handleBookmark}
                  />
                </TabsContent>
                
                {isSignedIn && (
                  <TabsContent value="bookmarked" className="m-0">
                    <DiscussionList 
                      discussions={sortedDiscussions.filter(d => d.bookmarked)}
                      onVote={handleVote}
                      onLike={handleLike}
                      onBookmark={handleBookmark}
                    />
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

interface DiscussionListProps {
  discussions: typeof discussions;
  onVote: (id: number) => void;
  onLike: (id: number) => void;
  onBookmark: (id: number) => void;
}

function DiscussionList({ discussions, onVote, onLike, onBookmark }: DiscussionListProps) {
  if (discussions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No discussions found</h3>
        <p className="text-gray-500">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {discussions.map((discussion) => (
        <Card key={discussion.id} className="overflow-hidden card-hover">
          <CardHeader className="p-4">
            <div className="flex">
              <div className="mr-3 flex flex-col items-center">
                <button 
                  className="p-1 rounded hover:bg-gray-100 text-gray-500"
                  onClick={() => onVote(discussion.id)}
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
                <span className="text-sm font-medium">{discussion.votes}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="edu-badge edu-badge-blue">
                    {discussion.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {discussion.date}
                  </span>
                </div>
                <CardTitle className="text-lg mb-1">
                  {discussion.title}
                </CardTitle>
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={discussion.author.avatar} />
                    <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600 mr-2">
                    {discussion.author.name}
                  </span>
                  <span className="edu-badge edu-badge-purple text-xs">
                    {discussion.author.role}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 py-2">
            <p className="text-gray-700 text-sm line-clamp-3">
              {discussion.content}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between bg-gray-50 px-4 py-2">
            <div className="flex space-x-4">
              <button 
                className={`flex items-center gap-1 text-sm ${
                  discussion.liked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => onLike(discussion.id)}
              >
                <Heart className={`h-4 w-4 ${discussion.liked ? 'fill-red-500' : ''}`} />
                Like
              </button>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                <MessageSquare className="h-4 w-4" />
                Reply ({discussion.replies})
              </button>
            </div>
            <button 
              className={`flex items-center gap-1 text-sm ${
                discussion.bookmarked ? 'text-eduBlue-500' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => onBookmark(discussion.id)}
            >
              <Bookmark className={`h-4 w-4 ${discussion.bookmarked ? 'fill-eduBlue-500' : ''}`} />
              {discussion.bookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
