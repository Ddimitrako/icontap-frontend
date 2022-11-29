import React from "react";
import { showInsights } from 'Helpers/App';
import {Icon} from "@chakra-ui/react";
import {
    MdDashboard,
    MdLock,
    MdOutlineShoppingCart,
    MdHome,
    MdHistoryToggleOff,
    MdPerson,
    MdCreditCard,
    MdSupervisorAccount,
    MdOutlineAppRegistration,
    MdInsights,
} from "react-icons/md";
import { AiOutlineIdcard,AiOutlineUser,AiOutlineTeam,AiTwotoneSetting, AiFillProfile, AiFillIdcard } from "react-icons/ai";
// Admin Imports
import DashboardsDefault from "views/admin/dashboards/default";

// NFT Imports

import NFTPage from "views/admin/cards/cardProfile";

import NFTProfile from "views/admin/cards/cardsList";

// Main Imports
import AccountBilling from "views/admin/main/account/billing";
import AccountApplications from "views/admin/main/account/application";
import AccountInvoice from "views/admin/main/account/invoice";
import AccountSettings from "views/admin/main/account/settings";
import AccountAllCourses from "views/admin/main/account/courses";
import AccountCoursePage from "views/admin/main/account/coursePage";

import UserNew from "views/admin/main/users/newUser";
import AdminUsersOverview from "views/admin/main/users/adminOverview";
import CompanyUsersOverview from "views/admin/main/users/companyOverview";
import UsersReports from "views/admin/main/users/reports";

import ProfileSettings from "views/admin/main/profile/settings";
import ProfileOverview from "views/admin/main/profile/overview";

import ApplicationsDataTables from "views/admin/main/applications/dataTables";
import ApplicationsCalendar from "views/admin/main/applications/calendar";

import EcommerceNewProduct from "views/admin/main/ecommerce/newProduct";
import EcommerceProductSettings from "views/admin/main/ecommerce/settingsProduct";
import EcommerceProductPage from "views/admin/main/ecommerce/pageProduct";
import EcommerceOrderList from "views/admin/main/ecommerce/orderList";
import EcommerceOrderDetails from "views/admin/main/ecommerce/orderDetails";
import EcommerceReferrals from "views/admin/main/ecommerce/referrals";

// Others
import OthersNotifications from "views/admin/main/others/notifications";
import OthersPricing from "views/admin/main/others/pricing";
import OthersError from "views/admin/main/others/404";

// Auth Imports

import ForgotPasswordDefault from "views/auth/forgotPassword/ForgotPasswordDefault.jsx";

import LockDefault from "views/auth/lock/LockDefault.jsx";
import SignInDefault from "views/auth/signIn/SignInDefault.jsx";
import SignUpDefault from "views/auth/signUp/SignUpDefault.jsx";

import VerificationDefault from "views/auth/verification/VerificationDefault.jsx";
import Page from "views/admin/cards/cardProfile";
import LogoutMid from "layouts/admin/Logout";
import { NeedsEmailVerification } from "Helpers/Auth";
import EditSocials from "views/admin/dashboards/editSocials/EditSocials";

