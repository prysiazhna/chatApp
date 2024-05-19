import SearchInput from "./SearchInput";
import Conversations from "./Conversations.jsx";
import Header from "./Header.jsx";

const Sidebar = () => {
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <Header/>
            <SearchInput/>
            <div className='divider px-3'></div>
            <Conversations/>
        </div>
    );
};
export default Sidebar;