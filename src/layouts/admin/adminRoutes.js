import { Icon } from "@chakra-ui/react";
import { AiOutlineIdcard } from "react-icons/ai";
import LogoutMid from "./Logout";

const { default: Page } = require("views/admin/cards/cardProfile");

const adminRoutes=[
    {
        name: "Edit Card",
        layout: "/admin",
        path: "/cards/cardProfile",
        component: Page,
        onlyRoute:true

    },
    {
        name: "logout",
        layout: "/admin",
        path: "/logout",
        component: LogoutMid,
        onlyRoute:true

    },
]

export default adminRoutes;