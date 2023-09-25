"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>,
  searchPlaceholder?: string,
  enableViewOptions?: boolean
}

export function DataTableToolbar<TData>({
    table,
    searchPlaceholder,
    enableViewOptions = true,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0
    
    const columnsFilters = table.getAllColumns().map(column => {
        if (column.columnDef.meta?.search) {
            return (
                <Input
                    key={column.id}
                    placeholder={searchPlaceholder ?? `Search ${column?.id}`}
                    value={(column?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        column?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
            )
        } 
        if (column.columnDef.meta?.filter) {
            return (
                <DataTableFacetedFilter
                    key={column.id}
                    column={column}
                    title={column.id}
                    options={[]}
                />
            )
        }
    })

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {columnsFilters}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                            Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            {enableViewOptions ?? <DataTableViewOptions table={table} />}
        </div>
    )
}
