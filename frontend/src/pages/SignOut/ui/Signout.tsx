import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { trpc } from "../../../lib/trpc";

const Signout = () => {
    const navigate = useNavigate();
    const trpcUtils = trpc.useUtils();
    useEffect(() => {
        Cookies.remove("token");
        trpcUtils.invalidate().then(() => {
            navigate("/");
        });
    }, []);
    return <div>Loading...</div>;
};

export default Signout;
