import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, HStack, Heading, Spinner, Stack, useDisclosure } from "@chakra-ui/react";
import { useFrappeDocTypeEventListener, useFrappeGetDocList } from "frappe-react-sdk";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import { useNavigate } from 'react-router-dom';
interface PurchaseInvoiceFields {
    name: string;
    supplier: string;
    posting_date: string;
}
export const PurchaseInvoiceTabList = () => {
    const { data, isLoading, error, mutate } = useFrappeGetDocList<PurchaseInvoiceFields>('Purchase Invoice', {
        fields: ["name", "supplier", "posting_date"]
    });
    const navigate = useNavigate();
    const navigateToAddPurchaseInvoice = () => {
    navigate('/add-purchase-invoice');
  };
    useFrappeDocTypeEventListener('Purchase Invoice', (d) => {
        console.log("Event", d);
        if (d.doctype === "Purchase Invoice") {
            mutate();
        }
    }); 
    const columns = [
        {
            name: "ID",
            selector: (row: PurchaseInvoiceFields) => row.name,
            sortable: true
        },
        {
            name: "Supplier",
            selector: (row: PurchaseInvoiceFields) => row.supplier,
            sortable: true
        },
        {
            name: "Date Created",
            selector: (row: PurchaseInvoiceFields) => row.posting_date,
            sortable: true,
        }
    ];
    return (
        <Stack>
            <HStack justify={'space-between'}>
                <Heading as='h3' fontSize={'xl'}>Purchase Invoice</Heading>
                <Box>
                    <Button colorScheme="blue" onClick= {navigateToAddPurchaseInvoice}>
                        + Add
                    </Button>
                </Box>
            </HStack>
            {isLoading && <Center><Spinner /></Center>}
            {error && <Alert status='error'>
                <AlertIcon />
                <AlertTitle>{error.exception}</AlertTitle>
                <AlertDescription>{error.httpStatusText}</AlertDescription>
            </Alert>}
            {data && <DataTable
                columns={columns}
                data={data}
                defaultSortFieldId="name"
                sortIcon={<SortIcon />}
                pagination
                selectableRows
            />}
        </Stack>
    );
};