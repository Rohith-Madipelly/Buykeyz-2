import AccountSetupPersonal from "./Screens/AccountSetupPersonal";
import AgreementSetup from "./Screens/AgreementSetup";
import BankDetails from "./Screens/BankDetails";
import Electricitybill from "./Screens/Electricitybill";
import PanNumber from "./Screens/PanNumber";


export default SETUP_PROGRESS = [
    {
        name: 'Enter Personal Details',
        component: () => <AccountSetupPersonal />
    },
    {
        name: 'Enter Personal Details',
        component: () => <AccountSetupPersonal />
    },
    {
        name: 'PAN Number',
        component: () => <PanNumber />
    },
    {
        name: 'PAN Number',
        component: () => <PanNumber />
    },
    {
        name: 'Bank details',
        component: () => <BankDetails />
    },
    {
        name: 'Bank details',
        component: () => <BankDetails />
    },
    {
        name: 'upload Electricity Bill',
        component: () => <Electricitybill />
    },
    {
        name: 'upload Electricity Bill',
        component: () => <Electricitybill />
    },
    {
        name: 'Agreement',
        // component :()=><Text>Hello Step 9 Bank details</Text>
        component: () => <AgreementSetup />
    },
    {
        name: 'Agreement',
        // component :()=><Text>Hello Step 9 Bank details</Text>
        component: () => <AgreementSetup />
    },
]