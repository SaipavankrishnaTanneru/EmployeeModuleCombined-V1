import React, { useRef, useEffect } from 'react';
import styles from './AgreementDocumentModal.module.css';
import { ReactComponent as UploadIcon } from '../../../../../assets/Employee_asserts/Qualification/UploadCard.svg';
import { ReactComponent as DocIcon } from '../../../../../assets/Employee_asserts/Qualification/DocIcon.svg';
import popupDocIcon from '../../../../../assets/Employee_asserts/EmployeeOnBoarding/popupDocIcon.svg';
import CloseIcon from '../../../../../assets/Employee_asserts/EmployeeOnBoarding/closeicon.svg';


// --- MOCK UPLOAD FUNCTION ---
const mockUpload = (file) => {
    // 1. Sanitize filename (replace spaces with underscores)
    const safeName = file.name.replace(/\s+/g, "_");

    // 2. Generate the URL based on your example
    const fakeUrl = `https://cdn.varsity123.com/docs/${safeName}`;

    return {
        name: file.name,
        size: file.size,
        type: file.type,
        url: fakeUrl // <--- This is what gets sent to API as 'docPath'
    };
};

const DocumentCard = ({ docType, files, hasFiles, onFileUpload, onRemoveFile }) => {
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className={styles.documentCard}>
            <div className={styles.cardHeader}>
                <DocIcon />
                <h4 className={styles.cardTitle}>{docType.title}</h4>
            </div>
            {hasFiles && (
                <div className={styles.fileList}>
                    {files.map((file, index) => (
                        <div key={index} className={styles.fileItem}>
                            <span className={styles.fileName}>{file.name}</span>
                            <button
                                className={styles.removeFileBtn}
                                onClick={() => onRemoveFile(docType.id, index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.cardFooter}>
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        onFileUpload(docType.id, e.target.files);
                        e.target.value = '';
                    }}
                />
                {hasFiles ? (
                    <button
                        className={styles.reUploadButton}
                        onClick={handleClick}
                    >
                        <UploadIcon /> Re-Upload
                    </button>
                ) : (
                    <button
                        className={styles.uploadButton}
                        onClick={handleClick}
                    >
                        <UploadIcon /> Upload
                    </button>
                )}
            </div>
        </div>
    );
};

const AgreementDocumentModal = ({ isOpen, onClose, title, subtitle, documentTypes, documents, onDocumentsChange }) => {
    const contentRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e) => {
            if (contentRef.current && !contentRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Default docs if none provided, though prop should usually be passed
    const docTypes = documentTypes || [
        { id: 'agreementDoc', title: 'Agreement Document' }
    ];

    const handleFileUpload = (docType, fileList) => {
        if (!fileList || fileList.length === 0) return;

        // Convert FileList to Array and "Upload" them to get the varsify URL
        const newFiles = Array.from(fileList).map(file => mockUpload(file));

        const existingFiles = documents[docType] || [];

        onDocumentsChange({
            ...documents,
            [docType]: [...existingFiles, ...newFiles],
        });
    };

    const handleRemoveFile = (docType, fileIndex) => {
        const existingFiles = documents[docType] || [];
        const updatedFiles = existingFiles.filter((_, index) => index !== fileIndex);

        onDocumentsChange({
            ...documents,
            [docType]: updatedFiles,
        });
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={contentRef}>
                <div className={styles.modalHeader}>
                    <div>
                        <img src={popupDocIcon} alt="popupDocIcon" />
                        <h3 className={styles.modalTitle}>{title || 'Document Upload'}</h3>
                        <p className={styles.modalSubtitle}>{subtitle || 'Upload Documents'}</p>
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>
                        <img src={CloseIcon} alt="closeIcon" />
                    </button>
                </div>

                <div className={styles.documentGrid}>
                    {docTypes.map((docType) => {
                        const files = documents[docType.id] || [];
                        const hasFiles = files.length > 0;

                        return (
                            <DocumentCard
                                key={docType.id}
                                docType={docType}
                                files={files}
                                hasFiles={hasFiles}
                                onFileUpload={handleFileUpload}
                                onRemoveFile={handleRemoveFile}
                            />
                        );
                    })}
                </div>

                <div className={styles.modalFooter}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={styles.uploadMoreButton} onClick={onClose}>
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgreementDocumentModal;