const routes = [
    // --- Dashboards ---
    {
        name: "Insights",
        layout: "/u",
        path: "/dashboards/default",
        icon: <Icon as={MdInsights} width='20px' height='20px' color='inherit'/>,
        component: DashboardsDefault,
        role:'admin',
        show:showInsights,
    },
    // --- NFTs ---
    {
        name: "Cards",
        layout: "/u",
        path: "/cardsList/card/:userId",
        component: NFTProfile,
        secondary: true,
        icon: (
            <Icon
                as={AiFillIdcard}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        onlyRoute:true,
        role:'admin',
        company_role:'admin',
        show:true,
    },
    {
        name: "Cards",
        layout: "/u",
        path: "/cardsList/card/",
        component: NFTProfile,
        secondary: true,
        icon: (
            <Icon
                as={AiFillIdcard}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        show:true,

    },
    {
        name: "Admin Page",
        layout: "/u",
        path: "/main/users/admin-overview",

        component: AdminUsersOverview,
        icon: (
            <Icon
                as={MdSupervisorAccount}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        role:'admin',
        show:true,
    },
    {
        name: "Users Overview",
        layout: "/u",
        path: "/main/users/users-overview",

        component: CompanyUsersOverview,
        icon: (
            <Icon
                as={MdSupervisorAccount}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        company_role:'admin',
        show:true,
    },
    {
        name: "Edit Socials",
        layout: "/u",
        path: "/main/edit-socials",

        component: EditSocials,
        icon: (
            <Icon
                as={MdOutlineAppRegistration}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        role:'admin',
        show:true,
    },
    {
        name: "Edit Card",
        layout: "/u",
        path: "/cards/edit/:cardId",
        component: Page,
        onlyRoute:true,
        show:true,

    },
    {
        name: "logout",
        layout: "/u",
        path: "/logout",
        component: LogoutMid,
        onlyRoute:true,
        show:true,

    },
    {
        name: "Profile",
        layout: "/u",
        path: "/main/profile/settings",
        exact: false,
        component: ProfileSettings,
        icon: (
            <Icon
                as={AiOutlineUser}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        onlyRoute:false,
        show:true,


    },
    {
        name: "Email Verification",
        layout: "/u",
        path: "/email/verification",
        exact: false,
        component: NeedsEmailVerification,
        icon: (
            <Icon
                as={AiOutlineUser}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        onlyRoute:true,
        show:true,

    },
    // {
    //     name: "Card Settings",
    //     layout: "/u",
    //     path: "/cards/cardProfile",
    //     component: NFTPage,
    //     secondary: true,
    //     icon: (
    //         <Icon
    //             as={AiTwotoneSetting}
    //             width='20px'
    //             height='20px'
    //             color='inherit'
    //         />
    //     ),
    //   },
    // --- Main pages ---


    // {
    //     name: "New User",
    //     layout: "/u",
    //     path: "/main/users/new-user",
    //
    //     component: UserNew,
    //     icon: (
    //         <Icon
    //             as={MdHome}
    //             width='20px'
    //             height='20px'
    //             color='inherit'
    //         />
    //     ),
    // },
    

    // {
    //   name: "Applications",
    //   path: "/main/applications",
    //   collapse: true,
    //   items: [
    //     // {
    //     //   name: "Kanban",
    //     //   layout: "/u",
    //     //   path: "/main/applications/kanban",
    //     //   exact: false,
    //     //   component: ApplicationsKanban,
    //     // },
    //     {
    //       name: "Data Tables",
    //       layout: "/u",
    //       path: "/main/applications/data-tables",
    //       exact: false,
    //       component: ApplicationsDataTables,
    //     },
    //     {
    //       name: "Calendar",
    //       layout: "/u",
    //       path: "/main/applications/calendar",
    //       exact: false,
    //       component: ApplicationsCalendar,
    //     },
    //   ],
    // },
    // {
    //     name: "Profile Overview",
    //     layout: "/u",
    //     path: "/main/profile/overview",
    //     exact: false,
    //     component: ProfileOverview,
    //     icon: (
    //         <Icon
    //             as={MdHome}
    //             width='20px'
    //             height='20px'
    //             color='inherit'
    //         />
    //     ),
    // },
    
    // {
    //   name: "News Feed",
    //   layout: "/u",
    //   path: "/main/profile/newsfeed",
    //   exact: false,
    //   component: ProfileNewsfeed,
    // },

    // {
    //     name: "Others",
    //     path: "/main/others",
    //     collapse: true,
    //     items: [
    //         {
    //             name: "Notifications",
    //             layout: "/u",
    //             path: "/main/others/notifications",
    //             exact: false,
    //             component: OthersNotifications,
    //         },
    //         // {
    //         //   name: "Pricing",
    //         //   layout: "/auth",
    //         //   path: "/main/others/pricing",
    //         //   exact: false,
    //         //   component: OthersPricing,
    //         // },
    //         {
    //             name: "404",
    //             layout: "/u",
    //             path: "/main/others/404",
    //             exact: false,
    //             component: OthersError,
    //         },
    //     ],

    // },
    // --- Authentication ---


    // {
    //     layout: "/auth",
    //     name: "Sign In",
    //     path: "/sign-in",
    //     icon: (
    //         <Icon
    //             as={MdHome}
    //             width='20px'
    //             height='20px'
    //             color='inherit'
    //         />
    //     ),
    //     component: SignInDefault,
    // },
    // {
    //   name: "Centered",
    //   layout: "/auth",
    //   path: "/sign-in/centered",
    //   icon: (
    //     <Icon as={MdHome} width='16px' height='16px' color='inherit' />
    //   ),
    //   component: SignInCentered,
    // },

    // --- Sign Up ---

    // {
    //     name: "Sign Up",
    //     path: "/sign-up",
    //     layout: "/auth",

    //     icon: (
    //         <Icon
    //             as={MdHome}
    //             width='20px'
    //             height='20px'
    //             color='inherit'
    //         />
    //     ),
    //     component: SignUpDefault,
    // },
    // {
    //   name: "Centered",
    //   layout: "/auth",
    //   path: "/sign-up/centered",
    //   icon: (
    //     <Icon as={MdHome} width='16px' height='16px' color='inherit' />
    //   ),
    //   component: SignUpCentered,
    // },


    // --- Verification ---
    // {
    //   name: "Verification",
    //   path: "/verification",
    //   collapse: true,
    //   items: [
    //     {
    //       name: "Default",
    //       layout: "/auth",
    //       path: "/verification/default",
    //       icon: (
    //         <Icon as={MdHome} width='16px' height='16px' color='inherit' />
    //       ),
    //       component: VerificationDefault,
    //     },
    //     // {
    //     //   name: "Centered",
    //     //   layout: "/auth",
    //     //   path: "/verification/centered",
    //     //   icon: (
    //     //     <Icon as={MdHome} width='16px' height='16px' color='inherit' />
    //     //   ),
    //     //   component: VerificationCentered,
    //     // },
    //   ],
    // },
    // --- Lock ---
    // {

    //     name: "Lock",
    //     path: "/lock",
    //     layout: "/auth",

    //     icon: (
    //         <Icon
    //             as={MdHome}
    //             width='20px'
    //             height='20px'
    //             color='inherit'
    //         />
    //     ),
    //     component: LockDefault,
    // },
    // {
    //   name: "Centered",
    //   layout: "/auth",
    //   path: "/lock/centered",
    //   icon: (
    //     <Icon as={MdHome} width='16px' height='16px' color='inherit' />
    //   ),
    //   component: LockCentered,
    // },

    // --- Forgot Password ---
    // {

    //     name: "Forgot Password",
    //     path: "/forgot-password",
    //     layout: "/auth",
    //     icon: (
    //         <Icon
    //             as={MdHome}
    //             width='20px'
    //             height='20px'
    //             color='inherit'
    //         />
    //     ),
    //     component: ForgotPasswordDefault,
    // },
    // {
    //   name: "Centered",
    //   layout: "/auth",
    //   path: "/forgot-password/centered",
    //   icon: (
    //     <Icon as={MdHome} width='16px' height='16px' color='inherit' />
    //   ),
    //   component: ForgotPasswordCentered,
    // },


];

export default routes;
