import { useEffect, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom';
import api from "../../services/api";
import { toast } from 'react-toastify'
import './filme.css'


function Filme(){
    const { id } = useParams();
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState (true)
    const navigate = useNavigate()

    useEffect(()=>{
       async function loadFilme() {
         await api.get(`/movie/${id}`, {
            params:{
                api_key: "28fc232cc001c31e8a031f419d0a14ca",
                language: "pt-BR",
            }
         })
         .then((response)=>{
            setFilme(response.data);
            setLoading(false)
         })
         .catch(()=>{
            console.log("FIlme não ")
            navigate("/", {replace: true})
            return;
         })
       } 
       loadFilme();

       return() => {
        console.log('componente desmontado')
       }
    },[navigate, id])

    function salvarFilme(){
        const minhalista = localStorage.getItem("@primeflix")
        let filmesSalvos = JSON.parse(minhalista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)
        if(hasFilme){
            toast.warn("Esse filme já está na lista!")
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!")
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carreando detalhes</h1>
            </div>
        )
    }


    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https:image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação:{filme.vote_average}⭐⭐⭐</strong>

            <div className="area-button">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;