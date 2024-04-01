    /* eslint-disable no-unused-vars */

    import Input from "../../ui/Input";
    import Form from "../../ui/Form";
    import Button from "../../ui/Button";
    import FileInput from "../../ui/FileInput";
    import Textarea from "../../ui/Textarea";
    import { useForm } from "react-hook-form";
    import { createCabin } from "../../services/apiCabins";
    import { useMutation, useQueryClient } from "@tanstack/react-query";
    import toast from "react-hot-toast";
    import FormRow from "../../ui/FormRow";

    function CreateCabinForm(){
    const queryClient= useQueryClient()

    const { register, handleSubmit ,reset, getValues, formState} = useForm(); 

    const {errors} = formState;

    const {mutate, isLoading:isCreating} = useMutation({// we use mutation if we want to create or delete a new row or so..
        mutationFn:createCabin,
        onSuccess:()=>{
        toast.success("New cabin succesfully created");
        queryClient.invalidateQueries({queryKey:["cabins"]});
        reset();
        },
        onError:(err)=> toast.error(`An error occurred while creating the new cabin: ${err?.message}`)
    });

    function onSubmit(data){
        console.log(data);
        mutate({...data, image: data.image[0]})
    }

    function onError(errors){
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormRow label="Cabin Name" error={errors?.name?.message}>
            <Input type="text" id="name" disabled={isCreating}{...register ("name",{
                required:"this field is requered",
                min:{
                value:1,
                message:'capacity should be atleast 1',
                }
            })}/>
        </FormRow>
        <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
            <Input type="number" id="maxCapacity" disabled={isCreating} {...register ("maxCapacity",{
            required:"this field is requered",
            min:{
                value:1,
                message:'capacity should be atleast 1',
            }
            })}/>
        </FormRow>

        <FormRow label="regular price" error={errors?.regularPrice?.message}>
            <Input type="number" id="regularPrice" disabled={isCreating}{...register ("regularPrice",{
            required:"this field is requered",
            min:{
                value:1,
                message:'capacity should be atleast 1',
            }
            })}/>
        </FormRow>

        <FormRow label="Discount" error={errors?.discount?.message}>
            <Input type="number" id="discount" defaultValue={0}  disabled={isCreating}{...register ("discount",{
            required:"this field is requered",
            validate:(value)=>
                value <= getValues().regularPrice || "discount should be less then the regular price",
            })}/>
        </FormRow>

        <FormRow label="Description for website" error={errors?.description?.message}>
            <Textarea type="number" id="description" defaultValue=""  disabled={isCreating}{...register ("description",{
            required:"this field is requered"
            })}/>
        </FormRow>

        <FormRow label="Cabin photo">
            <FileInput id="image" accept="image/*" {...register ("image",{
            required:"this field is required"
            })} disabled={isCreating}/>
        </FormRow>

        <FormRow>
            {/* type is an HTML attribute! */}
            <Button variation="secondary" type="reset">
            Cancel
            </Button>
            <Button disabled={isCreating}>Edit cabin</Button>
        </FormRow>
        </Form>
    );
    }

export default CreateCabinForm;
