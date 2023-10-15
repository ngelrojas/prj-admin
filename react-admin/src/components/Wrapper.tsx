import React, {Component, ReactNode} from "react";
import Nav from "./Nav";
import Menu from "./Menu";

interface WrapperProps{
    children: ReactNode
}

class Wrapper extends Component<WrapperProps>{
    render(){
        return(
            <>
                <Nav />

                <div className="container-fluid">
                    <div className="row">
                        <Menu />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </>
        )
    }
}

export default Wrapper;