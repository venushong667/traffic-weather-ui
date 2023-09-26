"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    InitialTableState,
    Row,
    RowData,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { DataTableToolbar } from "./data-table-toolbar"

import '@tanstack/react-table'
import { ScrollArea } from "../ui/scroll-area"

declare module '@tanstack/table-core' {
    // filter and search only can use one of each at the same time
    interface ColumnMeta<TData extends RowData, TValue> {
        filter?: boolean,
        search?: boolean
    }
}

interface DataListProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    initialTableState?: InitialTableState,
    searchPlaceholder?: string,
    enableRowSelection?: boolean,
    enableMultiRowSelection?: boolean,
    enableViewOptions?: boolean,
    onSelectRow?: (row: Row<TData>) => void,
}

export function DataList<TData, TValue>({
    columns,
    data,
    initialTableState,
    searchPlaceholder,
    enableRowSelection = true,
    enableMultiRowSelection = false,
    enableViewOptions = true,
    onSelectRow = () => {},
}: DataListProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        initialState: initialTableState,
        enableRowSelection: enableRowSelection,
        enableMultiRowSelection: enableMultiRowSelection,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <div className="space-y-4">
            <DataTableToolbar
                table={table}
                searchPlaceholder={searchPlaceholder}
                enableViewOptions={enableViewOptions}
            />
            <div className="rounded-md border">
                <ScrollArea className="h-[300px]">
                    <Table>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        onClick={() => {row.toggleSelected(); onSelectRow(row)}}
                                        className={`h-[40px] ${enableRowSelection ? 'cursor-pointer': ""}`}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            cell.column.columnDef.cell && 
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                            
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
        </div>
    )
}
