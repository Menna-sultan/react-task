import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertCircle } from 'lucide-react';
import { fetchUsers, createPost } from '../services/api';
import Toast from '../components/Toast';

const postSchema = z.object({
  title: z.string().min(1, { message: 'Post title is required' }),
  body: z.string().min(1, { message: 'Post body is required' }),
  userId: z.string().min(1, { message: 'Please select an author for this post' }),
});

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successToast, setSuccessToast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(console.error);
  }, []);

  const onSubmit = async (data) => {
    setApiError(null);
    setIsSubmitting(true);
    try {
      await createPost({
        title: data.title,
        body: data.body,
        userId: parseInt(data.userId, 10),
      });
      setSuccessToast(true);
      reset();
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setApiError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm  rounded-2xl shadow-xl overflow-hidden flex flex-col ">

      <div className="bg-white p-6 border-b border-gray-100 flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4M2 6h4m-4 4h4m-4 4h4m-4 4h4"></path><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path></g></svg>
        <h2 className="text-xl font-bold text-gray-800">Create a New Post</h2>
      </div>

      <div className="p-10 flex flex-col  bg-slate-50/50">
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="w-full ml-0 max-w-4xl  bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-6 min-h-[800px]"
        >
      
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Title</label>
            <input 
              {...register('title')}
              type="text"
              placeholder="Enter post title"
              className={`w-full placeholder-gray-500 p-4 bg-[#E6E6E6] rounded-xl focus:outline-none transition-all border-2 
                ${errors.title ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-slate-300'}
              `}
            />
            {errors.title && (
              <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title.message}
              </div>
            )}
          </div>

       
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Body</label>
            <textarea 
              {...register('body')}
              rows={5}
              placeholder="Enter post body"
              className={`w-full placeholder-gray-500 p-4 bg-[#E6E6E6] rounded-xl focus:outline-none transition-all border-2 
                ${errors.body ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-slate-300'}
              `}
            />
            {errors.body && (
              <div className="flex items-center gap-1.5 text-red-500 text-xs mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.body.message}
              </div>
            )}
          </div>

       
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Author</label>
            <select 
              {...register('userId')}
              className={`w-full p-4 bg-[#E6E6E6] rounded-xl focus:outline-none transition-all border-2 appearance-none cursor-pointer
                ${errors.userId ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-slate-300'}
              `}
            >
              <option value="">Select Author</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {errors.userId && (
              <div className="flex items-center  gap-1.5 text-red-500  text-xs mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.userId.message}
              </div>
            )}
          </div>

        
          {apiError && (
            <div className="mt-2 p-4 border border-red-300 bg-red-50 rounded-lg flex items-center justify-center gap-3 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{apiError}</span>
            </div>
          )}

         
          <div className="mt-4 flex flex-col items-end">
             <button 
              disabled={isSubmitting}
              type="submit"
              className="w-full md:w-96 py-4 px-8 bg-[#333333] hover:bg-[#222222] disabled:bg-gray-400 text-white rounded-xl font-medium shadow-md transition-all active:scale-[0.98]"
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>

      {successToast && (
        <Toast 
          message="A new post has been successfully created!"
          type="success"
          onClose={() => setSuccessToast(false)}
        />
      )}
    </div>
  );
};

export default CreatePostPage;
