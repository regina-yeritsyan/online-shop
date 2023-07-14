import React from 'react';
import { useSelector } from "react-redux";
import WrapperLogOut from "../components/WrapperLogOut";
import HomeComponent from "../components/Home";
import Wrapper from "../components/Wrapper";

function Home(props) {

    const token = useSelector(store => store.users.token);

    return (
        <div>
            {token
                ?
                <Wrapper className="App">

                    <HomeComponent />

                </Wrapper>
                :
                <WrapperLogOut className="App">

                    <HomeComponent />

                </WrapperLogOut>
            }
        </div>
    );
}

export default Home;
