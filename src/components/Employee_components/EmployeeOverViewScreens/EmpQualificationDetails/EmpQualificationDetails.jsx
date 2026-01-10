import styles from "./EmpQualificationDetails.module.css"
import QualificationLeftSide from "./QualificationLeftSide"
import QualificationRightSideInfo from "./QualificationRightSideInfo"


const EmpQualificationDetails = ({ employeeId }) => {
    return (
        <>
            <div className={styles.qualificationTabLeftSide}>
                <QualificationLeftSide employeeId={employeeId} />
            </div>
            {/* <div className={styles.qualificationTabRightSide}>
            <QualificationRightSideInfo/>
        </div> */}
        </>
    )
}

export default EmpQualificationDetails;