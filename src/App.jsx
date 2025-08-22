import React, { useState, useEffect } from 'react';
import { 
  Youtube, 
  Download, 
  Search, 
  Filter, 
  User, 
  MessageSquare, 
  DollarSign, 
  TrendingUp,
  Eye,
  Tag,
  Mail,
  Phone,
  Copy,
  CheckCircle,
  AlertCircle,
  Star,
  BarChart3,
  Settings,
  Bell,
  LogOut
} from 'lucide-react';

const App = () => {
  // State management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [leads, setLeads] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [selectedLead, setSelectedLead] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [newCommentInterval, setNewCommentInterval] = useState(null);

  // Mock data generation
  const generateMockData = () => {
    const mockVideos = [
      { id: 1, title: "Best Laptops 2024 - Honest Review", url: "https://youtube.com/watch?v=abc123", upload_date: "2024-01-15", view_count: 125000 },
      { id: 2, title: "M3 MacBook Pro - Worth It?", url: "https://youtube.com/watch?v=def456", upload_date: "2024-01-12", view_count: 89000 },
      { id: 3, title: "Budget Smartphone Tier List", url: "https://youtube.com/watch?v=ghi789", upload_date: "2024-01-10", view_count: 67000 },
      { id: 4, title: "Studio Setup Tour 2024", url: "https://youtube.com/watch?v=jkl012", upload_date: "2024-01-08", view_count: 45000 },
      { id: 5, title: "Q&A - Your Tech Questions Answered", url: "https://youtube.com/watch?v=mno345", upload_date: "2024-01-05", view_count: 32000 }
    ];

    const mockComments = [
      // Hot leads
      { id: 1, video_id: 1, username: "@TechEnthusiast92", text: "Where can I buy the first laptop? The specs look perfect for my needs!", intent_level: "hot", timestamp: "2 hours ago", is_subscriber: true },
      { id: 2, video_id: 4, username: "@StudioGear_Fan", text: "Price on the lights? Need them for my setup!", intent_level: "hot", timestamp: "4 hours ago", is_subscriber: false },
      { id: 3, video_id: 1, username: "@CreatorLife", text: "Is the mic still available? Link please!", intent_level: "hot", timestamp: "6 hours ago", is_subscriber: true },
      { id: 4, video_id: 2, username: "@MacUser2024", text: "How much does the M3 Pro cost? Do you ship to Canada?", intent_level: "hot", timestamp: "8 hours ago", is_subscriber: false },
      { id: 5, video_id: 3, username: "@BudgetBuilder", text: "What's the price for the Samsung phone? Looking for deals", intent_level: "hot", timestamp: "10 hours ago", is_subscriber: true },
      { id: 6, video_id: 4, username: "@StreamerPro", text: "Link to the LED panels? Need them ASAP!", intent_level: "hot", timestamp: "12 hours ago", is_subscriber: false },
      { id: 7, video_id: 1, username: "@GamingSetup_Pro", text: "Discount code for the laptop? Student here!", intent_level: "hot", timestamp: "1 day ago", is_subscriber: true },
      { id: 8, video_id: 2, username: "@VideoEditor", text: "What size SSD do you recommend? Price range?", intent_level: "hot", timestamp: "1 day ago", is_subscriber: false },
      
      // Warm leads
      { id: 9, video_id: 1, username: "@LaptopHunter", text: "Need this laptop so bad 😍", intent_level: "warm", timestamp: "3 hours ago", is_subscriber: true },
      { id: 10, video_id: 4, username: "@ContentCreator", text: "That setup though! Want that keyboard", intent_level: "warm", timestamp: "5 hours ago", is_subscriber: false },
      { id: 11, video_id: 3, username: "@TechReviewer", text: "Love this tier list! Need the Samsung", intent_level: "warm", timestamp: "7 hours ago", is_subscriber: true },
      { id: 12, video_id: 2, username: "@MacLover", text: "M3 Pro looks amazing! 🔥", intent_level: "warm", timestamp: "9 hours ago", is_subscriber: false },
      { id: 13, video_id: 1, username: "@StudentTech", text: "Tutorial please on how to set up the laptop!", intent_level: "warm", timestamp: "11 hours ago", is_subscriber: true },
      { id: 14, video_id: 4, username: "@StreamerLife", text: "More info on the camera setup?", intent_level: "warm", timestamp: "13 hours ago", is_subscriber: false },
      { id: 15, video_id: 3, username: "@PhoneGuru", text: "Want that OnePlus phone! 😍", intent_level: "warm", timestamp: "1 day ago", is_subscriber: true },
      
      // Cold engagement
      { id: 16, video_id: 1, username: "@FirstCommenter", text: "First!", intent_level: "cold", timestamp: "1 hour ago", is_subscriber: false },
      { id: 17, video_id: 2, username: "@NotificationSquad", text: "Great video! Thanks for the review", intent_level: "cold", timestamp: "2 hours ago", is_subscriber: true },
      { id: 18, video_id: 3, username: "@TechFan", text: "Notification squad! 🔔", intent_level: "cold", timestamp: "3 hours ago", is_subscriber: false },
      { id: 19, video_id: 4, username: "@StudioEnthusiast", text: "Amazing setup! How long did it take to build?", intent_level: "cold", timestamp: "4 hours ago", is_subscriber: true },
      { id: 20, video_id: 5, username: "@QAFan", text: "Thanks for answering my question!", intent_level: "cold", timestamp: "5 hours ago", is_subscriber: false }
    ];

    const mockLeads = [
      {
        id: 1,
        username: "@TechEnthusiast92",
        channel_url: "https://youtube.com/@TechEnthusiast92",
        comments: [mockComments[0]],
        tags: ["VIP", "High Budget"],
        notes: "Interested in premium laptops",
        email: "tech@example.com",
        status: "converted",
        purchase_value: 1299
      },
      {
        id: 2,
        username: "@StudioGear_Fan",
        channel_url: "https://youtube.com/@StudioGear_Fan",
        comments: [mockComments[1]],
        tags: ["Studio Setup"],
        notes: "Looking for lighting equipment",
        email: "",
        status: "converted",
        purchase_value: 189
      },
      {
        id: 3,
        username: "@CreatorLife",
        channel_url: "https://youtube.com/@CreatorLife",
        comments: [mockComments[2]],
        tags: ["Content Creator"],
        notes: "Audio equipment buyer",
        email: "creator@example.com",
        status: "converted",
        purchase_value: 450
      }
    ];

    const mockAnalytics = {
      total_revenue: 3450,
      total_leads: 47,
      hot_leads: 12,
      warm_leads: 34,
      cold_leads: 156,
      conversion_rate: 25.5,
      average_order: 287.50,
      subscription_cost: 29,
      roi_percentage: 1190
    };

    return { mockVideos, mockComments, mockLeads, mockAnalytics };
  };

  // Intent detection function
  const detectIntent = (commentText) => {
    const text = commentText.toLowerCase();
    
    // Hot leads
    const hotKeywords = [
      'where can i buy', 'price', 'link please', 'how much', 'is this available',
      'do you ship to', 'what size', 'discount code', 'link in bio', 'link?',
      'where to buy', 'cost', 'purchase', 'buy now', 'order'
    ];
    
    // Warm leads
    const warmKeywords = [
      'love this', 'need this', 'want', 'tutorial please', 'more info',
      '😍', '🔥', 'amazing', 'perfect', 'exactly what i need'
    ];
    
    if (hotKeywords.some(keyword => text.includes(keyword))) {
      return 'hot';
    } else if (warmKeywords.some(keyword => text.includes(keyword))) {
      return 'warm';
    } else {
      return 'cold';
    }
  };

  // Initialize data
  useEffect(() => {
         const savedData = localStorage.getItem('comvertData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setVideos(data.videos || []);
      setComments(data.comments || []);
      setLeads(data.leads || []);
      setAnalytics(data.analytics || {});
      setIsYouTubeConnected(data.isYouTubeConnected || false);
      setIsAuthenticated(data.isAuthenticated || false);
      setCurrentUser(data.currentUser || null);
    } else {
      const { mockVideos, mockComments, mockLeads, mockAnalytics } = generateMockData();
      setVideos(mockVideos);
      setComments(mockComments);
      setLeads(mockLeads);
      setAnalytics(mockAnalytics);
      setIsYouTubeConnected(true);
      setIsAuthenticated(true);
      setCurrentUser({ id: 1, email: "creator@example.com", name: "TechReviewChannel" });
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    const data = {
      videos,
      comments,
      leads,
      analytics,
      isYouTubeConnected,
      isAuthenticated,
      currentUser
    };
         localStorage.setItem('comvertData', JSON.stringify(data));
  }, [videos, comments, leads, analytics, isYouTubeConnected, isAuthenticated, currentUser]);

  // Simulate real-time comments
  useEffect(() => {
    if (isAuthenticated && isYouTubeConnected) {
      const interval = setInterval(() => {
        const newComment = generateNewComment();
        setComments(prev => [newComment, ...prev]);
        
        // Update analytics
        setAnalytics(prev => ({
          ...prev,
          cold_leads: prev.cold_leads + 1
        }));
      }, 45000); // Every 45 seconds
      
      setNewCommentInterval(interval);
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, isYouTubeConnected]);

  const generateNewComment = () => {
    const videoIds = videos.map(v => v.id);
    const randomVideoId = videoIds[Math.floor(Math.random() * videoIds.length)];
    const usernames = [
      "@TechFan2024", "@CreatorLife", "@StudioPro", "@GamingSetup", "@MacLover",
      "@BudgetBuilder", "@StreamerLife", "@VideoEditor", "@ContentCreator", "@TechReviewer"
    ];
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    
    const coldComments = [
      "Great video! 🔥",
      "Thanks for the review!",
      "Notification squad! 🔔",
      "Amazing content as always!",
      "Keep up the great work!",
      "This is exactly what I needed!",
      "Love your videos!",
      "Thanks for sharing!",
      "Awesome setup!",
      "Great tips!"
    ];
    
    const randomComment = coldComments[Math.floor(Math.random() * coldComments.length)];
    
    return {
      id: Date.now(),
      video_id: randomVideoId,
      username: randomUsername,
      text: randomComment,
      intent_level: "cold",
      timestamp: "Just now",
      is_subscriber: Math.random() > 0.4
    };
  };

  // Filter comments based on current filter and search
  const filteredComments = comments.filter(comment => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'hot' && comment.intent_level === 'hot') ||
                         (filter === 'warm' && comment.intent_level === 'warm') ||
                         (filter === 'cold' && comment.intent_level === 'cold');
    
    const matchesSearch = comment.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Mark lead as purchased
  const markAsPurchased = (commentId, amount) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      const lead = leads.find(l => l.username === comment.username);
      
      if (lead) {
        // Update existing lead
        setLeads(prev => prev.map(l => 
          l.id === lead.id 
            ? { ...l, status: 'converted', purchase_value: amount }
            : l
        ));
      } else {
        // Create new lead
        const newLead = {
          id: Date.now(),
          username: comment.username,
          channel_url: `https://youtube.com/${comment.username}`,
          comments: [comment],
          tags: [],
          notes: "",
          email: "",
          status: 'converted',
          purchase_value: amount
        };
        setLeads(prev => [...prev, newLead]);
      }
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        total_revenue: prev.total_revenue + amount,
        total_leads: prev.total_leads + 1,
        average_order: (prev.total_revenue + amount) / (prev.total_leads + 1),
        roi_percentage: ((prev.total_revenue + amount) / prev.subscription_cost) * 100
      }));
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvData = filteredComments.map(comment => {
      const lead = leads.find(l => l.username === comment.username);
      const video = videos.find(v => v.id === comment.video_id);
      
      return {
        'YouTube Username': comment.username,
        'Channel URL': `https://youtube.com/${comment.username}`,
        'Comment Text': comment.text,
        'Video Title': video?.title || 'Unknown',
        'Intent Level': comment.intent_level,
        'Timestamp': comment.timestamp,
        'Is Subscriber': comment.is_subscriber ? 'Yes' : 'No',
        'Status': lead?.status || 'Not Contacted',
        'Purchase Value': lead?.purchase_value || '',
        'Notes': lead?.notes || '',
        'Tags': lead?.tags?.join(', ') || ''
      };
    });
    
    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
         a.download = `comvert-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Add note to lead
  const addNoteToLead = (username, note) => {
    setLeads(prev => prev.map(lead => 
      lead.username === username 
        ? { ...lead, notes: note }
        : lead
    ));
  };

  // Add tag to lead
  const addTagToLead = (username, tag) => {
    setLeads(prev => prev.map(lead => 
      lead.username === username 
        ? { ...lead, tags: [...(lead.tags || []), tag] }
        : lead
    ));
  };

  // Get video title by ID
  const getVideoTitle = (videoId) => {
    const video = videos.find(v => v.id === videoId);
    return video?.title || 'Unknown Video';
  };

  // Get intent emoji
  const getIntentEmoji = (intent) => {
    switch (intent) {
      case 'hot': return '🔥';
      case 'warm': return '🤔';
      case 'cold': return '💬';
      default: return '💬';
    }
  };

  // Get intent class
  const getIntentClass = (intent) => {
    switch (intent) {
      case 'hot': return 'intent-hot';
      case 'warm': return 'intent-warm';
      case 'cold': return 'intent-cold';
      default: return 'intent-cold';
    }
  };

  // Authentication component
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
                             <Youtube className="w-12 h-12 text-youtube-red" />
               <h1 className="text-3xl font-bold ml-3">Comvert</h1>
            </div>
            <p className="text-gray-600">Convert YouTube comments into sales</p>
          </div>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            setIsAuthenticated(true);
            setCurrentUser({ id: 1, email: "creator@example.com", name: "TechReviewChannel" });
          }}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // YouTube connection component
  if (!isYouTubeConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card max-w-md w-full">
          <div className="text-center mb-8">
            <Youtube className="w-16 h-16 text-youtube-red mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Connect Your YouTube Channel</h1>
            <p className="text-gray-600">Start capturing comments and converting them to sales</p>
          </div>
          
          <div className="space-y-4">
            <button 
              onClick={() => setIsYouTubeConnected(true)}
              className="btn-primary w-full flex items-center justify-center"
            >
              <Youtube className="w-5 h-5 mr-2" />
              Connect YouTube Channel
            </button>
            
            <div className="text-center text-sm text-gray-500">
              <p>Instagram, TikTok, Facebook - Coming Soon!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ROI Banner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <DollarSign className="w-6 h-6" />
            <div>
              <div className="text-lg font-bold">
                💰 Month to Date: ${analytics.total_revenue?.toLocaleString()} from YouTube comments
              </div>
              <div className="text-sm opacity-90">
                ROI: {analytics.roi_percentage?.toFixed(0)}x your subscription cost
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Subscription: $29/mo</div>
            <div className="text-sm font-semibold">
              Profit: ${(analytics.total_revenue - analytics.subscription_cost)?.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                                 <Youtube className="w-8 h-8 text-youtube-red" />
                 <h1 className="text-xl font-bold ml-2">Comvert</h1>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Connected to:</span>
                <span className="font-medium">{currentUser?.name}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-400" />
                {analytics.hot_leads > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {analytics.hot_leads}
                  </span>
                )}
              </div>
              <button onClick={exportToCSV} className="btn-secondary flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hot Leads Today</p>
                <p className="text-2xl font-bold text-red-600">{analytics.hot_leads}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Interested</p>
                <p className="text-2xl font-bold text-yellow-600">{analytics.warm_leads}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Comments</p>
                <p className="text-2xl font-bold text-gray-600">{analytics.cold_leads}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Order</p>
                <p className="text-2xl font-bold text-green-600">${analytics.average_order?.toFixed(0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-wrap items-center space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'all' ? 'bg-youtube-red text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Show All
              </button>
              <button
                onClick={() => setFilter('hot')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'hot' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                🔥 Hot Leads Only
              </button>
              <button
                onClick={() => setFilter('warm')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'warm' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                🤔 Warm Leads
              </button>
              <button
                onClick={() => setFilter('cold')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === 'cold' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                💬 All Comments
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search comments or usernames..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Comments List */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">YouTube Comments</h2>
              
              <div className="space-y-4">
                {filteredComments.map(comment => {
                  const lead = leads.find(l => l.username === comment.username);
                  const video = videos.find(v => v.id === comment.video_id);
                  
                  return (
                    <div key={comment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-blue-600 hover:underline cursor-pointer" 
                                  onClick={() => {
                                    setSelectedLead(lead || { username: comment.username, comments: [comment] });
                                    setShowLeadDetails(true);
                                  }}>
                              {comment.username}
                            </span>
                            {comment.is_subscriber && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                Subscriber
                              </span>
                            )}
                            <span className={`text-xs px-2 py-1 rounded-full ${getIntentClass(comment.intent_level)}`}>
                              {getIntentEmoji(comment.intent_level)} {comment.intent_level}
                            </span>
                            {lead?.status === 'converted' && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                💰 ${lead.purchase_value}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-gray-800 mb-2">{comment.text}</p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{video?.title}</span>
                            <span>{comment.timestamp}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-4">
                          {comment.intent_level === 'hot' && !lead?.status && (
                            <button
                              onClick={() => {
                                const amount = prompt('How much did they spend? $');
                                if (amount && !isNaN(amount)) {
                                  markAsPurchased(comment.id, parseFloat(amount));
                                }
                              }}
                              className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-lg"
                            >
                              💰 Converted!
                            </button>
                          )}
                          
                          <button className="text-gray-400 hover:text-gray-600">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {filteredComments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No comments found matching your criteria.
                </div>
              )}
            </div>
          </div>

          {/* Lead Details Sidebar */}
          <div className="lg:col-span-1">
            {showLeadDetails && selectedLead ? (
              <div className="card sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Lead Details</h3>
                  <button 
                    onClick={() => setShowLeadDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedLead.username}</h4>
                    <p className="text-sm text-gray-500">YouTube Channel</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">All Comments</h5>
                    <div className="space-y-2">
                      {selectedLead.comments?.map(comment => (
                        <div key={comment.id} className="text-sm bg-gray-50 p-2 rounded">
                          <p className="text-gray-800">{comment.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{getVideoTitle(comment.video_id)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Notes</h5>
                    <textarea
                      value={selectedLead.notes || ''}
                      onChange={(e) => addNoteToLead(selectedLead.username, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                      rows="3"
                      placeholder="Add notes about this lead..."
                    />
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Tags</h5>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedLead.tags?.map(tag => (
                        <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Add tag..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                          addTagToLead(selectedLead.username, e.target.value.trim());
                          e.target.value = '';
                        }
                      }}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Contact Info</h5>
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm mb-2"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="btn-secondary flex-1 flex items-center justify-center text-sm">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </button>
                    <button className="btn-secondary flex-1 flex items-center justify-center text-sm">
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card text-center text-gray-500">
                <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Click on a username to view lead details</p>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-8">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Revenue Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {analytics.conversion_rate?.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {analytics.total_leads}
                </div>
                <div className="text-sm text-gray-600">Total Leads Contacted</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  ${analytics.total_revenue?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Magic Phrases that Make Money:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>"where to buy" → avg $320 orders</div>
                <div>"link?" → avg $180 orders</div>
                <div>"price please" → avg $250 orders</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
