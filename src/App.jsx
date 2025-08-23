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
  LogOut,
  Home,
  CreditCard,
  Zap,
  Menu,
  X,
  ChevronRight,
  Edit,
  Camera,
  Shield,
  Globe,
  Palette,
  Volume2,
  Users,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  GripVertical,
  MoreHorizontal,
  Grid,
  FileText,
  MessageCircle,
  Calendar,
  Clock,
  Plus,
  MoreVertical,
  ChevronDown,
  ArrowLeft,
  Check
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
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedLeadDetail, setSelectedLeadDetail] = useState(null);
  const [sortBy, setSortBy] = useState('date_created');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [filterIntent, setFilterIntent] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterChannel, setFilterChannel] = useState('all');
  const [filterLeadScore, setFilterLeadScore] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedLeadForPurchase, setSelectedLeadForPurchase] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [leadsColumns, setLeadsColumns] = useState([
    { id: 'username', label: 'Username', sortable: true, visible: true, width: 'w-32' },
    { id: 'intent', label: 'Intent', sortable: true, visible: true, width: 'w-24' },
    { id: 'status', label: 'Status', sortable: true, visible: true, width: 'w-24' },
    { id: 'purchase_value', label: 'Revenue', sortable: true, visible: true, width: 'w-24' },
    { id: 'last_comment', label: 'Last Comment', sortable: false, visible: true, width: 'w-48' },
    { id: 'video', label: 'Video', sortable: true, visible: true, width: 'w-40' },
    { id: 'timestamp', label: 'Date', sortable: true, visible: true, width: 'w-32' }
  ]);
  const [leadsSortBy, setLeadsSortBy] = useState({ field: 'timestamp', direction: 'desc' });
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [columnOrder, setColumnOrder] = useState(['username', 'intent', 'status', 'purchase_value', 'last_comment', 'video', 'timestamp']);

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
  const getIntentLevel = (comment) => {
    const text = comment.toLowerCase();
    const hotWords = ['buy', 'price', 'link', 'where', 'cost', 'discount', 'purchase', 'order', 'available', 'shipping', 'payment'];
    const warmWords = ['want', 'need', 'love', '😍', '🔥', 'interested', 'like', 'recommend', 'suggest'];
    
    if (hotWords.some(word => text.includes(word))) return 'hot';
    if (warmWords.some(word => text.includes(word))) return 'warm';
    return 'cold';
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
      setIsYouTubeConnected(data.isYouTubeConnected || true);
      setIsAuthenticated(data.isAuthenticated || true);
      setCurrentUser(data.currentUser || { id: 1, email: "creator@example.com", name: "TechReviewChannel" });
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
      intent_level: getIntentLevel(randomComment),
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



  // Export to CSV
  const exportToCSV = () => {
    const csvHeaders = 'Username,Comment,Intent,Commission,Status,Date\n';
    const csvData = leads.map(lead => {
      const lastComment = lead.comments && lead.comments.length > 0 ? lead.comments[0].text : '';
      const intent = lead.comments && lead.comments.length > 0 ? lead.comments[0].intent_level : 'cold';
      return `${lead.username},"${lastComment}",${intent},${lead.commission || 0},${lead.status || 'active'},${lead.createdDate || 'N/A'}`;
    }).join('\n');
    
    const csv = csvHeaders + csvData;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'comvert-leads.csv';
    a.click();
    URL.revokeObjectURL(url);
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
      case 'hot': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'warm': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'cold': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Sidebar component
  const Sidebar = () => (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">C</span>
          </div>
          <h1 className="text-xl font-bold ml-3 text-white">Comvert</h1>
        </div>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-400 hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <nav className="p-4 flex-1">
        <div className="space-y-1">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              currentPage === 'dashboard' 
                ? 'bg-green-500 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4 mr-3" />
            Dashboard
          </button>
          
          <button
            onClick={() => setCurrentPage('leads')}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              currentPage === 'leads' 
                ? 'bg-green-500 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 mr-3" />
            Leads
          </button>
          
          <button
            onClick={() => setCurrentPage('settings')}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              currentPage === 'settings' 
                ? 'bg-green-500 text-white' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex items-center px-4 py-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {currentUser?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{currentUser?.name || 'User'}</p>
              <p className="text-xs text-gray-400">{currentUser?.email || 'user@example.com'}</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );

  // Sort leads function
  const sortLeads = (leads) => {
    return [...leads].sort((a, b) => {
      const { field, direction } = leadsSortBy;
      let aValue, bValue;
      
      switch (field) {
        case 'username':
          aValue = a.username;
          bValue = b.username;
          break;
        case 'intent':
          aValue = a.intent_level || 'cold';
          bValue = b.intent_level || 'cold';
          break;
        case 'status':
          aValue = a.status || 'not_contacted';
          bValue = b.status || 'not_contacted';
          break;
        case 'purchase_value':
          aValue = a.purchase_value || 0;
          bValue = b.purchase_value || 0;
          break;
        case 'video':
          aValue = getVideoTitle(a.video_id);
          bValue = getVideoTitle(b.video_id);
          break;
        case 'timestamp':
          aValue = new Date(a.timestamp || '2024-01-01');
          bValue = new Date(b.timestamp || '2024-01-01');
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Handle column sort
  const handleColumnSort = (field) => {
    setLeadsSortBy(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle column reorder with drag and drop
  const handleDragStart = (e, columnId) => {
    console.log('Drag start:', columnId);
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', columnId);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedColumn && draggedColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    console.log('Drop:', draggedColumn, 'onto', targetColumnId);
    
    if (draggedColumn && draggedColumn !== targetColumnId) {
      setColumnOrder(prev => {
        const newOrder = [...prev];
        const draggedIndex = newOrder.indexOf(draggedColumn);
        const targetIndex = newOrder.indexOf(targetColumnId);
        
        if (draggedIndex === -1 || targetIndex === -1) return prev;
        
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, draggedColumn);
        
        console.log('New order:', newOrder);
        return newOrder;
      });
    }
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    console.log('Drag end');
    setDraggedColumn(null);
    setDragOverColumn(null);
  };

  const toggleColumnVisibility = (columnId) => {
    setLeadsColumns(prev => prev.map(col => 
      col.id === columnId ? { ...col, visible: !col.visible } : col
    ));
  };

  // Get all unique leads from comments
  const getAllLeads = () => {
    const leadMap = new Map();
    
    comments.forEach(comment => {
      if (!leadMap.has(comment.username)) {
        const lead = leads.find(l => l.username === comment.username);
        leadMap.set(comment.username, {
          id: comment.username,
          username: comment.username,
          intent_level: comment.intent_level,
          status: lead?.status || 'not_contacted',
          purchase_value: lead?.purchase_value || 0,
          last_comment: comment.text,
          video_id: comment.video_id,
          timestamp: comment.timestamp,
          is_subscriber: comment.is_subscriber
        });
      }
    });
    
    return Array.from(leadMap.values());
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowSortDropdown(false);
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get detailed lead information
  const getLeadDetails = (username) => {
    const leadComments = comments.filter(c => c.username === username);
    const allLeads = getAllLeads();
    const lead = allLeads.find(l => l.username === username);
    
    if (!lead) return null;

    // Get all comments by this user
    const userComments = comments.filter(c => c.username === username);
    const lastComment = userComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
    
    // Get product interests from comments
    const productInterests = userComments
      .filter(c => c.intent_level === 'hot' || c.intent_level === 'warm')
      .map(c => {
        const videoTitle = getVideoTitle(c.video_id);
        return {
          product: videoTitle,
          interest_level: c.intent_level,
          comment: c.text,
          date: c.timestamp
        };
      });

    // Generate mock contact info
    const mockContactInfo = {
      email: Math.random() > 0.3 ? `${username.replace('@', '').toLowerCase()}@gmail.com` : 'N/A',
      phone: Math.random() > 0.6 ? `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` : 'N/A',
      location: Math.random() > 0.6 ? ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ'][Math.floor(Math.random() * 5)] : 'N/A',
      timezone: Math.random() > 0.6 ? ['EST', 'PST', 'CST', 'MST'][Math.floor(Math.random() * 4)] : 'N/A'
    };

    return {
      ...lead,
      comments: userComments,
      lastComment: lastComment,
      productInterests: productInterests,
      contactInfo: mockContactInfo,
      totalComments: userComments.length,
      firstSeen: userComments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))[0]?.timestamp || 'N/A',
      lastSeen: lastComment?.timestamp || 'N/A',
      engagementScore: Math.floor(Math.random() * 100) + 1,
      tags: lead.tags || [],
      notes: lead.notes || ''
    };
  };

  // Lead Detail Page component
  const LeadDetailPage = ({ lead, onBack }) => {
    const [activeTab, setActiveTab] = useState('summary'); // Start on summary tab
    const [isEditing, setIsEditing] = useState(false);
    const [editedLead, setEditedLead] = useState(null);
    const [justSaved, setJustSaved] = useState(false); // Track if we just saved
    
    if (!lead) return null;

    // Initialize edited lead data when component mounts or lead changes
    useEffect(() => {
      if (lead) {
        setEditedLead({
          ...lead,
          contactInfo: {
            ...lead.contactInfo,
            firstName: lead.contactInfo?.firstName || '',
            lastName: lead.contactInfo?.lastName || '',
            email: lead.contactInfo?.email || '',
            phone: lead.contactInfo?.phone || '',
            location: lead.contactInfo?.location || '',
            timezone: lead.contactInfo?.timezone || '',
            language: lead.contactInfo?.language || 'English',
            dateOfBirth: lead.contactInfo?.dateOfBirth || ''
          },
          tags: [...(lead.tags || [])],
          notes: lead.notes || ''
        });
        
        // If we just saved, stay on details tab, otherwise go to summary
        if (justSaved) {
          setActiveTab('details');
          setJustSaved(false); // Reset the flag
        } else {
          setActiveTab('summary');
        }
      }
    }, [lead, justSaved]);

    const handleSave = () => {
      if (!editedLead) return;
      
      console.log('Saving lead:', editedLead);
      
      // Update the lead in the main leads array
      const updatedLeads = leads.map(l => 
        l.username === lead.username ? editedLead : l
      );
      setLeads(updatedLeads);
      
      // Save to localStorage
      localStorage.setItem('leads', JSON.stringify(updatedLeads));
      
      // Update analytics if needed
      const updatedAnalytics = { ...analytics };
      if (editedLead.contactInfo?.email !== lead.contactInfo?.email) {
        // Update any analytics that depend on email
      }
      setAnalytics(updatedAnalytics);
      
      setIsEditing(false);
      
      // Force a re-render by updating the selectedLeadDetail
      setSelectedLeadDetail(editedLead);
      
      // Set flag to stay on details tab after save
      setJustSaved(true);
      
      console.log('Save completed, staying on details tab');
    };

    const handleCancel = () => {
      // Reset to original data
      if (lead) {
        setEditedLead({
          ...lead,
          contactInfo: {
            ...lead.contactInfo,
            firstName: lead.contactInfo?.firstName || '',
            lastName: lead.contactInfo?.lastName || '',
            email: lead.contactInfo?.email || '',
            phone: lead.contactInfo?.phone || '',
            location: lead.contactInfo?.location || '',
            timezone: lead.contactInfo?.timezone || '',
            language: lead.contactInfo?.language || 'English',
            dateOfBirth: lead.contactInfo?.dateOfBirth || ''
          },
          tags: [...(lead.tags || [])],
          notes: lead.notes || ''
        });
      }
      setIsEditing(false);
    };

    const handleInputChange = (field, value) => {
      setEditedLead(prev => ({
        ...prev,
        [field]: value
      }));
    };

    const handleContactInfoChange = (field, value) => {
      setEditedLead(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [field]: value
        }
      }));
    };

    const handleAddTag = () => {
      const newTag = prompt('Enter new tag:');
      if (newTag && newTag.trim()) {
        setEditedLead(prev => ({
          ...prev,
          tags: [...(prev.tags || []), newTag.trim()]
        }));
      }
    };

      const handleRemoveTag = (tagToRemove) => {
    setEditedLead(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Purchase functionality
  const markAsPurchased = (leadId) => {
    const amount = prompt("How much commission did you earn?");
    if (amount) {
      const commission = parseFloat(amount);
      if (isNaN(commission) || commission < 0) return;
      
      // Update lead status
      const updatedLeads = leads.map(l => 
        l.id === leadId 
          ? { ...l, status: 'converted', commission: commission }
          : l
      );
      setLeads(updatedLeads);
      
      // Update ROI banner
      setAnalytics(prev => ({
        ...prev,
        total_revenue: prev.total_revenue + commission,
        converted_leads: (prev.converted_leads || 0) + 1
      }));
      
      // Save to localStorage
      const updatedAnalytics = { ...analytics, total_revenue: analytics.total_revenue + commission };
      localStorage.setItem('comvertData', JSON.stringify({
        videos,
        comments,
        leads: updatedLeads,
        analytics: updatedAnalytics,
        isYouTubeConnected,
        isAuthenticated,
        currentUser
      }));
    }
  };

    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Leads</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Edit</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Lead Profile Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-200">
              <span className="text-green-600 text-2xl font-bold">
                {lead.username.charAt(1).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{lead.username}</h1>
              <p className="text-gray-600">YouTube Comment Lead</p>
            </div>
          </div>
          
          {/* Lead Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            <div>
              <p className="text-sm text-gray-500">Program</p>
              <p className="font-medium">YouTube Comments</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lead ID</p>
              <p className="font-medium">{lead.username.replace('@', '')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{lead.contactInfo?.location || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Property</p>
              <p className="font-medium">YouTube Channel</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button 
              onClick={() => setActiveTab('summary')}
              className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
                activeTab === 'summary' 
                  ? 'border-green-500 text-green-500' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Summary
            </button>
            <button 
              onClick={() => setActiveTab('details')}
              className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
                activeTab === 'details' 
                  ? 'border-green-500 text-green-500' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Details
            </button>
            <button 
              onClick={() => setActiveTab('comments')}
              className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
                activeTab === 'comments' 
                  ? 'border-green-500 text-green-500' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Comments
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
                activeTab === 'products' 
                  ? 'border-green-500 text-green-500' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Products
            </button>
            <button 
              onClick={() => setActiveTab('conversations')}
              className={`border-b-2 py-2 px-1 text-sm font-medium transition-colors ${
                activeTab === 'conversations' 
                  ? 'border-green-500 text-green-500' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Conversations
            </button>
          </nav>
        </div>

        {/* Main Content */}
        {activeTab === 'summary' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Comment History */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Comment History</h3>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1">
                    <option>Last 12 months</option>
                    <option>Last 6 months</option>
                    <option>Last 3 months</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">This year</span>
                    <span className="font-medium">{lead.totalComments} comments</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last year</span>
                    <span className="font-medium">0 comments</span>
                  </div>
                  {/* Simple chart placeholder */}
                  <div className="h-32 bg-gray-50 rounded flex items-end justify-between p-4">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                      <div key={month} className="flex flex-col items-center">
                        <div 
                          className="w-4 bg-green-500 rounded-t"
                          style={{ height: `${Math.random() * 60 + 20}px` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-sm text-gray-600">Compare to previous period</span>
                    </label>
                    <button className="bg-green-500 text-white px-4 py-2 rounded text-sm">View History</button>
                  </div>
                </div>
              </div>

              {/* Product Interests */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Interests</h3>
                <div className="space-y-3">
                  {lead.productInterests && lead.productInterests.length > 0 ? (
                    lead.productInterests.map((interest, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-gray-900">{interest.product}</p>
                          <p className="text-sm text-gray-600">{interest.comment}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          interest.interest_level === 'hot' ? 'bg-orange-100 text-orange-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {interest.interest_level}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No product interests identified yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Active Lead</h4>
                    <p className="text-sm text-gray-600">Last comment: {lead.lastSeen}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Comments:</span>
                    <span className="font-medium">{lead.totalComments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Engagement Score:</span>
                    <span className="font-medium">{lead.engagementScore}/100</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Contact Information</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{lead.contactInfo?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{lead.contactInfo?.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Timezone</p>
                    <p className="font-medium">{lead.contactInfo?.timezone}</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Location</h4>
                <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-500">Map placeholder</span>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-900">YouTube Channel</p>
                  <p className="text-sm text-gray-600">Platform: YouTube</p>
                  <p className="text-sm text-gray-600">Channel: {lead.username}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="space-y-6">
            {/* Comments Header */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Comment Timeline</h3>
                  <p className="text-sm text-gray-600">All comments by {lead.username} across all channels</p>
                </div>
                <div className="flex items-center space-x-4">
                  <select className="text-sm border border-gray-300 rounded px-3 py-2">
                    <option>All Channels</option>
                    <option>Tech Reviews</option>
                    <option>Gaming Channel</option>
                    <option>Cooking Tips</option>
                    <option>Fitness Pro</option>
                    <option>Travel Vlogs</option>
                  </select>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600">
                    Export Comments
                  </button>
                </div>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{lead.totalComments}</div>
                  <div className="text-sm text-gray-600">Total Comments</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {lead.comments?.filter(c => c.intent_level === 'hot').length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Hot Intent</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {lead.comments?.filter(c => c.intent_level === 'warm').length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Warm Intent</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {lead.comments?.filter(c => c.intent_level === 'cold').length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Cold Intent</div>
                </div>
              </div>
            </div>

            {/* Comments Timeline */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-6">
                {lead.comments && lead.comments.length > 0 ? (
                  lead.comments.map((comment, index) => (
                    <div key={comment.id || index} className="relative">
                      {/* Timeline Line */}
                      {index < lead.comments.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        {/* Timeline Dot */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          comment.intent_level === 'hot' ? 'bg-orange-100' :
                          comment.intent_level === 'warm' ? 'bg-purple-100' :
                          'bg-gray-100'
                        }`}>
                          <MessageSquare className={`w-5 h-5 ${
                            comment.intent_level === 'hot' ? 'text-orange-600' :
                            comment.intent_level === 'warm' ? 'text-purple-600' :
                            'text-gray-600'
                          }`} />
                        </div>
                        
                        {/* Comment Content */}
                        <div className="flex-1 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-xs font-medium">
                                  {['TR', 'GC', 'CT', 'FP', 'TV'][Math.floor(Math.random() * 5)]}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {['Tech Reviews', 'Gaming Channel', 'Cooking Tips', 'Fitness Pro', 'Travel Vlogs'][Math.floor(Math.random() * 5)]}
                                </div>
                                <div className="text-sm text-gray-500">{comment.timestamp}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                comment.intent_level === 'hot' ? 'bg-orange-100 text-orange-800' :
                                comment.intent_level === 'warm' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {getIntentEmoji(comment.intent_level)} {comment.intent_level}
                              </span>
                              {comment.is_subscriber && (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                  Subscriber
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-gray-800 mb-3 leading-relaxed">{comment.text}</p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{Math.floor(Math.random() * 1000) + 100} views</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <MessageSquare className="w-4 h-4" />
                                <span>{Math.floor(Math.random() * 50) + 1} replies</span>
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                                View Video
                              </button>
                              <button className="text-gray-600 hover:text-gray-700 text-sm">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No comments found</h3>
                    <p className="text-gray-500">This lead hasn't made any comments yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                  <p className="text-sm text-gray-600">Primary contact details for {editedLead?.username || lead.username}</p>
                </div>
                <div className="flex items-center space-x-3">
                  {!isEditing ? (
                    <>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200"
                      >
                        Edit
                      </button>
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600">
                        Export Contact
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={handleCancel}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
                      >
                        Save Changes
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2">Personal Information</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedLead?.contactInfo?.firstName || ''}
                          onChange={(e) => handleContactInfoChange('firstName', e.target.value)}
                          className="w-full text-gray-900 bg-white px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter first name"
                        />
                      ) : (
                        <div 
                          className="text-gray-900 bg-gray-50 px-3 py-2 rounded border cursor-pointer hover:bg-gray-100 transition-colors"
                          onDoubleClick={() => setIsEditing(true)}
                        >
                          {editedLead?.contactInfo?.firstName || 'N/A'}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedLead?.contactInfo?.lastName || ''}
                          onChange={(e) => handleContactInfoChange('lastName', e.target.value)}
                          className="w-full text-gray-900 bg-white px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter last name"
                        />
                      ) : (
                        <div 
                          className="text-gray-900 bg-gray-50 px-3 py-2 rounded border cursor-pointer hover:bg-gray-100 transition-colors"
                          onDoubleClick={() => setIsEditing(true)}
                        >
                          {editedLead?.contactInfo?.lastName || 'N/A'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                    <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                      {editedLead?.username || lead.username}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedLead?.contactInfo?.email || ''}
                        onChange={(e) => handleContactInfoChange('email', e.target.value)}
                        className="w-full text-gray-900 bg-white px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter email address"
                      />
                                          ) : (
                        <div 
                          className="text-gray-900 bg-gray-50 px-3 py-2 rounded border flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                          onDoubleClick={() => setIsEditing(true)}
                        >
                          <span>{editedLead?.contactInfo?.email || 'N/A'}</span>
                          {editedLead?.contactInfo?.email && (
                            <button className="text-green-600 hover:text-green-700 text-sm">
                              Send Email
                            </button>
                          )}
                        </div>
                      )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedLead?.contactInfo?.phone || ''}
                        onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                        className="w-full text-gray-900 bg-white px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                                          ) : (
                        <div 
                          className="text-gray-900 bg-gray-50 px-3 py-2 rounded border flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                          onDoubleClick={() => setIsEditing(true)}
                        >
                          <span>{editedLead?.contactInfo?.phone || 'N/A'}</span>
                          {editedLead?.contactInfo?.phone && (
                            <button className="text-green-600 hover:text-green-700 text-sm">
                              Call
                            </button>
                          )}
                        </div>
                      )}
                  </div>
                </div>

                {/* Location & Demographics */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2">Location & Demographics</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedLead?.contactInfo?.location || ''}
                        onChange={(e) => handleContactInfoChange('location', e.target.value)}
                        className="w-full text-gray-900 bg-white px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter location"
                      />
                    ) : (
                      <div 
                        className="text-gray-900 bg-gray-50 px-3 py-2 rounded border cursor-pointer hover:bg-gray-100 transition-colors"
                        onDoubleClick={() => setIsEditing(true)}
                      >
                        {editedLead?.contactInfo?.location || 'N/A'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    {isEditing ? (
                      <select
                        value={editedLead?.contactInfo?.timezone || ''}
                        onChange={(e) => handleContactInfoChange('timezone', e.target.value)}
                        className="w-full text-gray-900 bg-white px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select timezone</option>
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="Europe/London">London (GMT)</option>
                        <option value="Europe/Paris">Paris (CET)</option>
                        <option value="Asia/Tokyo">Tokyo (JST)</option>
                        <option value="Australia/Sydney">Sydney (AEST)</option>
                      </select>
                    ) : (
                      <div 
                        className="text-gray-900 bg-gray-50 px-3 py-2 rounded border cursor-pointer hover:bg-gray-100 transition-colors"
                        onDoubleClick={() => setIsEditing(true)}
                      >
                        {editedLead?.contactInfo?.timezone || 'N/A'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    {isEditing ? (
                      <select
                        value={editedLead?.contactInfo?.language || 'English'}
                        onChange={(e) => handleContactInfoChange('language', e.target.value)}
                        className="w-full text-gray-900 bg-white px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Japanese">Japanese</option>
                      </select>
                    ) : (
                      <div 
                        className="text-gray-900 bg-gray-50 px-3 py-2 rounded border cursor-pointer hover:bg-gray-100 transition-colors"
                        onDoubleClick={() => setIsEditing(true)}
                      >
                        {editedLead?.contactInfo?.language || 'English'}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedLead?.contactInfo?.dateOfBirth || ''}
                        onChange={(e) => handleContactInfoChange('dateOfBirth', e.target.value)}
                        className="w-full text-gray-900 bg-white px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    ) : (
                      <div 
                        className="text-gray-900 bg-gray-50 px-3 py-2 rounded border cursor-pointer hover:bg-gray-100 transition-colors"
                        onDoubleClick={() => setIsEditing(true)}
                      >
                        {editedLead?.contactInfo?.dateOfBirth || 'N/A'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Lead Information Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Lead Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead ID</label>
                  <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {lead.username}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lead Score</label>
                  <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {lead.leadScore}/100
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="bg-green-100 text-green-800 px-3 py-2 rounded border text-sm font-medium">
                    Active
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Created</label>
                  <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {lead.createdDate}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Activity</label>
                  <div className="text-gray-900 bg-gray-50 px-3 py-2 rounded border">
                    {lead.lastSeen}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media & Platform Info */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Social Media & Platforms</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-xs font-medium">YT</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">YouTube</div>
                      <div className="text-sm text-gray-600">@{lead.username}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Connected
                    </span>
                    <button className="text-green-600 hover:text-green-700 text-sm">
                      View Channel
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-medium">TW</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Twitter</div>
                      <div className="text-sm text-gray-600">Not connected</div>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-gray-700 text-sm">
                    Connect
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xs font-medium">LI</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">LinkedIn</div>
                      <div className="text-sm text-gray-600">Not connected</div>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-gray-700 text-sm">
                    Connect
                  </button>
                </div>
              </div>
            </div>

            {/* Tags & Notes */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2 mb-4">Tags & Notes</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {editedLead?.tags && editedLead.tags.length > 0 ? (
                      editedLead.tags.map((tag, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center">
                          {tag}
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 text-purple-600 hover:text-purple-800"
                            >
                              ×
                            </button>
                          )}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No tags added</span>
                    )}
                  </div>
                  {isEditing && (
                    <button 
                      onClick={handleAddTag}
                      className="mt-2 text-green-600 hover:text-green-700 text-sm"
                    >
                      + Add Tag
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  {isEditing ? (
                    <textarea
                      value={editedLead?.notes || ''}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Add notes about this lead..."
                    />
                  ) : (
                    <div 
                      className="bg-gray-50 border rounded p-3 min-h-[100px] cursor-pointer hover:bg-gray-100 transition-colors"
                      onDoubleClick={() => setIsEditing(true)}
                    >
                      {editedLead?.notes || (
                        <span className="text-gray-500 text-sm">No notes added</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Interests</h3>
            <p className="text-gray-500">Products tab content coming soon...</p>
          </div>
        )}

        {activeTab === 'conversations' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Conversations</h3>
            <p className="text-gray-500">Conversations tab content coming soon...</p>
          </div>
        )}
      </div>
    );
  };

  // Leads CRM page component
  const LeadsPage = () => {
    let allLeads = getAllLeads();
    
    // Apply filters
    if (filterIntent !== 'all') {
      allLeads = allLeads.filter(lead => lead.intent_level === filterIntent);
    }
    if (filterStatus !== 'all') {
      allLeads = allLeads.filter(lead => lead.status === filterStatus);
    }
    if (filterChannel !== 'all') {
      allLeads = allLeads.filter(lead => {
        const channelNames = ['Tech Reviews', 'Gaming Channel', 'Cooking Tips', 'Fitness Pro', 'Travel Vlogs'];
        const leadChannelIndex = Math.floor(Math.random() * 5); // This is a simplified approach since we're generating random channels
        return channelNames[leadChannelIndex] === filterChannel;
      });
    }
    if (filterLeadScore !== 'all') {
      allLeads = allLeads.filter(lead => {
        const score = lead.engagementScore;
        switch (filterLeadScore) {
          case 'high': return score >= 80;
          case 'medium': return score >= 40 && score < 80;
          case 'low': return score < 40;
          default: return true;
        }
      });
    }
    if (filterDateRange !== 'all') {
      allLeads = allLeads.filter(lead => {
        const leadDate = new Date(lead.timestamp);
        const now = new Date();
        const diffDays = Math.floor((now - leadDate) / (1000 * 60 * 60 * 24));
        
        switch (filterDateRange) {
          case 'today': return diffDays === 0;
          case 'week': return diffDays <= 7;
          case 'month': return diffDays <= 30;
          case 'quarter': return diffDays <= 90;
          default: return true;
        }
      });
    }
    
    // Apply sorting
    allLeads = [...allLeads].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.username.localeCompare(b.username);
        case 'lead_score':
          return b.engagementScore - a.engagementScore;
        case 'company':
          return a.username.localeCompare(b.username); // Using username as proxy for channel
        case 'date_created':
        default:
          return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });
    
    // If a lead is selected, show the detail page
    if (selectedLeadDetail) {
      return (
        <LeadDetailPage 
          lead={selectedLeadDetail} 
          onBack={() => setSelectedLeadDetail(null)}
        />
      );
    }
    
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
                         <div>
               <div className="flex items-center space-x-2">
                 <h1 className="text-2xl font-bold text-green-500">Leads</h1>
               </div>
               <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                 <span>{allLeads.length} Total</span>
                 <div className="relative dropdown-container">
                   <button 
                     onClick={() => setShowSortDropdown(!showSortDropdown)}
                     className="flex items-center space-x-1 hover:text-gray-800"
                   >
                     <span>Sort by: {sortBy === 'date_created' ? 'Date Created' : 
                                     sortBy === 'name' ? 'Name' : 
                                     sortBy === 'lead_score' ? 'Lead Score' : 
                                     sortBy === 'company' ? 'Channel' : 'Date Created'}</span>
                     <ChevronDown className="w-4 h-4" />
                   </button>
                   {showSortDropdown && (
                     <div className="absolute top-8 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                       <div className="py-1">
                         <button 
                           onClick={() => { setSortBy('date_created'); setShowSortDropdown(false); }}
                           className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                         >
                           Date Created
                         </button>
                         <button 
                           onClick={() => { setSortBy('name'); setShowSortDropdown(false); }}
                           className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                         >
                           Name
                         </button>
                         <button 
                           onClick={() => { setSortBy('lead_score'); setShowSortDropdown(false); }}
                           className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                         >
                           Lead Score
                         </button>
                         <button 
                           onClick={() => { setSortBy('company'); setShowSortDropdown(false); }}
                           className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                         >
                           Channel
                         </button>
                       </div>
                     </div>
                   )}
                 </div>
               </div>
             </div>
          </div>
                    <div className="flex items-center space-x-4">
            <div className="relative dropdown-container">
               <button 
                 onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
               >
                 <Filter className="w-4 h-4" />
                 <span>Filter</span>
               </button>
               {showFilterDropdown && (
                 <div className="absolute top-8 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-64">
                   <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Intent Level</label>
                       <select 
                         value={filterIntent} 
                         onChange={(e) => setFilterIntent(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                       >
                         <option value="all">All Intent Levels</option>
                         <option value="hot">Hot</option>
                         <option value="warm">Warm</option>
                         <option value="cold">Cold</option>
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                       <select 
                         value={filterStatus} 
                         onChange={(e) => setFilterStatus(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                       >
                         <option value="all">All Statuses</option>
                         <option value="converted">Converted</option>
                         <option value="contacted">Contacted</option>
                         <option value="not_contacted">Not Contacted</option>
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
                       <select 
                         value={filterChannel} 
                         onChange={(e) => setFilterChannel(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                       >
                         <option value="all">All Channels</option>
                         <option value="Tech Reviews">Tech Reviews</option>
                         <option value="Gaming Channel">Gaming Channel</option>
                         <option value="Cooking Tips">Cooking Tips</option>
                         <option value="Fitness Pro">Fitness Pro</option>
                         <option value="Travel Vlogs">Travel Vlogs</option>
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Lead Score</label>
                       <select 
                         value={filterLeadScore} 
                         onChange={(e) => setFilterLeadScore(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                       >
                         <option value="all">All Scores</option>
                         <option value="high">High (80+)</option>
                         <option value="medium">Medium (40-79)</option>
                         <option value="low">Low (0-39)</option>
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                       <select 
                         value={filterDateRange} 
                         onChange={(e) => setFilterDateRange(e.target.value)}
                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                       >
                         <option value="all">All Time</option>
                         <option value="today">Today</option>
                         <option value="week">Last 7 Days</option>
                         <option value="month">Last 30 Days</option>
                         <option value="quarter">Last 90 Days</option>
                       </select>
                     </div>
                     <div className="flex space-x-2 pt-2 border-t border-gray-200">
                       <button 
                         onClick={() => { 
                           setFilterIntent('all'); 
                           setFilterStatus('all'); 
                           setFilterChannel('all');
                           setFilterLeadScore('all');
                           setFilterDateRange('all');
                           setShowFilterDropdown(false); 
                         }}
                         className="flex-1 px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                       >
                         Clear All
                       </button>
                       <button 
                         onClick={() => setShowFilterDropdown(false)}
                         className="flex-1 px-3 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                       >
                         Apply
                       </button>
                     </div>
                   </div>
                 </div>
               )}
             </div>
                         <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center space-x-2">
               <Plus className="w-4 h-4" />
               <span>Add Lead</span>
             </button>
            <button className="w-8 h-8 flex items-center justify-center">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="flex items-center px-6 py-4">
              <div className="w-8 mr-4"></div>
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-700">USERNAME</span>
              </div>
              <div className="w-32">
                <span className="text-sm font-medium text-gray-700">CHANNEL</span>
              </div>
              <div className="w-32">
                <span className="text-sm font-medium text-gray-700">LEAD SCORE</span>
              </div>
              <div className="w-32">
                <span className="text-sm font-medium text-gray-700">PHONE</span>
              </div>
              <div className="w-40">
                <span className="text-sm font-medium text-gray-700">TAGS</span>
              </div>
              <div className="w-32">
                <span className="text-sm font-medium text-gray-700">CREATED DATE</span>
              </div>
              <div className="w-8 flex justify-center">
                <button className="w-8 h-8 flex items-center justify-center">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {allLeads.map((lead, index) => (
              <div 
                key={lead.id} 
                className="flex items-center px-6 py-4 hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => setSelectedLeadDetail(getLeadDetails(lead.username))}
              >
                                 <input type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded mr-4" />
                
                {/* Basic Info */}
                <div className="flex items-center space-x-3 flex-1">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm font-medium">
                          {lead.username.charAt(1).toUpperCase()}
                        </span>
                      </div>
                  <div>
                    <div className="font-medium text-gray-900">{lead.username}</div>
                    <div className="text-sm text-gray-500">{lead.contactInfo?.email || 'N/A'}</div>
                  </div>
                </div>

                                      {/* Channel */}
                      <div className="w-32 text-sm text-gray-900">
                        {['Tech Reviews', 'Gaming Channel', 'Cooking Tips', 'Fitness Pro', 'Travel Vlogs'][Math.floor(Math.random() * 5)]}
                      </div>

                {/* Lead Score */}
                <div className="w-32 text-sm font-medium text-gray-900">
                  {lead.engagementScore}
                </div>

                {/* Phone */}
                <div className="w-32 text-sm text-gray-900">
                  {lead.contactInfo?.phone || 'N/A'}
                </div>

                                      {/* Tags */}
                      <div className="w-40">
                        <div className="flex flex-wrap gap-1">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {['test tag', 'another tag', 'something tag', 'hot lead', 'engaged'][Math.floor(Math.random() * 5)]}
                          </span>
                                                     {Math.random() > 0.5 && (
                             <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                               {['vip', 'prospect', 'qualified', 'new'][Math.floor(Math.random() * 4)]}
                             </span>
                           )}
                          {Math.random() > 0.7 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              ...
                            </span>
                          )}
                        </div>
                      </div>

                                      {/* Created Date */}
                      <div className="w-32 text-sm text-gray-500">
                        {['22 Oct 2016', '16 Oct 2016', '15 Oct 2016', '14 Oct 2016', '13 Oct 2016'][Math.floor(Math.random() * 5)]}
                      </div>

                {/* Actions */}
                <div className="w-8 flex justify-center">
                  <button className="w-8 h-8 flex items-center justify-center">
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Settings page component
  const SettingsPage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account, billing, and integrations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="card">
            <nav className="space-y-1">
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                <User className="w-4 h-4 mr-3" />
                Profile
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                <CreditCard className="w-4 h-4 mr-3" />
                Billing
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                <Zap className="w-4 h-4 mr-3" />
                Integrations
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                <Shield className="w-4 h-4 mr-3" />
                Security
              </button>
              <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                <Bell className="w-4 h-4 mr-3" />
                Notifications
              </button>
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
              <button className="text-youtube-red hover:text-red-700 text-sm font-medium">
                <Edit className="w-4 h-4 inline mr-1" />
                Edit
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-youtube-red rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-medium">
                      {currentUser?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <button className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{currentUser?.name || 'User Name'}</h3>
                  <p className="text-gray-500">{currentUser?.email || 'user@example.com'}</p>
                  <p className="text-sm text-gray-400">Member since January 2024</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.name || 'User Name'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={currentUser?.email || 'user@example.com'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    defaultValue="TechReviewChannel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    defaultValue="https://youtube.com/@TechReviewChannel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-youtube-red"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Billing Section */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Starter Plan</h3>
                  <p className="text-sm text-gray-500">$29/month • 1,000 leads, unlimited videos</p>
                </div>
                <button className="btn-secondary text-sm">
                  Change Plan
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Payment Method</h4>
                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <CreditCard className="w-6 h-6 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Billing History</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>January 2024</span>
                      <span className="font-medium">$29.00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>December 2023</span>
                      <span className="font-medium">$29.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integrations Section */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Integrations</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Youtube className="w-8 h-8 text-youtube-red" />
                  <div>
                    <h3 className="font-medium text-gray-900">YouTube</h3>
                    <p className="text-sm text-gray-500">Connected to TechReviewChannel</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Connected
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">IG</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Instagram</h3>
                    <p className="text-sm text-gray-500">Coming soon</p>
                  </div>
                </div>
                <button className="text-gray-400" disabled>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">TT</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">TikTok</h3>
                    <p className="text-sm text-gray-500">Coming soon</p>
                  </div>
                </div>
                <button className="text-gray-400" disabled>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">FB</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Facebook</h3>
                    <p className="text-sm text-gray-500">Coming soon</p>
                  </div>
                </div>
                <button className="text-gray-400" disabled>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );



    // Main dashboard
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden lg:block w-64 bg-gray-900">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 h-full w-64 bg-gray-900">
            <Sidebar />
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">C</span>
                </div>
                <h1 className="text-xl font-bold ml-3 text-gray-900">Comvert</h1>
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
              <button onClick={exportToCSV} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ROI Banner */}
        <div className="bg-gradient-to-r from-green-500 to-purple-600 text-white p-6 sticky top-16 z-20">
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

        {/* Page Content */}
        {currentPage === 'dashboard' ? (
          <div className="max-w-7xl mx-auto px-6 py-8 bg-gray-50">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
                          <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hot Leads Today</p>
              <p className="text-2xl font-bold text-orange-600">{analytics.hot_leads}</p>
            </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
                          <div className="p-2 bg-purple-100 rounded-lg">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Interested</p>
              <p className="text-2xl font-bold text-purple-600">{analytics.warm_leads}</p>
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-wrap items-center space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Show All
              </button>
              <button
                onClick={() => setFilter('hot')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'hot' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔥 Hot Leads Only
              </button>
              <button
                onClick={() => setFilter('warm')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'warm' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🤔 Warm Leads
              </button>
              <button
                onClick={() => setFilter('cold')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'cold' ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Comments List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">YouTube Comments</h2>
              
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
                              onClick={() => markAsPurchased(comment.id)}
                              className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-lg"
                            >
                              💰 Convert to Sale
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center text-gray-500">
                <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Click on a username to view lead details</p>
              </div>
            )}
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-900">Revenue Analytics</h2>
            
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
        ) : currentPage === 'leads' ? (
          <LeadsPage />
        ) : (
          <SettingsPage />
        )}
      </div>
    </div>
  );
};

export default App;
