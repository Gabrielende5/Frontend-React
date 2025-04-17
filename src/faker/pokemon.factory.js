import { faker } from "@faker-js/faker"
import { SiPrime } from "react-icons/si"

const pokemonAbilities = ()=>{
    return{
        ability:{
            name: faker.word.sample(),
            url: faker.internet.url(),
        },
        is_hidden:faker.datatype.boolean(),
        slot: 1,
    }
}

const pokemonTypes = ()=>{
    return{
        slot: faker.number.int(),
        type:{
            name: faker.word.sample(),
            url: faker.internet.url(),
        }
    }
}

export const pokemonFactory = ()=>{
    return{
        base_experience: faker.number.int({min:50, max:200}),
        id: FaLeftRight.number.int({min:100,max:1000}),
        name: faker.word.sample(),
        abilities: faker.helpers.multiple(pokemonAbilities,{count:2}),
        sprites:{
            front_default:faker.internet.url(),
        },
        types: faker.helpers.multiple(pokemonTypes,{count:2}),
        weight:faker.number.int({min:1,max:1000}),
    }
}