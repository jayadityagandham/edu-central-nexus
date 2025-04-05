
import { useState } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Search, Book, LogOut } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  
  // Get user role from Clerk public metadata
  const userRole = user?.publicMetadata?.role as string || "student";

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="flex items-center justify-between p-4 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Book className="h-8 w-8 text-eduBlue-500" />
            <span className="font-serif text-2xl font-bold text-eduBlue-700">EduCentral</span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          <Link to="/resources" className="text-sm font-semibold leading-6 text-gray-900 hover:text-eduBlue-500">
            Resources
          </Link>
          <Link to="/discussions" className="text-sm font-semibold leading-6 text-gray-900 hover:text-eduBlue-500">
            Discussions
          </Link>
          {isSignedIn && userRole === "admin" && (
            <Link to="/admin" className="text-sm font-semibold leading-6 text-gray-900 hover:text-eduBlue-500">
              Admin
            </Link>
          )}
          {isSignedIn && userRole === "faculty" && (
            <Link to="/faculty" className="text-sm font-semibold leading-6 text-gray-900 hover:text-eduBlue-500">
              Faculty Portal
            </Link>
          )}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-eduBlue-400"
            />
          </div>
          
          {isSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
                    <AvatarFallback>{user?.firstName?.charAt(0) || user?.username?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.fullName || user?.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
                    <span className="edu-badge edu-badge-purple mt-1">
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Button asChild variant="ghost">
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                  <Book className="h-8 w-8 text-eduBlue-500" />
                  <span className="font-serif text-2xl font-bold text-eduBlue-700">EduCentral</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Link
                      to="/resources"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Resources
                    </Link>
                    <Link
                      to="/discussions"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Discussions
                    </Link>
                    {isSignedIn && userRole === "admin" && (
                      <Link
                        to="/admin"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin
                      </Link>
                    )}
                    {isSignedIn && userRole === "faculty" && (
                      <Link
                        to="/faculty"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Faculty Portal
                      </Link>
                    )}
                  </div>
                  <div className="py-6">
                    {isSignedIn ? (
                      <>
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar>
                            <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
                            <AvatarFallback>{user?.firstName?.charAt(0) || user?.username?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user?.fullName || user?.username}</p>
                            <span className="edu-badge edu-badge-purple mt-1">
                              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                            </span>
                          </div>
                        </div>
                        <Link
                          to="/profile"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-600 hover:bg-gray-50 w-full text-left"
                          onClick={() => {
                            signOut();
                            setMobileMenuOpen(false);
                          }}
                        >
                          Log out
                        </button>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Link
                          to="/sign-in"
                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/sign-up"
                          className="-mx-3 block rounded-lg bg-eduBlue-50 px-3 py-2.5 text-base font-semibold leading-7 text-eduBlue-600 hover:bg-eduBlue-100"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
