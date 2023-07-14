import React from 'react';
import { useSelector } from "react-redux";
import WrapperLogOut from "../components/WrapperLogOut";
import Product from "../components/Product";
import Wrapper from "../components/Wrapper";

function SingleProduct(props) {

    const token = useSelector(store => store.users.token);

    return (
        <div>
            {token
                ?
                <Wrapper>

                    <Product />

                </Wrapper>
                :
                <WrapperLogOut>

                    <Product />

                </WrapperLogOut>
            }
        </div>

    )
}

export default SingleProduct;