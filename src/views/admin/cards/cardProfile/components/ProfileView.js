import React from 'react';
import CityProfileLayout from './layouts/CityProfileLayout';
import DefaultLayout from './layouts/DefaultLayout';
import ContactCardLayout from './layouts/ContactCardLayout';
import EditorialLayout from './layouts/EditorialLayout';
import ExecutiveLayout from './layouts/ExecutiveLayout';
import IdentityLayout from './layouts/IdentityLayout';
import MinimalLayout from './layouts/MinimalLayout';
import SpotlightLayout from './layouts/SpotlightLayout';
import { resolveCardLayoutKey } from './layouts/layoutUtils';

const layoutComponents = {
    default: DefaultLayout,
    minimal: MinimalLayout,
    spotlight: SpotlightLayout,
    executive: ExecutiveLayout,
    editorial: EditorialLayout,
    identity: IdentityLayout,
    "contact-card": ContactCardLayout,
    "city-profile": CityProfileLayout,
};

const ProfileView = (props) => {
    if (!props?.card?.profile) {
        return <></>;
    }

    const layoutKey = resolveCardLayoutKey(props.card);
    const LayoutComponent = layoutComponents[layoutKey] ?? DefaultLayout;

    return <LayoutComponent {...props} />;
};

export default ProfileView;
