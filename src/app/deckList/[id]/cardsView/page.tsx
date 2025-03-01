import ViewClient from "./ViewClient";

type IParams = {
id:string
}

export default async function ViewCards ({
    params
}:{params: Promise<IParams>}){
    const {id} = await params;

    return <ViewClient id={id}/>
}