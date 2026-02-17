import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import { fetchPostById, fetchUsers } from '../services/api';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        if (!id) return;

        const postData = await fetchPostById(id);
        const users = await fetchUsers();
        const foundAuthor = users.find(u => u.id === postData.userId);

        setPost(postData);
        setAuthor(foundAuthor || null);
      } catch (error) {
        console.error("Failed to load post detail", error);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white/80 rounded-2xl p-20 flex justify-center items-center ">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-20 text-center text-white">
        Post not found
      </div>
    );
  }

  return (
    <div className=" rounded-3xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col min-h-[800px]">
      
     
      <div className="bg-[#416486]/80 backdrop-blur-sm  p-10 md:p-16 text-white relative ">
        
        <button
          onClick={() => navigate(-1)}
  className="mb-8 flex items-center justify-center gap-2 bg-[#CED9E3] backdrop-blur-md hover:bg-white/30 px-4 py-3  rounded-full text-sm text-gray-800 font-medium transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </button>

        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
          
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{author?.name || 'Unknown Author'}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Sun, August 24th, 2025</span>
          </div>

        </div>
      </div>


      <div className="bg-white/70 backdrop-blur-sm  p-10 md:p-16 flex-1">
        <div className=" max-w-3xl text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
          {post.body}
        </div>
      </div>

    </div>
  );
};

export default PostDetailPage;
