import React from "react";
import { showInsights } from 'Helpers/App';
import {AccordionItem, Icon} from "@chakra-ui/react";
import {
    MdSupervisorAccount,
    MdOutlineAppRegistration,
    MdInsights,
} from "react-icons/md";
import { AiOutlineUser, AiFillIdcard, AiTwotoneInfoCircle } from "react-icons/ai";
// Admin Imports
import DashboardsDefault from "views/admin/dashboards/default";
import NFTProfile from "views/admin/cards/cardsList";
import AdminUsersOverview from "views/admin/main/users/adminOverview";
import CompanyUsersOverview from "views/admin/main/users/companyOverview";
import ProfileSettings from "views/admin/main/profile/settings";
import Page from "views/admin/cards/cardProfile";
import LogoutMid from "layouts/admin/Logout";
import { NeedsEmailVerification } from "Helpers/Auth";
import EditSocials from "views/admin/dashboards/editSocials/EditSocials";

const routes = [
    {
        name: "Insights",
        layout: "/u",
        path: "/dashboards/default",
        icon: <Icon as={MdInsights} width='20px' height='20px' color='inherit'/>,
        component: DashboardsDefault,
        role:'admin',
        show:showInsights,
    },
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
        name: "Admin",
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
        name: "Socials",
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
        onlyRoute: true,
        show: true,

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
    {
        name: "FAQs",
        layout: "/u",
        path: "/main/help/faq",
        exact: false,
        component: AccordionItem,
        icon: (
            <Icon
                as={AiTwotoneInfoCircle}
                width='20px'
                height='20px'
                color='inherit'
            />
        ),
        onlyRoute:false,
        show: false,
    },
];

export default routes;
