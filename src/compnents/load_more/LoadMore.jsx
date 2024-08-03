import { React, useEffect, useState } from 'react';
import './LoadMore.css';

const LoadMore = () => {
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const url = `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
    const fetchData=async (getUrl)=>{
        setLoading(true);
        try{
            const response=await fetch(getUrl);
            const data=await response.json();
            if (data && data.products && data.products.length){
                setProducts((prevData) => [...prevData, ...data.products]);
                setLoading(false);
                
            }
        }
        catch(e){
            setLoading(false);
            console.log(e);
        }
  
    }

    useEffect(()=>{
        fetchData(url);
    },[count])

    useEffect(()=>{
        if (products && products.length === 100) setDisableButton(true);
        }
    ,[products])

    if (loading) {
        return (
            <div style={{textAlign:"center"}}>
                <p>fetching data.....</p>
                </div>
        )
    }
   

    return (
        <div className="load-more-container">
      <div className="product-container">
        {products && products.length
          ? products.map((item) => (
              <div className="product" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
            <div  className="button-container">
                <button disabled={disableButton} onClick={()=>setCount(count+1)}>
                    Load More
                </button>
                {
                    disableButton?<div>No more data to load</div>:null
                }
            </div>
        </div>
    )
}

export default LoadMore;
