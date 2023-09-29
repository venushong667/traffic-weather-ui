"use client"

import '@tanstack/react-table'

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    InitialTableState,
    Row,
    RowData,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import * as React from "react"

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

import { ScrollArea } from "../ui/scroll-area"
import { Skeleton } from "../ui/skeleton"
import { DataTableToolbar } from "./data-table-toolbar"

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
    isLoading?: boolean,
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
    isLoading = false,
}: DataListProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [sorting, setSorting] = React.useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
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
            <div className="rounded-md border min-h-[200px]">
                <ScrollArea className="mobile:h-[200px] laptop:h-[300px]">
                    {isLoading ?
                        Array.from({length: 4}, (_, i) => i + 1).map((id) => 
                            <div key={id} className="flex items-center space-x-4 m-5 w-full">
                                <div className="space-y-2 w-full">
                                    <Skeleton className="h-4 w-1/2" />
                                    <Skeleton className="h-4 w-1/3" />
                                </div>
                            </div>
                        )
                        :
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
                    }
                </ScrollArea>
            </div>
        </div>
    )
}
