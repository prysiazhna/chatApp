import {useAuthContext} from "../../context/AuthContext.jsx";
import LogoutButton from "./LogoutButton.jsx";

const Header = () => {
    const {authUser} = useAuthContext();

    return (
        <div className="flex justify-between">
            <div className='flex pb-2'>
                <div className="avatar">
                    <div className="w-10 rounded">
                        <img src={authUser.profilePic} alt="Avatar"/>
                    </div>
                </div>
                <div className="pl-2 pt-2 text-base font-bold">{authUser.fullName}</div>
            </div>
            <LogoutButton/>
        </div>


    );
};
export default Header;