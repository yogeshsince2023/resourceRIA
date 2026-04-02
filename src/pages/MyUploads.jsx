import { useState } from 'react';
import { FolderOpen, FileText, Clock, CheckCircle, Upload, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MyUploads.css';

const MyUploads = () => {
  const [showSample, setShowSample] = useState(false);

  // Sample upload data
  const sampleUploads = [
    {
      id: 1,
      name: "Physics_Unit1_Notes.pdf",
      subject: "Physics - Semester 1",
      date: "2024-01-15",
      status: "approved"
    },
    {
      id: 2,
      name: "Mathematics_PYQ_2023.pdf",
      subject: "Mathematics-II - Semester 2",
      date: "2024-01-10",
      status: "pending"
    },
    {
      id: 3,
      name: "DSA_Slides_Chapter3.pptx",
      subject: "Data Structures - Semester 3",
      date: "2024-01-08",
      status: "approved"
    }
  ];

  return (
    <div className="my-uploads-page container">
      <h1 className="heading-two-tone">
        My <span className="highlight">Uploads</span>
      </h1>
      <p className="page-subtitle">
        Track and manage your contributed resources
      </p>

      {/* View Toggle */}
      <div className="view-toggle-container">
        <button 
          className={`toggle-btn ${!showSample ? 'active' : ''}`}
          onClick={() => setShowSample(false)}
        >
          <FolderOpen size={18} />
          Empty State
        </button>
        <button 
          className={`toggle-btn ${showSample ? 'active' : ''}`}
          onClick={() => setShowSample(true)}
        >
          <FileText size={18} />
          Sample View
        </button>
      </div>

      {!showSample ? (
        /* Empty State */
        <div className="empty-state card">
          <FolderOpen size={64} className="empty-state-icon" />
          <h2>No uploads yet</h2>
          <p>
            You haven't uploaded any resources yet. Start contributing and help 
            fellow students by sharing your notes, PYQs, and study materials!
          </p>
          <Link to="/upload" className="btn-primary">
            <Upload size={18} />
            Upload Your First Resource
          </Link>
        </div>
      ) : (
        /* Sample Uploads List */
        <div className="sample-uploads-list">
          {sampleUploads.map((upload) => (
            <div key={upload.id} className="card upload-item">
              <FileText size={32} className="file-icon" />
              
              <div className="upload-meta">
                <h3 className="upload-filename">{upload.name}</h3>
                <div className="upload-details">
                  <span className="upload-subject">{upload.subject}</span>
                  <span className="upload-date">
                    <Clock size={14} />
                    {new Date(upload.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>

              <div className={`status-badge status-${upload.status}`}>
                {upload.status === 'approved' && <CheckCircle size={14} />}
                {upload.status === 'pending' && <Clock size={14} />}
                {upload.status === 'approved' ? 'Approved' : 'Pending Review'}
              </div>

              <button className="icon-btn view-btn" title="View details">
                <ArrowRight size={18} />
              </button>
            </div>
          ))}

          <div className="sample-notice">
            <InfoIcon />
            <p>This is a preview with sample data. Real uploads will appear here once the feature is live.</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple info icon component
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export default MyUploads;
