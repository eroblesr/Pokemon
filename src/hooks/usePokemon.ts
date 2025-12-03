import { useState } from "react";
import type { Pokemon } from "../types/pokemon";
function usePokemon(){
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(false);
    const [error,setError]= useState<string>("");
    const fetchPokemon = async(name:string): Promise <void> =>{
        setLoading(true);
        setError("");
        setPokemon(null);
        try{
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

            if(!response.ok){
                throw new Error("Pokemon not founded");
            }
            const data = await response.json();
            const cleanPokemon : Pokemon={
                id: data.id,
                name: data.name,
                height: data.height,
                weight: data.weight,
                sprites:{
                    front_default : data.sprites.front_default,
                },
                types: data.types.map((t:any)=>({
                    type:{
                        name:t.type.name,
                    }
                })),
                abilities: data.abilities.map((a: any) => ({
                    ability: {
                    name: a.ability.name,
                    },
                })),
            }
            setPokemon(cleanPokemon);
        }catch(error){
            setError("Couldn't find the Pokemon");
            setPokemon(null);
        }finally{
            setLoading(false);
        }

    };
    return{pokemon,loading,error,fetchPokemon}
}
export default usePokemon;
