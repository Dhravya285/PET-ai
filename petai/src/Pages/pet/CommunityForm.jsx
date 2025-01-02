import React from 'react';
import { MessageSquare, ThumbsUp, User } from 'lucide-react';

const CommunityForum = () => {
  const forumPosts = [
    {
      id: 1,
      title: 'Tips for first-time pet owners',
      author: 'PetLover123',
      date: '2023-05-15',
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      title: 'Best food brands for senior dogs',
      author: 'DogMom42',
      date: '2023-05-14',
      likes: 18,
      comments: 12,
    },
    {
      id: 3,
      title: 'How to introduce a new cat to your home',
      author: 'CatWhisperer',
      date: '2023-05-13',
      likes: 31,
      comments: 15,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Community Forum</h1>
      <div className="mb-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
          Create New Post
        </button>
      </div>
      <div className="space-y-6">
        {forumPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <div className="flex items-center text-gray-600 mb-4">
              <User className="mr-2" size={16} />
              <span className="mr-4">{post.author}</span>
              <span>{post.date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <ThumbsUp className="mr-1" size={16} />
              <span className="mr-4">{post.likes} likes</span>
              <MessageSquare className="mr-1" size={16} />
              <span>{post.comments} comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityForum;

