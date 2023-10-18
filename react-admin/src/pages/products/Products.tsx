import {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Link} from "react-router-dom";
import {Product} from "../../models/product";
import Paginator from "../../components/Paginator";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`/products?page=${page}`);
                setProducts(data.data);
                setLastPage(data.meta.last_page);
            }
        )()
    }, [page]);

    const productDelete = async (id: number) => {
        if(window.confirm("Are you sure you want to delete this record?")){
            await axios.delete(`/products/${id}`);
            setProducts(products.filter((p: Product) => p.id !== id));
        }
    }

    return(
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.map((product: Product) => {
                            return(
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td><img alt={product.title} src={product.image} width="50" /></td>
                                    <td>{product.title}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Link to={`/products/${product.id}/edit`}  className="btn btn-sm btn-outline-secondary"
                                        >Edit</Link>
                                        <a href="#" className="btn btn-sm btn-outline-secondary"
                                           onClick={(e) => productDelete(product.id)}
                                        >Delete</a>
                                    </td>
                                </tr>
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
export default Products;