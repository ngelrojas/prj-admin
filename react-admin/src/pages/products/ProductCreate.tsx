import React, {useState} from "react";
import Wrapper from "../../components/Wrapper";
import {Role} from "../../models/role";
import {Link} from "react-router-dom";
import axios from "axios";
import ImageUpload from "../../components/ImageUpload";

const ProductCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post('/products', {
            title,
            description,
            image,
            price
        });
        setRedirect(true);
    }
    if(redirect){
        window.location.href = '/products';
    }
    return(
        <Wrapper>
           <form onSubmit={submit}>
               <div className="mb-3">
                   <label>Title</label>
                     <input type="text" className="form-control"
                        onChange={(e) => setTitle(e.target.value)}/>
               </div>
               <div className="mb-3">
                   <label>Description</label>
                   <textarea className="form-control" onChange={(e) => setDescription(e.target.value)}></textarea>
               </div>
               <div className="mb-3">
                   <div className="input-group">
                       <label>Image</label>
                       <input type="text" className="form-control"
                              value={image}
                              onChange={(e) => setImage(e.target.value)} />
                        <ImageUpload uploaded={setImage } />
                   </div>
               </div>
               <div className="mb-3">
                   <label>Price</label>
                   <input type="number" className="form-control" onChange={(e) => setPrice(parseInt(e.target.value))} />
               </div>
               <button className="btn btn-outline-secondary">save</button>
           </form>
        </Wrapper>
    )
}

export default ProductCreate;