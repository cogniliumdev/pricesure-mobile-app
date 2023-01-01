import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { DataTable } from 'react-native-paper';


const Pagination = ({ productsNumber, setPagination }) => {
    const [page, setPage] = useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = useState(10);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, productsNumber);

    useEffect(() => {
        console.log("page", page);
        console.log("from", from);
        console.log("to", to);
        setPagination({ from: from, to: to });
    }, [
        page
    ]);

    return (
        <DataTable>
            <DataTable.Pagination
                style={{ flexDirection: "row", justifyContent: "center" }}
                className="bg-slate-100 rounded-full"
                page={page}
                numberOfPages={Math.ceil(productsNumber / numberOfItemsPerPage)}
                onPageChange={page => {
                    setPage(page)
                }}
                label={`${from + 1}-${to} of ${productsNumber}`}
                showFastPaginationControls
                // numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={numberOfItemsPerPage}
            // onItemsPerPageChange={onItemsPerPageChange}
            // selectPageDropdownLabel={'Rows per page'}
            />
        </DataTable>
    )
}
export default Pagination;