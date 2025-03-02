import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, User, Send, X } from 'lucide-react';

const CommunityForum = () => {
  // Sample initial posts
  const samplePosts = [
    {
      _id: "post1",
      title: "Tips for new cat owners",
      content: "Just adopted my first kitten! Any advice on litter training and essential supplies?",
      authorName: "CatLover22",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 12,
      comments: [
        {
          _id: "comment1",
          content: "Congratulations! Make sure to get a covered litter box to reduce mess, and start with the same food they had at the shelter.",
          authorName: "PetExpert",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: "comment2",
          content: "Cat toys don't need to be expensive - my cats love cardboard boxes and paper bags just as much as fancy toys!",
          authorName: "FrugalPetParent",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    },
    {
      _id: "post2",
      title: "Dog-friendly hiking trails?",
      content: "Looking for recommendations for dog-friendly hiking trails in the Pacific Northwest. My golden retriever loves adventures!",
      authorName: "HikingWithDogs",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 8,
      comments: [
        {
          _id: "comment3",
          content: "Check out Olympic National Forest - lots of pet-friendly trails there!",
          authorName: "OutdoorEnthusiast",
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    },
    {
      _id: "post3",
      title: "Best food for senior pets",
      content: "My 12-year-old lab is starting to slow down. Any recommendations for senior dog food brands that support joint health?",
      authorName: "SeniorPetCare",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 15,
      comments: []
    }
  ];

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiAvailable, setApiAvailable] = useState(true);
  const [activePostId, setActivePostId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [newPostModal, setNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [user, setUser] = useState({ username: 'Guest' + Math.floor(Math.random() * 1000) });
  
  // Fetch all posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // Try to fetch from API
      const response = await fetch('http://localhost:5001/api/posts', {
        method: 'GET',
        // Add a timeout to prevent long loading if API is down
        signal: AbortSignal.timeout(3000)
      });
      
      if (!response.ok) {
        throw new Error(`API connection failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      setPosts(data);
      setApiAvailable(true);
    } catch (error) {
      console.log('Using sample posts due to API error:', error);
      // Fall back to sample posts if API fails
      setPosts(samplePosts);
      setApiAvailable(false);
      setError("Connected in offline mode with sample data. Your posts and actions will be visible but not saved permanently.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchPostDetails = async (postId) => {
    if (!apiAvailable) {
      // Already in offline mode, just set the active post
      setActivePostId(postId);
      return;
    }
    
    try {
      // Try to fetch from API
      const response = await fetch(`http://localhost:5001/api/posts/${postId}`, {
        signal: AbortSignal.timeout(3000)
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update the specific post with detailed data
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post._id === postId ? data : post
          )
        );
      } else {
        console.log(`API error (${response.status}) - using existing post data`);
      }
    } catch (error) {
      console.log('Using existing post data due to API error:', error);
    }
    
    setActivePostId(postId);
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    
    // Create new post object
    const newPostObj = {
      _id: `local-post-${Date.now()}`,
      title: newPost.title,
      content: newPost.content,
      authorName: user.username,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    
    // Add to local posts array immediately
    setPosts(prevPosts => [newPostObj, ...prevPosts]);
    setNewPost({ title: '', content: '' });
    setNewPostModal(false);
    
    // Try to also save to API if it was previously available
    if (apiAvailable) {
      // In handleCreatePost function
fetch('http://localhost:5001/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || 'guest-token'}`
  },
  body: JSON.stringify({
    title: newPostObj.title,
    content: newPostObj.content,
    authorName: user.username // Include the username in the request
  })
})

      .then(response => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Replace our local post ID with the server-generated one
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === newPostObj._id ? { ...post, _id: data._id } : post
          )
        );
      })
      .catch(err => {
        console.log('API error when creating post:', err);
        // Mark as offline mode if we get an error
        if (apiAvailable) {
          setApiAvailable(false);
          setError("Connected in offline mode. Your posts will be visible but not saved to the server.");
        }
      });
    }
  };

  const handleLike = (postId) => {
    // Update like count locally
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post._id === postId ? { 
          ...post, 
          likes: (post.likes || 0) + 1,
          liked: true // Mark as liked by current user
        } : post
      )
    );
    
    // Try to update on server if API was available
    if (apiAvailable) {
      fetch(`http://localhost:5001/api/posts/like/${postId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || 'guest-token'}`
        }
      })
      .then(response => {
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return response.json();
      })
      .catch(err => {
        console.log('Like saved locally only, API error:', err);
        // Don't need to update UI as we've already updated it optimistically
      });
    }
  };

  const handleAddComment = (postId) => {
    if (!newComment.trim()) return;
    
    // Create new comment
    const newCommentObj = {
      _id: `local-comment-${Date.now()}`,
      content: newComment,
      authorName: user.username,
      createdAt: new Date().toISOString()
    };
    
    // Update posts with new comment
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post._id === postId) {
          const updatedComments = [...(post.comments || []), newCommentObj];
          return { ...post, comments: updatedComments };
        }
        return post;
      })
    );
    
    setNewComment('');
    
    // Try to also save to API if it was previously available
    if (apiAvailable) {
     // In handleAddComment function
fetch(`http://localhost:5001/api/posts/comment/${postId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token') || 'guest-token'}`
  },
  body: JSON.stringify({ 
    content: newComment,
    authorName: user.username // Include the username
  })
})

      .then(response => {
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return response.json();
      })
      .catch(err => {
        console.log('Comment saved locally only, API error:', err);
        // We've already updated UI optimistically
      });
    }
  };

  const toggleComments = (postId) => {
    if (activePostId === postId) {
      setActivePostId(null);
    } else {
      fetchPostDetails(postId);
    }
  };

  const handleLogin = () => {
    const username = prompt("Enter a username to use for posting:");
    if (username && username.trim()) {
      setUser({ username: username.trim() });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg">Loading forum posts...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-center flex-grow">Pet Community Forum</h1>
        <div className="text-sm text-gray-600">
          Posting as: <span className="font-bold text-blue-600">{user.username}</span>
          <button 
            onClick={handleLogin}
            className="ml-2 text-blue-600 hover:underline"
          >
            Change
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}
      
      <div className="mb-8 flex justify-center">
        <button 
          onClick={() => setNewPostModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center"
        >
          <MessageSquare className="mr-2" size={20} />
          Create New Post
        </button>
      </div>
      
      {/* New Post Modal */}
      {newPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Post</h2>
              <button onClick={() => setNewPostModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter post title"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-32"
                  placeholder="Share your thoughts or questions..."
                />
              </div>
              
              <button
                onClick={handleCreatePost}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Forum Posts */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id || Math.random()} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <div className="flex items-center text-gray-600 mb-4">
                <User className="mr-2" size={16} />
                <span className="mr-4 font-medium text-blue-600">{post.authorName || (post.author && post.author.username) || 'Anonymous'}</span>
                <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}</span>
              </div>
              
              <div className="mb-4 text-gray-800">
                {post.content}
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <button 
                  onClick={() => handleLike(post._id)}
                  className="flex items-center mr-6 hover:text-red-600 transition duration-300"
                >
                  <Heart 
                    className="mr-1" 
                    size={18} 
                    fill={post.liked ? "#ef4444" : "none"} 
                    stroke={post.liked ? "#ef4444" : "currentColor"}
                  />
                  <span>{post.likes || 0} likes</span>
                </button>
                
                <button 
                  onClick={() => toggleComments(post._id)}
                  className="flex items-center hover:text-blue-600 transition duration-300"
                >
                  <MessageSquare className="mr-1" size={18} />
                  <span>{(post.comments && post.comments.length) || 0} comments</span>
                </button>
              </div>
              
              {/* Comments Section */}
              {activePostId === post._id && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="font-medium text-gray-800 mb-3">Comments</h3>
                  
                  {post.comments && Array.isArray(post.comments) && post.comments.length > 0 ? (
                    <div className="space-y-3 mb-4">
                      {post.comments.map((comment) => (
                        <div key={comment._id || Math.random()} className="bg-gray-50 p-3 rounded">
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <span className="font-medium text-blue-600 mr-2">
                              {comment.authorName || (comment.author && comment.author.username) || 'Anonymous'}
                            </span>
                            <span className="text-xs">
                              {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Unknown date'}
                            </span>
                          </div>
                          <p className="text-gray-800">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic mb-4">No comments yet. Be the first to comment!</p>
                  )}
                  
                  {/* New Comment Input */}
                  <div className="flex">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Add a comment..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleAddComment(post._id);
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(post._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No posts yet. Be the first to start a discussion!</p>
            <button 
              onClick={() => setNewPostModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityForum;