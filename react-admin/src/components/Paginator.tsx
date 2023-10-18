import React from "react";

const Paginator = (props: {
    page: number,
    lastPage: number,
    pageChange: (page:number)=>void
}) => {

    const Previous = () => {
        if(props.page > 1){
            props.pageChange(props.page - 1);

        }
    }
    const Next = () => {

        if(props.page <= props.lastPage){
            props.pageChange(props.page + 1);

        }
    }

    return(
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" href="#" onClick={Previous}>Previous</a>
                </li>

                <li className="page-item">
                    <a className="page-link" href="#" onClick={Next}>Nex</a>
                </li>
            </ul>
        </nav>
    )
}

export default Paginator;