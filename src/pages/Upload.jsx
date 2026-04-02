import { useState } from 'react';
import { Upload as UploadIcon, FileUp, Info, CheckCircle, X } from 'lucide-react';
import './Upload.css';

const Upload = () => {
  const [fileType, setFileType] = useState('notes');
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="upload-page container">
      <h1 className="heading-two-tone">
        Upload <span className="highlight">Resources</span>
      </h1>
      <p className="page-subtitle">
        Share your knowledge with fellow students
      </p>

      {/* Coming Soon Banner */}
      <div className="blurb-card coming-soon-banner">
        <Info size={24} className="info-icon" />
        <div>
          <strong>File Upload Coming Soon</strong>
          <p>
            We're working on a secure file upload system. For now, please use our 
            Google Form to submit resources. You'll be credited for your contributions!
          </p>
        </div>
      </div>

      {/* Mock Upload Form */}
      <div className="card upload-form">
        <h2 style={{ marginBottom: '1.5rem' }}>Resource Details</h2>

        {/* File Type Selector */}
        <div className="form-group">
          <label>Resource Type</label>
          <div className="semester-tabs file-type-selector">
            <button 
              className={`sem-tab ${fileType === 'notes' ? 'active' : ''}`}
              onClick={() => setFileType('notes')}
            >
              Notes
            </button>
            <button 
              className={`sem-tab ${fileType === 'pyq' ? 'active' : ''}`}
              onClick={() => setFileType('pyq')}
            >
              PYQ
            </button>
            <button 
              className={`sem-tab ${fileType === 'other' ? 'active' : ''}`}
              onClick={() => setFileType('other')}
            >
              Other
            </button>
          </div>
        </div>

        {/* Subject & Semester Selectors */}
        <div className="form-selectors">
          <div className="form-group">
            <label>Select Subject</label>
            <select className="branch-select" disabled>
              <option value="">Choose a subject...</option>
              <option value="physics">Physics</option>
              <option value="mathematics">Mathematics</option>
              <option value="programming">Programming</option>
            </select>
          </div>

          <div className="form-group">
            <label>Select Semester</label>
            <select className="branch-select" disabled>
              <option value="">Choose semester...</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
            </select>
          </div>
        </div>

        {/* Drag & Drop Zone */}
        <div 
          className={`dropzone ${isDragging ? 'dragging' : ''}`}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
        >
          <UploadIcon size={48} className="dropzone-icon" />
          <div className="dropzone-text">
            <strong>Drag files here or click to browse</strong>
            <p>Accepted formats: PDF, DOC, DOCX, PPT, PPTX (Max 10MB)</p>
          </div>
        </div>

        {/* Submit Button (Disabled) */}
        <button className="btn-primary submit-btn" disabled>
          <CheckCircle size={18} />
          Upload Resource (Coming Soon)
        </button>
      </div>

      {/* Alternative CTA */}
      <div className="alternative-cta">
        <p>Need to upload resources right now?</p>
        <a 
          href="https://forms.gle/5GZdMcTCzEo92fz28" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          Use Google Form Instead
        </a>
      </div>
    </div>
  );
};

export default Upload;
