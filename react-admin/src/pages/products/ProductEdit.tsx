import React, {useEffect, useRef, useState} from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import ImageUpload from "../../components/ImageUpload";
import {useParams} from "react-router-dom";

const ProductEdit = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams<{id: string}>();
    //TODO: ref is not necessary, because without ref, is wokring well,
    //TODO: but in case not working, use ref
    const ref = useRef<HTMLInputElement>(null);
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.put(`/products/${id}`, {
            title,
            description,
            image,
            price
        });
        setRedirect(true);
    }
    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`/products/${id}`);
                setTitle(data.title);
                setDescription(data.description);
                setImage(data.image);
                setPrice(data.price);
            }
        )()
    }, []);

    //TODO: ref is not necessary, because without ref, is wokring well,
    //TODO: but in case not working, use ref
    const updateImage = (url: string) => {
        if(ref.current){
            ref.current.value = url;
        }
        setImage(url);
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
                            value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
               </div>
               <div className="mb-3">
                   <label>Description</label>
                   <textarea className="form-control"
                             value={description}
                             onChange={(e) => setDescription(e.target.value)}>
                   </textarea>
               </div>
               <div className="mb-3">
                   <div className="input-group">
                       <label>Image</label>
                       <input type="text" className="form-control"
                              ref={ref}
                              value={image}
                              onChange={(e) => setImage(e.target.value)} />
                        <ImageUpload uploaded={updateImage} />
                   </div>
               </div>
               <div className="mb-3">
                   <label>Price</label>
                   <input type="number" className="form-control"
                          value={price}
                          onChange={(e) => setPrice(parseInt(e.target.value))} />
               </div>
               <button className="btn btn-outline-secondary">save</button>
           </form>
        </Wrapper>
    )
}

export default ProductEdit;