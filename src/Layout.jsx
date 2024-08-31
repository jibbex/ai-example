import { Helmet } from "react-helmet";
import { metadata } from "content";
import React from "react";
import { Script } from "vm";

const META_LEN = metadata.values().size();

function Title(children) {
    return <Title>{children}</Title>;
}

function Meta(props) {
    return <Meta { ...props } />;
}

const singlePropElems = {
    title: (val) => <Title>{val}</Title>,
    link: (key, val) => (<link { ...key.includes('/') ? { type: key } : {} } href={val} />),
    script: (key, val) => (<Script { ...key.includes('/') ? { type: key } : {} } href={val} />),
};

function getMetaType(key, val) {
    const isSingleProperty = (key) => key !== null && key === 'title' || (key === 'link' && val !== null) || key === 'script';
    if (isSingleProperty(key)) {
        switch (key) {
            case 'title': return singlePropElems.title(val);
            case 'script': return singlePropElems.script(key, val);
            default: return singlePropElems.link(key, val,);
        }
    }

    if (key === 'icon' || key === 'manifest') {
        return 'link'
    }
    
    return (<Meta property={key} content={val} />);
}

    function MetaElementBuilder(data) {
        const arr = new Array(META_LEN);
        for (const [key, val] of Object.entries(data)) {
            arr.push(getMetaType(key, val))
        }

        return arr;
    }

    function Layout({children}) {
        return (
            <div className="theme">
                <Helmet>
                    {<MetaElementBuilder data={metadata} />}
                </Helmet>
                {children}
            </div>
        );
    }

    export default Layout;