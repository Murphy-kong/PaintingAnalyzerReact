import React, {useEffect, useState} from 'react'
import { Table, TableCell, TableHead , TableRow, makeStyles, TablePagination, TableSortLabel} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th' : {
            fontWeight: '600',
            color: '#000000',
            backgroundColor: '#eeeeee',
        },
        '& tbody td' : {
            fontWeight: '300',
        },
        '& tbody tr:hover' : {
            backgroundColor: '#fffbf2',
            cursor: 'pointer'
        },
        
    },
}))

export default function useTable(records, headCells, filter){

    const classes = useStyles();

    const pages = [5, 10 , 25]
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order,setOrder] = useState()
    const [orderby, setOrderby] = useState()

    const TBlContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )
  

    const TBlHead = props =>{

        const handleSortRequest = cellId => {
            console.log(records)
            const isAsc = orderby === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderby(cellId)
        }

        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headCell => (
                    <TableCell key={headCell.id}
                    sortDirection={orderby === headCell.id ? order : false}>
                        {headCell.disableSorting ? headCell.label:
                        <TableSortLabel
                        active = {orderby === headCell.id}
                        direction= {orderby === headCell.id ? order : 'asc' }
                        onClick = {() =>{handleSortRequest(headCell.id)} }>
                        {headCell.label}
                        </TableSortLabel>
                        }
                    </TableCell>))
                }
            </TableRow>
        </TableHead>)
    }

    const handleChangePage = (event, newPage) =>{
        setPage(newPage)
    }
     const handleChangeRowsPerPage = event =>{
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
     }

    const TBlPagination = () => (<TablePagination
    component="div"
    page = {page}
    rowsPerPageOptions={pages}
    rowsPerPage={rowsPerPage}
    count={records.length}
    onChangePage={handleChangePage}
    onChangeRowsPerPage = {handleChangeRowsPerPage}
    />)

    function stablesort(array, comparator)
    {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a,b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] -b[1];
        })
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderby){
        return order === 'desc'
            ?(a , b) => descendingComparator(a, b, orderby)
            :(a , b) => -descendingComparator(a, b, orderby)
    }

    function descendingComparator(a, b, orderby){
        if (b[orderby] < a[orderby]){
            return -1;
        }
        if(b[orderby] > a[orderby]){
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        return stablesort(filter.fn(records), getComparator(order, orderby))
        .slice(page*rowsPerPage,(page+1)*rowsPerPage)
    }

    return {
        TBlContainer,
        TBlHead,
        TBlPagination,
        recordsAfterPagingAndSorting
    }
}