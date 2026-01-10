import styles from "./EmpDocuments.module.css"
import DocumentsLeftSide from "./DocumentsLeftSide";
import DocumentsRightSide from "./DocumentsRightSide";
const EmpDocuments = ({ employeeId }) => {
    return (
        <>
            <div className={styles.documentsTabContainer}>
                <div className={styles.documentsTabLeftSide}>
                    <DocumentsLeftSide />
                </div>
                <div className={styles.documentsTabRightSide}>
                    <DocumentsRightSide employeeId={employeeId} />
                </div>
            </div>
        </>
    )
}
 
export default EmpDocuments;