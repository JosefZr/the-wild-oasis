import supabase from "./supabase";

export async function getCabins(){
    
    const {data, error } = await supabase
    .from('cabins')
    .select('*');

    if(error){
        console.log(error);
        throw new Error("cabins could note be loaded")
    }
    return data;
}
export async function deleteCabin(id){
    
    const {data,error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

    if(error){
        console.log(error);
        throw new Error("cabins could note be deleted")
    }
    return data;
}