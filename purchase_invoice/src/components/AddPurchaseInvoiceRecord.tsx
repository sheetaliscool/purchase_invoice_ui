import { Box, Button, chakra, Stack, FormControl, Input, FormLabel, FormErrorMessage, Select, Heading } from "@chakra-ui/react";
import { useFrappeCreateDoc, useFrappeGetDocList } from "frappe-react-sdk";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface FormFields {
    supplier: String;
    status: string;
    posting_date: string;
    items: itemFields[];
}
interface SupplierFields {
    name: string;
}
interface ItemFields {
    name: string;
}
type itemFields = {
    item_code: string;
    qty: number;
}
export const AddPurchaseInvoiceRecord = () => {  
    const [selectedSupplier, setSelectedSupplier] = useState(null);    
    const navigate = useNavigate();
    const { data: supplierData, isLoading: supplierIsLoading, error: supplierError} = useFrappeGetDocList<SupplierFields>('Supplier',{
        fields: ["name"]
    });
    const { data: itemData, isLoading: itemIsLoading, error: itemError} = useFrappeGetDocList<ItemFields>('Item',{
        fields: ["name"]
    });
    
    const { register, handleSubmit, control, formState: {errors}} = useForm<FormFields>();
    const { createDoc, loading, reset } = useFrappeCreateDoc();
    const onSubmit = (data: FormFields) => {
        createDoc('Purchase Invoice', data)
        .then(() => {
            navigate("/purchase-invoice");
        })
        .catch((error) => {
            console.error(error);
        });
    }
    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });
    return (                        
        <Box bg="white" p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading mb={5}>Add Purchase Invoice</Heading>
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>                     
                    <FormControl isRequired isInvalid={!!errors.supplier}>
                        <FormLabel>Supplier</FormLabel>
                        <Select {...register('supplier')} placeholder='Select supplier'>
                            {supplierData && supplierData.map((d: SupplierFields, i) => 
                            (
                            <option key={i} value={d.name}>{d.name}</option>
                            ))}
                        </Select>
                        <FormErrorMessage>{errors.supplier?.message}</FormErrorMessage>
                    </FormControl>
                    {fields.map((item_code, index) => (
                    <div key={item_code.id}>
                    <FormControl isRequired isInvalid={!!errors.items?.[index]?.item_code}>
                        <FormLabel>Item {index + 1}</FormLabel> 
                        <Select {...register(`items[${index}].item_code` as keyof FormFields)} placeholder='Select item'>
                            {itemData && itemData.map((d: ItemFields, i) => 
                            (
                            <option key={i} value={d.name}>{d.name}</option>
                            ))}                             
                            </Select>
                        <FormErrorMessage>{errors.items?.[index]?.item_code?.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={!!errors.items?.[index]?.qty}>
                        <FormLabel>Quantity</FormLabel>
                        <Input type='number' {...register(`items[${index}].qty` as keyof FormFields, {
                            required: "Quantity is required!"
                        })} />
                        <FormErrorMessage>{errors.items?.[index]?.qty?.message}</FormErrorMessage>
                    </FormControl>
                    <Button variant='ghost' type="button" onClick={() => remove(index)}>Remove this item</Button>
                </div>
                ))}
                <Button colorScheme='blue' type="button" onClick={() => append({ item_code: "", qty: 1 })}>Add new item</Button>
                </Stack>
                <Button variant='ghost' mr={3} mt={5}>
                    Close
                </Button>
                <Button isLoading={loading} colorScheme='blue' type='submit' mt={5}>Save</Button>
            </chakra.form>
        </Box>
    );
}
