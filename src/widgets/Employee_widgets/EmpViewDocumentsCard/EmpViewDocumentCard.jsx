import styles from "./EmpViewDocumentCard.module.css"
import documentcardicon from "../../../assets/Employee_asserts/EmployeeQu/documentcardicon.svg"
import righticon from "../../../assets/Employee_asserts/EmployeeQu/righticonsvg.svg"
import greendot from "../../../assets/Employee_asserts/EmployeeQu/greendotsvg.svg";
import downloadicon from "../../../assets/Employee_asserts/EmployeeQu/downloadblueicon.svg"

const EmpViewDocumentCard = ({ heading, updatedDate }) => {
    return (
        <div className={styles.empViewDocumentCard}>
            <div className={styles.documentCardTop}>
                <div className={styles.documentCardIconHeading}>
                    <figure>
                        <img src={documentcardicon} alt="Document Card Icon" />
                    </figure>
                    <p className={styles.documentCardHeading}>{heading}</p>
                </div>
                <div className={styles.documentCardLastViewOpenButton}>
                    <div className={styles.documentCardLastView}>
                        <p className={styles.lastViewHeading}>Last Updated On:</p>
                        <p className={styles.lastViewValue}>{updatedDate}</p>
                    </div>
                    <div className={styles.documentCardOpenButton}>
                        <button>Open <img src={righticon} alt="right_icon" /></button>
                    </div>
                </div>
            </div>
            <div className={styles.documentcardbottom}>
                <div className={styles.documentStatus}>
                    <img src={greendot} alt="success" />
                    <p>Verified</p>
                </div>
                <img src={downloadicon} alt="downloadIcon" />
            </div>
        </div>
    )
}

export default EmpViewDocumentCard