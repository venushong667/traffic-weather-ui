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

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"

import '@tanstack/react-table'

declare module '@tanstack/table-core' {
    // filter and search only can use one of each at the same time
    interface ColumnMeta<TData extends RowData, TValue> {
        filter?: boolean,
        search?: boolean
    }
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    initialTableState?: InitialTableState,
    searchPlaceholder?: string,
    enableRowSelection?: boolean,
    enableMultiRowSelection?: boolean,
    enableSetPageSize?: boolean,
    onSelectRow?: (row: Row<TData>) => void,
}

export function DataTable<TData, TValue>({
    columns,
    data,
    initialTableState,
    searchPlaceholder,
    enableRowSelection = true,
    enableMultiRowSelection = false,
    enableSetPageSize = true,
    onSelectRow = () => {},
}: DataTableProps<TData, TValue>) {
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
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    return (
        <div className="space-y-4">
            <DataTableToolbar
                table={table}
                searchPlaceholder={searchPlaceholder}
            />
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
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
            </div>
            <DataTablePagination 
                table={table}
                enableMultiRowSelection={enableMultiRowSelection}
                enableSetPageSize={enableSetPageSize}
            />
        </div>
    )
}
