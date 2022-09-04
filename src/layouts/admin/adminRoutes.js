import { Icon } from "@chakra-ui/react";
import { AiOutlineIdcard } from "react-icons/ai";

const { default: Page } = require("views/admin/cards/cardProfile");

const adminRoutes=[
    {
        name: "Edit Card",
        layout: "/admin",
        path: "/cards/cardProfile",
        component: Page,
        onlyRoute:true

    },
]

export default adminRoutes;