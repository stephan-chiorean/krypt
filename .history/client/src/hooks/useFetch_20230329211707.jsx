import { useState } from "react";
import { useEffect } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;
const useFetch = () => {
    const [gifUrl, setGifUrl] = useState("")

    const fetchGifs = async() => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`)

            const {data} = await response.json();

            setGifUrl(data[0]?.images?.downsized_medium?.url)
        } catch(err) {
            console.error(err);
        }
    }
    useEffect(() => {
        if(keyword) fetchGifs();
    }, [keyword])

    return gifUrl;
}

export default useFetch;