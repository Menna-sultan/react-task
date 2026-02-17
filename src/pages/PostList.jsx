import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  Plus,
  ChevronDown,
} from "lucide-react";
import { fetchPosts, fetchUsers } from "../services/api";

const POSTS_PER_PAGE = 12;

const PostListPage = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postsData, usersData] = await Promise.all([
          fetchPosts(),
          fetchUsers(),
        ]);
        setPosts(postsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesAuthor =
        selectedAuthor === "All" ||
        post.userId === parseInt(selectedAuthor);

      return matchesSearch && matchesAuthor;
    });
  }, [posts, searchTerm, selectedAuthor]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedAuthor]);

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl overflow-hidden flex flex-col">
     
      <div className="p-6  flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
         <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M15 12h-5m5-4h-5m9 9V5a2 2 0 0 0-2-2H4"></path><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"></path></g></svg>
          <h2 className="text-xl font-bold text-gray-800">Post List</h2>
        </div>

        <button
          onClick={() => navigate("/create")}
          className="flex items-center gap-1 text-slate-800 hover:text-slate-800 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Create a new post
        </button>
      </div>

     
      <div className="p-6 bg-[#B3BBC3] backdrop-blur flex flex-col md:flex-row gap-4 items-center ">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search for a post..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

<div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-gray-600 font-medium whitespace-nowrap">
            Author:
          </span>

          <div className="relative flex-1 md:w-48">
            <select
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-all appearance-none cursor-pointer pr-10"
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
            >
              <option value="All">All</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))} 
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>


      <div className="divide-y divide-black/20">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/post/${post.id}`)}
              className= " px-8 py-4 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <p className="text-gray-700 font-medium line-clamp-1 group-hover:text-slate-900">
                {post.title}
              </p>
            </div>
          ))
        ) : (
          <div className="p-20 text-center text-gray-500">
            No posts found matching your criteria.
          </div>
        )}
      </div>
      <div class="p-6 flex justify-center items-center gap-2 bg-white">
        <button disabled="" class="p-2 w-9 h-9 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100 disabled:opacity-30 transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-left w-5 h-5 text-gray-600" aria-hidden="true"><path d="m11 17-5-5 5-5"></path><path d="m18 17-5-5 5-5"></path></svg>
        </button>
        <button disabled="" class="p-2 w-9 h-9 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100 disabled:opacity-30 transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left w-5 h-5 text-gray-600" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>
        </button>
        <div class="flex items-center gap-4">
          <button class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all
                     bg-blue-600 text-white shadow-lg
                   ">1
                   </button>
                   <button class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all
                     text-gray-600   text-gray-800 border border-gray-300 shadow-sm hover:bg-gray-100
                   ">2</button>
                   <button class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all
                     text-gray-800  border border-gray-300 shadow-sm hover:bg-gray-100
                   ">3</button>
                   <button class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all
                     text-gray-800  border border-gray-300 shadow-sm hover:bg-gray-100
                   ">4</button>
                   <button class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all
                     text-gray-800  border border-gray-300 shadow-sm hover:bg-gray-100
                   ">5</button>
                   <span class="px-2 text-gray-800">...</span>
                   <button class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all
                   text-gray-800  border border-gray-300 shadow-sm hover:bg-gray-100
                 ">9</button>
                 </div>
                 <button class="p-2 w-9 h-9 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-all   border border-gray-300 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right w-5 h-5 text-gray-600" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>
                  </button>
                  <button class="p-2 w-9 h-9 rounded-full border border-gray-300 shadow-sm hover:bg-gray-100 disabled:opacity-30 transition-all ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right w-5 h-5 text-gray-600" aria-hidden="true"><path d="m6 17 5-5-5-5"></path><path d="m13 17 5-5-5-5"></path></svg>
                    </button>
                    </div>
    </div>
  );
};

export default PostListPage;
