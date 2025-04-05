
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, BookMarked, Download, ExternalLink, Star } from "lucide-react";

// Mock data for resources
const resources = [
  {
    id: 1,
    title: "Introduction to Machine Learning Algorithms",
    type: "research",
    category: "Computer Science",
    author: "Dr. Sarah Johnson",
    year: 2023,
    institution: "MIT",
    description: "A comprehensive overview of modern machine learning approaches and their applications.",
    downloadCount: 1245,
    rating: 4.8
  },
  {
    id: 2,
    title: "Principles of Quantum Mechanics",
    type: "book",
    category: "Physics",
    author: "Prof. Robert Chen",
    year: 2021,
    institution: "Stanford University",
    description: "An in-depth textbook covering the fundamentals of quantum mechanics for advanced undergraduates.",
    downloadCount: 892,
    rating: 4.9
  },
  {
    id: 3,
    title: "Contemporary Literary Theory",
    type: "course",
    category: "Literature",
    author: "Dr. Emily Patterson",
    year: 2022,
    institution: "Oxford University",
    description: "Course materials for understanding modern approaches to literary analysis and criticism.",
    downloadCount: 753,
    rating: 4.6
  },
  {
    id: 4,
    title: "Sustainable Development in Urban Planning",
    type: "research",
    category: "Environmental Science",
    author: "Dr. Michael Torres",
    year: 2023,
    institution: "University of California",
    description: "Research on integrating sustainable practices into urban development and planning.",
    downloadCount: 567,
    rating: 4.7
  },
  {
    id: 5,
    title: "Advanced Calculus for Engineers",
    type: "book",
    category: "Mathematics",
    author: "Prof. Lisa Zhang",
    year: 2020,
    institution: "Caltech",
    description: "A comprehensive guide to advanced calculus techniques with engineering applications.",
    downloadCount: 1087,
    rating: 4.5
  },
  {
    id: 6,
    title: "Introduction to Molecular Biology",
    type: "course",
    category: "Biology",
    author: "Dr. James Wilson",
    year: 2022,
    institution: "Harvard University",
    description: "Course materials covering the fundamentals of molecular biology for undergraduate students.",
    downloadCount: 628,
    rating: 4.7
  },
];

// Resource type icons
const resourceIcons = {
  research: <FileText className="h-6 w-6" />,
  book: <BookMarked className="h-6 w-6" />,
  course: <BookOpen className="h-6 w-6" />,
};

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    document.title = "Resources | EduCentral";
  }, []);

  // Filter resources based on search, category, year, and tab
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "" || resource.category === categoryFilter;
    const matchesYear = yearFilter === "" || resource.year.toString() === yearFilter;
    const matchesTab = activeTab === "all" || resource.type === activeTab;
    
    return matchesSearch && matchesCategory && matchesYear && matchesTab;
  });

  // Get unique categories for filter dropdown
  const categories = [...new Set(resources.map(r => r.category))];
  
  // Get unique years for filter dropdown
  const years = [...new Set(resources.map(r => r.year))].sort((a, b) => b - a);

  return (
    <Layout>
      <section className="py-8 bg-gradient-to-b from-eduBlue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Academic Resources</h1>
            <p className="text-lg text-gray-600">
              Explore our collection of research papers, books, and course materials from leading institutions.
            </p>
          </div>

          {/* Search and filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-3">
                <div className="relative">
                  <Input
                    placeholder="Search by title, author, or keywords..."
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
              </div>
              
              <div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Years</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("");
                    setYearFilter("");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs for resource types */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="research">Research Papers</TabsTrigger>
              <TabsTrigger value="book">Books</TabsTrigger>
              <TabsTrigger value="course">Course Materials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="m-0">
              <ResourceList resources={filteredResources} />
            </TabsContent>
            <TabsContent value="research" className="m-0">
              <ResourceList resources={filteredResources} />
            </TabsContent>
            <TabsContent value="book" className="m-0">
              <ResourceList resources={filteredResources} />
            </TabsContent>
            <TabsContent value="course" className="m-0">
              <ResourceList resources={filteredResources} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}

function ResourceList({ resources }: { resources: typeof resources }) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No resources found</h3>
        <p className="text-gray-500">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <Card key={resource.id} className="overflow-hidden card-hover">
          <CardHeader className="bg-gray-50 border-b py-4">
            <div className="flex items-start justify-between">
              <div className="bg-white p-2 rounded-full border">
                {resourceIcons[resource.type as keyof typeof resourceIcons]}
              </div>
              <div className="flex space-x-1 items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium">{resource.rating}</span>
              </div>
            </div>
            <CardTitle className="mt-2 line-clamp-2">
              {resource.title}
            </CardTitle>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{resource.author}</span>
              <span>{resource.year}</span>
            </div>
          </CardHeader>
          <CardContent className="py-4">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="edu-badge edu-badge-blue">
                  {resource.category}
                </span>
                <span className="edu-badge edu-badge-purple">
                  {resource.type === "research" ? "Research Paper" : 
                   resource.type === "book" ? "Book" : "Course Material"}
                </span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">
                {resource.description}
              </p>
              <div className="text-xs text-gray-500">
                {resource.institution}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-gray-50 border-t py-3">
            <div className="flex items-center text-xs text-gray-500">
              <Download className="h-4 w-4 mr-1" />
              {resource.downloadCount} downloads
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="h-8">
                <ExternalLink className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button size="sm" className="h-8 bg-eduBlue-500 hover:bg-eduBlue-600">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
