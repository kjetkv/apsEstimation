import {fireStore, useAuth} from "../../hooks/useAuth";
import React from "react";
import {GridItem, FormControl, Input, Button, Alert, AlertIcon} from "@chakra-ui/react"
import {useForm} from "react-hook-form";


const UseCaseForm = ({projectId}) => {
    const {user} = useAuth();
    const usecasesRef = fireStore.collection(`projects/${projectId}/usecases`);
    const {handleSubmit, register, setError, formState: {errors, isSubmitting, isSubmitSuccessful}} = useForm();

    const onSubmit = async (data) => {
        try {

            await usecasesRef.add({
                title: data.input,
                projectId: projectId,
                createdBy: user.email,
                developmentTime: 0,
                insecurityGrade: 1
            });
        } catch (error) {
            setError('input', {
                type: 'manual',
                message: "firebaseError: ".concat(error.message)
            })
        }
    };

    return (
        <GridItem
            colStart={[1, null, null, null, null, null]}
            colSpan={[3, null, null, null, null, null]}
        >
            {errors?.input && (<Alert status="error" variant="subtle" mt={6} mb={6}>
                <AlertIcon/>
                {errors.input.message || "field should not be empty"}
            </Alert>)}
            {isSubmitSuccessful && (<Alert status="success" variant="subtle" mt={6} mb={6}>
                <AlertIcon/>
                Userstory created
            </Alert>)}
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Input name="input"
                           fontSize="sm"
                           placeholder="As a user I want to create a new userStory"  {...register("input", {required: true})}
                           type="text"/>
                </FormControl>
                <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Create userStory</Button>
            </form>
        </GridItem>
    )

};

export default UseCaseForm
