import React, {useEffect, useState} from "react";
import Wrapper from "../../components/Wrapper";
import {Link} from "react-router-dom";

import Paginator from "../../components/Paginator";
import axios from "axios";
import {Order} from "../../models/order";
import {OrderItem} from "../../models/order-item";

const hide = {
    maxHeight: 0,
    transition: '1000ms ease-in'
}

const show = {
    maxHeight: '150px',
    transition: '1000ms ease-out'
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [selected, setSelected] = useState(0);

    const select = (id: number) => {
        setSelected(selected !== id ?  id : 0);
    }
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`/orders?page=${page}`);
                setOrders(data.data)
                setLastPage(data.meta.last_page);
            }
        )()
    }, [page]);
    return(
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/orders/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map((o: Order) => {
                            return(
                                <>

                                    <tr key={o.id}>
                                        <td>{o.id}</td>
                                        <td>{o.name}</td>
                                        <td>{o.email}</td>
                                        <td>{o.total}</td>
                                        <td>
                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                            onClick={()=> select(o.id)}
                                            >view</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div style={selected === o.id ? show : hide} className="overflow-hidden">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>product title</th>
                                                            <th>quantity</th>
                                                            <th>price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        o.order_items.map((item: OrderItem) => {
                                                            return(
                                                                <tr key={item.id}>
                                                                    <td>{item.id}</td>
                                                                    <td>{item.product_title}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{item.price}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <Paginator page={page} lastPage={lastPage} pageChange={setPage} />
        </Wrapper>
    )
}

export default Orders;