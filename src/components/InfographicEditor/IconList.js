/**
 * This file defines the set of avaliable icons in Florence's UI.
 * 
 * To add new icons, search the for the necessary icons on FontAwesome's 
 * website and add them to the import statement starting on line 8. NOTE that 
 * this only imports solid icons, other styles require additional import 
 * statements. After the icons are imported, add them to ICON_LIST.
 * 
 * NOTE that the order they appear in ICON_LIST defines the order they will 
 * appear in Florence's UI.
 */

import { faAmbulance, faBrain, faCapsules, faFirstAid, faHeart, faHeartbeat, 
    faHospital, faLungs, faLungsVirus, faMedkit, faPills, faPrescription, 
    faPrescriptionBottle, faStethoscope, faSyringe, faUserMd, faWheelchair, 
    faFemale, } from '@fortawesome/free-solid-svg-icons';

const ICON_LIST = [faAmbulance, faHeart, faHeartbeat, faHospital, faMedkit,
    faPrescription, faPrescriptionBottle, faStethoscope, faUserMd, 
    faWheelchair, faBrain, faCapsules, faFirstAid, faLungs, faLungsVirus
    , faPills, faSyringe, faFemale];

export default ICON_LIST;