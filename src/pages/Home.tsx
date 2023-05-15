import {DashBoards} from '../components/DashBoards'

interface HomeProps{
    flagSideBar: boolean;
}

function Home({flagSideBar}:HomeProps) {
    
    
    return (
        <>
            <DashBoards flagSideBar={flagSideBar} />
        </>
    )
}

export default Home