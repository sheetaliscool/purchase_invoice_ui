import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, chakra, Stack, FormControl, Input, FormLabel, FormErrorMessage, Select } from "@chakra-ui/react"
import { useFrappeCreateDoc, useFrappeGetDocList } from "frappe-react-sdk"
import { useFieldArray, useForm } from "react-hook-form"
type Props = {
    isOpen: boolean;
    onClose: () => void;
}

interface FormFields {
    supplier_name: String
    supplier_group: string
}
interface SupplierGroupFields {
    name: string
}

export const AddSupplierRecord = ({isOpen, onClose}: Props) => {
    const { data: supplierGroupData, isLoading: supplierGroupIsLoading, error: supplierGroupError} = useFrappeGetDocList<SupplierGroupFields>('Supplier Group',{
        fields: ["name"]
    })

    

    const { register, handleSubmit, control, formState: {errors}} = useForm<FormFields>()
    
    const { createDoc, loading, reset } = useFrappeCreateDoc()
    const onSubmit = (data: FormFields) => {
        console.log(data);
        createDoc('Supplier', data)
        .then(() => {
            onClose()
        })
    }
    
    return (                        
                <Modal isOpen={isOpen} onClose={onClose}>
                    <chakra.form onSubmit={handleSubmit(onSubmit)}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add Supplier</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            
                        <FormControl isRequired isInvalid={!!errors.supplier_group}>
                                <FormLabel>Supplier Group</FormLabel>
                                <Select {...register('supplier_group')} placeholder='Select supplier'>
                                    {supplierGroupData && supplierGroupData.map((d: SupplierGroupFields, i) => 
                                    (
                                    <option key={i} value={d.name}>{d.name}</option>
                                    ))}
                                    </Select>
                                <FormErrorMessage>{errors.supplier_group?.message}</FormErrorMessage>
                            </FormControl>


                            <FormControl isInvalid={!!errors.supplier_name}>
                                <FormLabel>Supplier Name</FormLabel>
                                <Input type='text' {...register(`supplier_name`, {
                                    required: "Quantity is required!"
                                })} />
                                <FormErrorMessage>{errors.supplier_name?.message}</FormErrorMessage>
                            </FormControl>


                    
                            <Button colorScheme='blue' type="button" onClick={handleSubmit(onSubmit)}>Add new supplier</Button>
                        </Stack>
                    </ModalBody>
                              <ModalFooter>
                      <Button variant='ghost' mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button isLoading={loading} colorScheme='blue' type='submit'>Save</Button>
                    </ModalFooter>
                  </ModalContent>
                  </chakra.form>
                </Modal>
    )
}