import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Search, 
  Download, 
  FileText, 
  Link as LinkIcon,
  Eye,
  PlusCircle,
  Filter,
  SlidersHorizontal,
  X,
  Book,
  FileType,
  GraduationCap
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ResourceService } from "@/services/ResourceService";

export interface Resource {
  id: number;
  title: string;
  type: string;
  author: string;
  year: number;
  topic: string;
  url: string;
  downloadCount: number;
  citationCount: number;
  description: string;
}

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newResource, setNewResource] = useState<Resource>({
    id: 0,
    title: "",
    type: "book",
    author: "",
    year: new Date().getFullYear(),
    topic: "",
    url: "",
    downloadCount: 0,
    citationCount: 0,
    description: ""
  });
  
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState([2000, new Date().getFullYear()]);
  const [sortBy, setSortBy] = useState("relevance");
  const [citationMin, setCitationMin] = useState(0);
  
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Resources | EduCentral";
    loadResources();
  }, []);

  const loadResources = async () => {
    setIsLoading(true);
    try {
      const loadedResources = await ResourceService.getResources();
      setResources(loadedResources);
    } catch (error) {
      console.error("Error loading resources:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load resources. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleTopicFilter = (topic: string) => {
    setTopicFilter(topic);
  };

  const handleTypeFilter = (type: string) => {
    setTypeFilters(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const resetFilters = () => {
    setTopicFilter("");
    setTypeFilters([]);
    setYearRange([2000, new Date().getFullYear()]);
    setCitationMin(0);
    setSortBy("relevance");
  };

  const filteredResources = resources.filter(resource => {
    const searchMatch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const topicMatch = topicFilter === "" || resource.topic === topicFilter;
    const typeMatch = typeFilters.length === 0 || typeFilters.includes(resource.type);
    const yearMatch = resource.year >= yearRange[0] && resource.year <= yearRange[1];
    const citationMatch = resource.citationCount >= citationMin;
    
    return searchMatch && topicMatch && typeMatch && yearMatch && citationMatch;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch(sortBy) {
      case "newest":
        return b.year - a.year;
      case "oldest":
        return a.year - b.year;
      case "most-cited":
        return b.citationCount - a.citationCount;
      case "most-downloaded":
        return b.downloadCount - a.downloadCount;
      default: // relevance or any other value
        const aRelevance = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 
                          a.author.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
        const bRelevance = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 
                          b.author.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
        return bRelevance - aRelevance;
    }
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewResource(prevResource => ({
      ...prevResource,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewResource(prevResource => ({
      ...prevResource,
      [name]: value
    }));
  };

  const handleAddResource = async () => {
    if (!newResource.title || !newResource.author || !newResource.topic || !newResource.url || !newResource.description) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields."
      });
      return;
    }

    try {
      setIsDialogOpen(false);
      
      toast({
        title: "Saving...",
        description: "Adding your resource to the database."
      });
      
      const addedResource = await ResourceService.addResource({
        ...newResource,
        id: 0,
        downloadCount: 0,
        citationCount: 0
      });
      
      setResources(prevResources => [...prevResources, addedResource]);
      
      setNewResource({
        id: 0,
        title: "",
        type: "book",
        author: "",
        year: new Date().getFullYear(),
        topic: "",
        url: "",
        downloadCount: 0,
        citationCount: 0,
        description: ""
      });
      
      toast({
        title: "Success",
        description: "Resource added successfully."
      });
    } catch (error) {
      console.error("Error adding resource:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add resource. Please try again."
      });
    }
  };

  const topics = [...new Set(resources.map(resource => resource.topic))];
  const resourceTypes = ["book", "research", "course"];
  const typeIcons = {
    book: <Book className="h-4 w-4" />,
    research: <FileType className="h-4 w-4" />,
    course: <GraduationCap className="h-4 w-4" />
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (topicFilter !== "") count++;
    if (typeFilters.length > 0) count++;
    if (yearRange[0] !== 2000 || yearRange[1] !== new Date().getFullYear()) count++;
    if (citationMin > 0) count++;
    if (sortBy !== "relevance") count++;
    return count;
  };

  return (
    <Layout>
      <section className="bg-gradient-to-b from-eduBlue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-eduBlue-900 mb-6">
              Explore Academic Resources
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find research papers, books, and course materials from top universities and researchers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full sm:w-96 pl-12 pr-4 py-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-eduBlue-400"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Resources {filteredResources.length > 0 && <span className="text-gray-500 text-lg">({filteredResources.length})</span>}
            </h2>
            
            <div className="flex items-center gap-3">
              <Popover open={isAdvancedFilterOpen} onOpenChange={setIsAdvancedFilterOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Advanced Filters
                    {getActiveFilterCount() > 0 && (
                      <Badge className="ml-1 bg-eduBlue-500 hover:bg-eduBlue-600">
                        {getActiveFilterCount()}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm">Filters</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={resetFilters}
                        className="h-7 text-xs flex items-center gap-1 text-gray-500"
                      >
                        <X className="h-3 w-3" />
                        Reset All
                      </Button>
                    </div>
                    
                    <Accordion type="multiple" className="w-full">
                      <AccordionItem value="type">
                        <AccordionTrigger className="text-sm py-2">Resource Type</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-2">
                            {resourceTypes.map(type => (
                              <div key={type} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`type-${type}`} 
                                  checked={typeFilters.includes(type)}
                                  onCheckedChange={() => handleTypeFilter(type)}
                                />
                                <Label 
                                  htmlFor={`type-${type}`}
                                  className="flex items-center gap-2 text-sm capitalize cursor-pointer"
                                >
                                  {type === "book" ? typeIcons.book :
                                   type === "research" ? typeIcons.research :
                                   typeIcons.course}
                                  {type}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="topic">
                        <AccordionTrigger className="text-sm py-2">Topic</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              variant={topicFilter === "" ? "default" : "outline"} 
                              size="sm" 
                              className="text-xs h-8 justify-start"
                              onClick={() => handleTopicFilter("")}
                            >
                              All Topics
                            </Button>
                            {topics.map(topic => (
                              <Button
                                key={topic}
                                variant={topicFilter === topic ? "default" : "outline"}
                                size="sm"
                                className="text-xs h-8 justify-start"
                                onClick={() => handleTopicFilter(topic)}
                              >
                                {topic}
                              </Button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="year">
                        <AccordionTrigger className="text-sm py-2">Publication Year</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-500">{yearRange[0]}</span>
                              <span className="text-xs text-gray-500">{yearRange[1]}</span>
                            </div>
                            <Slider
                              value={yearRange}
                              min={2000}
                              max={new Date().getFullYear()}
                              step={1}
                              onValueChange={(value) => setYearRange(value as [number, number])}
                              className="cursor-pointer"
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="citations">
                        <AccordionTrigger className="text-sm py-2">Minimum Citations</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <Slider
                              value={[citationMin]}
                              min={0}
                              max={100}
                              step={5}
                              onValueChange={(value) => setCitationMin(value[0])}
                              className="cursor-pointer"
                            />
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-500">Min: {citationMin}</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sort-by" className="text-sm">Sort Results By</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="most-cited">Most Cited</SelectItem>
                          <SelectItem value="most-downloaded">Most Downloaded</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-2 flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={resetFilters}
                      >
                        Reset
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => setIsAdvancedFilterOpen(false)}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button className="bg-eduBlue-500 hover:bg-eduBlue-600 flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Resource
              </Button>
            </div>
          </div>
          
          {getActiveFilterCount() > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm text-gray-500">Active filters:</span>
              {topicFilter && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Topic: {topicFilter}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setTopicFilter("")}
                  />
                </Badge>
              )}
              {typeFilters.map(type => (
                <Badge key={type} variant="outline" className="flex items-center gap-1">
                  Type: {type}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => handleTypeFilter(type)}
                  />
                </Badge>
              ))}
              {(yearRange[0] !== 2000 || yearRange[1] !== new Date().getFullYear()) && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Year: {yearRange[0]}-{yearRange[1]}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setYearRange([2000, new Date().getFullYear()])}
                  />
                </Badge>
              )}
              {citationMin > 0 && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Min Citations: {citationMin}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setCitationMin(0)}
                  />
                </Badge>
              )}
              {sortBy !== "relevance" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  Sort: {sortBy.replace("-", " ")}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setSortBy("relevance")}
                  />
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="h-7 text-xs flex items-center gap-1 text-gray-500"
              >
                <X className="h-3 w-3" />
                Clear All
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-white">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-8 h-8 border-4 border-eduBlue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading resources...</p>
          </div>
        ) : sortedResources.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
            <Button onClick={resetFilters}>Clear All Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedResources.map(resource => (
              <Card key={resource.id} className="card-hover">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {resource.type === "book" ? (
                        <BookOpen className="h-6 w-6 text-eduBlue-600" />
                      ) : resource.type === "research" ? (
                        <FileText className="h-6 w-6 text-eduPurple-600" />
                      ) : (
                        <GraduationCap className="h-6 w-6 text-green-600" />
                      )}
                      <h3 className="text-lg font-semibold line-clamp-1">{resource.title}</h3>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {resource.type}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{resource.description}</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div>
                      <span className="font-medium">Author:</span> {resource.author}
                    </div>
                    <div>
                      <span className="font-medium">Year:</span> {resource.year}
                    </div>
                    <div>
                      <span className="font-medium">Topic:</span> 
                      <Badge variant="secondary" className="ml-2 bg-gray-100 hover:bg-gray-200 cursor-pointer" onClick={() => handleTopicFilter(resource.topic)}>
                        {resource.topic}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Download className="h-4 w-4" />
                        {resource.downloadCount}
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <LinkIcon className="h-4 w-4" />
                        {resource.citationCount}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          View
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="bg-eduBlue-500 hover:bg-eduBlue-600">
                        <Link to={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-8 bg-eduBlue-500 hover:bg-eduBlue-600 flex items-center justify-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>
                Add a new academic resource to the platform.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={newResource.title} 
                  onChange={handleInputChange} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select 
                  value={newResource.type} 
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="research">Research Paper</SelectItem>
                    <SelectItem value="course">Course Material</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  Author
                </Label>
                <Input 
                  type="text" 
                  id="author" 
                  name="author" 
                  value={newResource.author} 
                  onChange={handleInputChange} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="year" className="text-right">
                  Year
                </Label>
                <Input 
                  type="number" 
                  id="year" 
                  name="year" 
                  value={newResource.year} 
                  onChange={handleInputChange} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topic" className="text-right">
                  Topic
                </Label>
                <Input 
                  type="text" 
                  id="topic" 
                  name="topic" 
                  value={newResource.topic} 
                  onChange={handleInputChange} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  URL
                </Label>
                <Input 
                  type="url" 
                  id="url" 
                  name="url" 
                  value={newResource.url} 
                  onChange={handleInputChange} 
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={newResource.description} 
                  onChange={handleInputChange} 
                  className="col-span-3" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button type="submit" onClick={handleAddResource}>Add Resource</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </Layout>
  );
}
